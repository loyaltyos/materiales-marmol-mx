"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  formatCurrency,
  getProductById,
  products,
  type Product,
} from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
  subtotal: number;
};

type StoredCart = Record<string, number>;

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  formattedTotal: string;
  addItem: (productId: string, quantity: number) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "materiales-marmol-cart";

function normalizeQuantity(product: Product, quantity: number) {
  return Math.max(0, Math.round(quantity / product.step) * product.step);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<StoredCart>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const rawCart = window.localStorage.getItem(storageKey);

    if (rawCart) {
      try {
        setCart(JSON.parse(rawCart) as StoredCart);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      window.localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addItem = useCallback((productId: string, quantity: number) => {
    const product = getProductById(productId);

    if (!product) {
      return;
    }

    const normalized = normalizeQuantity(product, quantity);

    if (normalized <= 0) {
      return;
    }

    setCart((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + normalized,
    }));
  }, []);

  const updateItem = useCallback((productId: string, quantity: number) => {
    const product = getProductById(productId);

    if (!product) {
      return;
    }

    const normalized = normalizeQuantity(product, quantity);

    setCart((current) => {
      const next = { ...current };

      if (normalized <= 0) {
        delete next[productId];
      } else {
        next[productId] = normalized;
      }

      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCart((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  const items = useMemo<CartItem[]>(() => {
    return products
      .map((product) => {
        const quantity = cart[product.id] ?? 0;

        if (quantity <= 0) {
          return null;
        }

        return {
          product,
          quantity,
          subtotal: product.price * quantity,
        };
      })
      .filter((item): item is CartItem => item !== null);
  }, [cart]);

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      total,
      formattedTotal: formatCurrency(total),
      addItem,
      updateItem,
      removeItem,
      clearCart,
    }),
    [addItem, clearCart, itemCount, items, removeItem, total, updateItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
