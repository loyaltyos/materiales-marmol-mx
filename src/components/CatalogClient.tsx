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
      <section className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-center">
          <div className="flex flex-wrap gap-2">
            {["Todos", ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition ${
                  activeCategory === category
                    ? "bg-[#2B2B2B] text-white shadow-sm"
                    : "bg-[#F5F5F5] text-[#4A4A4A] hover:bg-[#FFF1E8] hover:text-[#F97316]"
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
              className="h-12 w-full rounded-full border border-[#CFCFCF] bg-[#F5F5F5] px-5 text-sm font-semibold outline-none transition focus:border-[#F97316] focus:bg-white"
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
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#2B2B2B] px-5 text-sm font-black uppercase tracking-[0.1em] text-white shadow-sm transition hover:bg-[#F97316] hover:text-[#2B2B2B]"
        >
          Ver carrito: {itemCount} items / {formattedTotal}
        </Link>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => {
          const quantity = quantities[product.id] ?? product.step;

          return (
            <article
              key={product.id}
              className="flex min-h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#F97316] hover:shadow-xl"
            >
              <div className="relative h-40 bg-[#D9D9D9]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: product.imagePosition }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,43,43,0)_40%,rgba(43,43,43,0.62)_100%)]" />
                <p className="absolute bottom-3 left-3 rounded-full bg-[#F97316] px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-[#2B2B2B]">
                  {product.category}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-black uppercase leading-snug text-[#2B2B2B]">
                  {product.name}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#4A4A4A]">
                  {product.description}
                </p>

                <div className="mt-4 flex items-end justify-between gap-4 border-t border-[#E5E5E5] pt-4">
                  <div>
                    <p className="text-2xl font-black text-[#2B2B2B]">
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

                <div className="mt-5 grid grid-cols-[44px_1fr_44px] overflow-hidden rounded-full border border-[#CFCFCF]">
                  <button
                    type="button"
                    aria-label={`Disminuir cantidad de ${product.name}`}
                    onClick={() => updateQuantity(product.id, quantity - product.step)}
                    className="h-11 bg-[#F5F5F5] text-xl font-black transition hover:bg-[#F97316]"
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
                    className="h-11 min-w-0 border-x border-[#CFCFCF] text-center text-base font-black outline-none"
                  />
                  <button
                    type="button"
                    aria-label={`Incrementar cantidad de ${product.name}`}
                    onClick={() => updateQuantity(product.id, quantity + product.step)}
                    className="h-11 bg-[#F5F5F5] text-xl font-black transition hover:bg-[#F97316]"
                  >
                    +
                  </button>
                </div>

                <p className="mt-3 text-sm font-bold text-[#4A4A4A]">
                  Subtotal:{" "}
                  <span className="text-[#2B2B2B]">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={() => addItem(product.id, quantity)}
                  className="mt-5 min-h-12 rounded-full bg-[#F97316] px-4 text-sm font-black uppercase tracking-[0.1em] text-[#2B2B2B] shadow-sm transition hover:bg-[#2B2B2B] hover:text-white"
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
