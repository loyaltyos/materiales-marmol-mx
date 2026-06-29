"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import {
  categories,
  formatCurrency,
  getUnitLabel,
  products,
} from "@/lib/products";

type Quantities = Record<string, number>;

const initialQuantities = products.reduce<Quantities>((acc, product) => {
  acc[product.id] = product.exampleQuantity;
  return acc;
}, {});

type CatalogClientProps = {
  initialCategory?: string;
  initialSearch?: string;
};

export function CatalogClient({
  initialCategory = "Todos",
  initialSearch = "",
}: CatalogClientProps) {
  const { addItem, itemCount, formattedTotal } = useCart();
  const [activeCategory, setActiveCategory] = useState(initialCategory || "Todos");
  const [search, setSearch] = useState(initialSearch);
  const [quantities, setQuantities] = useState<Quantities>(initialQuantities);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Todos" || product.category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  function updateQuantity(productId: string, value: number) {
    const product = products.find((item) => item.id === productId);

    if (!product) {
      return;
    }

    const normalized = Math.max(
      product.step,
      Math.round(value / product.step) * product.step,
    );

    setQuantities((current) => ({ ...current, [productId]: normalized }));
  }

  return (
    <div className="grid gap-8">
      <section className="premium-panel rounded-[1.75rem] p-3 sm:p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-center">
          <div className="flex flex-wrap gap-2">
            {["Todos", ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-[0.1em] transition duration-300 ${
                  activeCategory === category
                    ? "bg-[#242424] text-white shadow-[0_8px_22px_rgba(0,0,0,0.15)]"
                    : "bg-[#F4F3F0] text-[#5A5A5A] hover:bg-[#E9E7E2] hover:text-[#242424]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="block">
            <span className="sr-only">Buscar en catalogo</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar producto"
              className="h-12 w-full rounded-xl border border-black/10 bg-[#F4F3F0] px-5 text-sm font-semibold outline-none transition focus:border-[#F97316] focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
            />
          </label>
        </div>
      </section>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm font-bold text-[#4A4A4A]">
          {visibleProducts.length} productos disponibles
        </p>
        <Link
          href="/carrito"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#242424] px-5 text-xs font-black uppercase tracking-[0.1em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#F97316] hover:text-[#242424]"
        >
          Ver carrito: {itemCount} items / {formattedTotal}
        </Link>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => {
          const quantity = quantities[product.id] ?? product.step;

          return (
            <article
              key={product.id}
              className="group flex min-h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/8 bg-white shadow-[0_16px_45px_rgba(30,30,30,0.07)] transition duration-500 hover:-translate-y-1.5 hover:border-black/15 hover:shadow-[0_24px_60px_rgba(30,30,30,0.14)]"
            >
              <div className="relative h-56 overflow-hidden bg-[#D9D9D9]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: product.imagePosition }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0)_48%,rgba(20,20,20,0.68)_100%)]" />
                <p className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-[#242424]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-white backdrop-blur">
                  {product.category}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-black uppercase leading-snug tracking-[-0.02em] text-[#242424]">
                  {product.name}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#626262]">
                  {product.description}
                </p>

                <div className="mt-5 flex items-end justify-between gap-4 border-t border-black/8 pt-5">
                  <div>
                    <p className="text-2xl font-black tracking-tight text-[#242424]">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A7A]">
                      por {product.unit}
                    </p>
                  </div>
                  <p className="text-right text-xs font-bold text-[#7A7A7A]">
                    Min. sugerido
                    <span className="block text-[#2B2B2B]">
                      {product.step} {getUnitLabel(product.unit, product.step)}
                    </span>
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-[42px_1fr_42px] overflow-hidden rounded-xl border border-black/12 bg-[#F7F6F3]">
                  <button
                    type="button"
                    aria-label={`Disminuir cantidad de ${product.name}`}
                    onClick={() => updateQuantity(product.id, quantity - product.step)}
                    className="h-11 text-lg font-medium text-[#555] transition hover:bg-[#E9E7E2] hover:text-[#242424]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.step}
                    step={product.step}
                    value={quantity}
                    onChange={(event) =>
                      updateQuantity(product.id, Number(event.target.value))
                    }
                    className="h-11 min-w-0 border-x border-black/10 bg-white text-center text-sm font-black outline-none"
                  />
                  <button
                    type="button"
                    aria-label={`Incrementar cantidad de ${product.name}`}
                    onClick={() => updateQuantity(product.id, quantity + product.step)}
                    className="h-11 text-lg font-medium text-[#555] transition hover:bg-[#E9E7E2] hover:text-[#242424]"
                  >
                    +
                  </button>
                </div>

                <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                  Subtotal:{" "}
                  <span className="text-[#2B2B2B]">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={() => addItem(product.id, quantity)}
                  className="premium-button mt-5 min-h-12 rounded-xl bg-[#F97316] px-4 text-xs font-black uppercase tracking-[0.11em] text-[#242424] transition duration-300 hover:-translate-y-0.5 hover:bg-[#242424] hover:text-white"
                >
                  Agregar al carrito
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
