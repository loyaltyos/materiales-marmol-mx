"use client";

import { useMemo, useState } from "react";
import { categories, formatCurrency, products } from "@/lib/products";

type Quantities = Record<string, number>;

const initialQuantities = products.reduce<Quantities>((acc, product) => {
  acc[product.id] = product.exampleQuantity;
  return acc;
}, {});

export function CatalogClient() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [quantities, setQuantities] = useState<Quantities>(initialQuantities);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "Todos") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const selectedProducts = products.filter((product) => quantities[product.id] > 0);
  const total = selectedProducts.reduce(
    (sum, product) => sum + product.price * quantities[product.id],
    0,
  );

  function updateQuantity(productId: string, value: number) {
    const product = products.find((item) => item.id === productId);

    if (!product) {
      return;
    }

    const normalized = Math.max(0, Math.round(value / product.step) * product.step);
    setQuantities((current) => ({ ...current, [productId]: normalized }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {["Todos", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 border px-4 py-3 text-sm font-black uppercase tracking-[0.14em] transition ${
                activeCategory === category
                  ? "border-[#F97316] bg-[#F97316] text-[#2B2B2B]"
                  : "border-[#D4D4D4] bg-white text-[#4A4A4A] hover:border-[#F97316]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {visibleProducts.map((product) => {
            const quantity = quantities[product.id] ?? 0;
            const subtotal = quantity * product.price;

            return (
              <article
                key={product.id}
                className="border border-[#D4D4D4] bg-white p-5 shadow-sm"
              >
                <div className="flex min-h-36 flex-col justify-between gap-5">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F97316]">
                        {product.category}
                      </p>
                      <p className="bg-[#2B2B2B] px-2 py-1 text-xs font-black text-white">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                    <h3 className="text-xl font-black uppercase text-[#2B2B2B]">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#4A4A4A]">
                      {product.description}
                    </p>
                  </div>

                  <div className="border-t border-[#E5E5E5] pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        aria-label={`Disminuir cantidad de ${product.name}`}
                        onClick={() =>
                          updateQuantity(product.id, quantity - product.step)
                        }
                        className="grid h-11 w-11 place-items-center border border-[#BDBDBD] text-xl font-black text-[#2B2B2B] transition hover:border-[#F97316] hover:bg-[#F97316]"
                      >
                        -
                      </button>
                      <label className="min-w-0 flex-1">
                        <span className="sr-only">Cantidad de {product.name}</span>
                        <input
                          type="number"
                          min={0}
                          step={product.step}
                          value={quantity}
                          onChange={(event) =>
                            updateQuantity(product.id, Number(event.target.value))
                          }
                          className="h-11 w-full border border-[#BDBDBD] bg-[#F5F5F5] px-3 text-center text-lg font-black text-[#2B2B2B] outline-none focus:border-[#F97316]"
                        />
                      </label>
                      <button
                        type="button"
                        aria-label={`Incrementar cantidad de ${product.name}`}
                        onClick={() =>
                          updateQuantity(product.id, quantity + product.step)
                        }
                        className="grid h-11 w-11 place-items-center border border-[#BDBDBD] text-xl font-black text-[#2B2B2B] transition hover:border-[#F97316] hover:bg-[#F97316]"
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                      <span className="font-bold text-[#4A4A4A]">
                        {quantity} {product.unit}
                        {quantity === 1 ? "" : "s"}
                      </span>
                      <span className="font-black text-[#2B2B2B]">
                        Subtotal: {formatCurrency(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="h-fit border border-[#2B2B2B] bg-[#2B2B2B] p-5 text-white lg:sticky lg:top-28">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F97316]">
          Carrito de materiales
        </p>
        <h2 className="mt-3 text-2xl font-black uppercase">Solicitud por volumen</h2>
        <div className="mt-5 max-h-80 space-y-4 overflow-auto border-y border-white/12 py-4">
          {selectedProducts.length > 0 ? (
            selectedProducts.map((product) => (
              <div key={product.id} className="flex justify-between gap-4 text-sm">
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p className="mt-1 text-white/58">
                    {quantities[product.id]} {product.unit}
                    {quantities[product.id] === 1 ? "" : "s"}
                  </p>
                </div>
                <p className="font-black text-[#F97316]">
                  {formatCurrency(product.price * quantities[product.id])}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/62">Ajusta cantidades para cotizar.</p>
          )}
        </div>
        <div className="mt-5 flex items-center justify-between text-lg font-black">
          <span>Total estimado</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <p className="mt-4 text-xs leading-5 text-white/62">
          Los precios son de referencia. La cotizacion final se confirma segun
          disponibilidad, volumen, transporte y ubicacion.
        </p>
        <a
          href="/cotizaciones"
          className="mt-5 block bg-[#F97316] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-[#2B2B2B] transition hover:bg-white"
        >
          Solicitar cotizacion
        </a>
      </aside>
    </div>
  );
}
