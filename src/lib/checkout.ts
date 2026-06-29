import { getProductById, type Product } from "@/lib/products";

export type CheckoutItemInput = { id: string; quantity: number };

export type ServerCartItem = {
  product: Product;
  quantity: number;
  subtotal: number;
};

const MAX_LINE_QUANTITY = 10_000;
const MAX_CART_LINES = 50;

export class InvalidCartError extends Error {}

function isValidQuantity(product: Product, quantity: number) {
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > MAX_LINE_QUANTITY) return false;
  const steps = quantity / product.step;
  return Math.abs(steps - Math.round(steps)) < Number.EPSILON * 10;
}

export function calculateServerCart(input: unknown) {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_CART_LINES) {
    throw new InvalidCartError("El carrito no es válido.");
  }

  const seenIds = new Set<string>();
  const items: ServerCartItem[] = input.map((rawItem) => {
    if (!rawItem || typeof rawItem !== "object") {
      throw new InvalidCartError("El carrito no es válido.");
    }

    const { id, quantity } = rawItem as Partial<CheckoutItemInput>;
    const product = typeof id === "string" ? getProductById(id) : undefined;

    if (!product || typeof quantity !== "number" || !isValidQuantity(product, quantity)) {
      throw new InvalidCartError("El carrito contiene un producto o cantidad no válidos.");
    }
    if (seenIds.has(product.id)) {
      throw new InvalidCartError("El carrito contiene productos duplicados.");
    }

    seenIds.add(product.id);
    return { product, quantity, subtotal: product.price * quantity };
  });

  const amount = items.reduce((total, item) => total + item.subtotal, 0);
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw new InvalidCartError("No fue posible calcular el total del carrito.");
  }

  return { items, amount };
}
