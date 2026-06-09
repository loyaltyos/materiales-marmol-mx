"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatCurrency, getUnitLabel } from "@/lib/products";

export default function CarritoPage() {
  const { items, total, updateItem, removeItem, clearCart } = useCart();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F97316]">
            Carrito
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-[#2B2B2B] sm:text-4xl">
            Resumen de pedido
          </h1>
        </div>
        <Link
          href="/catalogo"
          className="inline-flex min-h-11 items-center justify-center border border-[#CFCFCF] bg-white px-4 text-sm font-black uppercase tracking-[0.12em] text-[#4A4A4A] transition hover:border-[#F97316] hover:text-[#2B2B2B]"
        >
          Seguir comprando
        </Link>
      </div>

      {items.length === 0 ? (
        <section className="mt-8 border border-[#D8D8D8] bg-white p-8 text-center">
          <h2 className="text-2xl font-black uppercase text-[#2B2B2B]">
            Tu carrito esta vacio
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#4A4A4A]">
            Agrega cemento, block, acero, agregados o herramientas para preparar
            tu pedido.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-flex min-h-12 items-center bg-[#F97316] px-6 text-sm font-black uppercase tracking-[0.12em] text-[#2B2B2B]"
          >
            Ver catalogo
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="grid gap-4">
            {items.map((item) => (
              <article
                key={item.product.id}
                className="grid gap-4 border border-[#D8D8D8] bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_180px]"
              >
                <div className="relative h-28 overflow-hidden bg-[#D9D9D9]">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                    style={{ objectPosition: item.product.imagePosition }}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F97316]">
                    {item.product.category}
                  </p>
                  <h2 className="mt-2 text-lg font-black uppercase text-[#2B2B2B]">
                    {item.product.name}
                  </h2>
                  <p className="mt-1 text-sm text-[#4A4A4A]">
                    Unidad: {item.product.unit} | Precio unitario:{" "}
                    {formatCurrency(item.product.price)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[#7A7A7A] hover:text-[#F97316]"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-center lg:block">
                  <div className="grid grid-cols-[40px_1fr_40px] border border-[#CFCFCF]">
                    <button
                      type="button"
                      aria-label={`Disminuir ${item.product.name}`}
                      onClick={() =>
                        updateItem(item.product.id, item.quantity - item.product.step)
                      }
                      className="h-10 bg-[#F5F5F5] text-lg font-black hover:bg-[#F97316]"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      step={item.product.step}
                      value={item.quantity}
                      onChange={(event) =>
                        updateItem(item.product.id, Number(event.target.value))
                      }
                      className="h-10 min-w-0 border-x border-[#CFCFCF] text-center font-black outline-none"
                    />
                    <button
                      type="button"
                      aria-label={`Incrementar ${item.product.name}`}
                      onClick={() =>
                        updateItem(item.product.id, item.quantity + item.product.step)
                      }
                      className="h-10 bg-[#F5F5F5] text-lg font-black hover:bg-[#F97316]"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right lg:mt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A7A]">
                      {item.quantity}{" "}
                      {getUnitLabel(item.product.unit, item.quantity)}
                    </p>
                    <p className="mt-1 text-xl font-black text-[#2B2B2B]">
                      {formatCurrency(item.subtotal)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit border border-[#2B2B2B] bg-white p-5 shadow-sm lg:sticky lg:top-48">
            <h2 className="text-2xl font-black uppercase text-[#2B2B2B]">
              Pedido
            </h2>
            <div className="mt-5 space-y-4 border-y border-[#E5E5E5] py-5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="font-bold text-[#4A4A4A]">Subtotal</span>
                <span className="font-black text-[#2B2B2B]">
                  {formatCurrency(total)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-bold text-[#4A4A4A]">Envio</span>
                <span className="text-right font-black text-[#2B2B2B]">
                  Calculado en el siguiente paso
                </span>
              </div>
              <div className="flex justify-between gap-4 text-lg">
                <span className="font-black text-[#2B2B2B]">Total estimado</span>
                <span className="font-black text-[#F97316]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold text-[#4A4A4A]">
              Paga con tarjeta de credito o debito.
            </p>
            <Link
              href="/checkout"
              className="mt-5 flex min-h-12 items-center justify-center bg-[#F97316] px-5 text-center text-sm font-black uppercase tracking-[0.12em] text-[#2B2B2B] transition hover:bg-[#2B2B2B] hover:text-white"
            >
              Finalizar compra
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 min-h-11 w-full border border-[#CFCFCF] text-sm font-black uppercase tracking-[0.12em] text-[#4A4A4A] transition hover:border-[#F97316] hover:text-[#2B2B2B]"
            >
              Vaciar carrito
            </button>
          </aside>
        </div>
      )}

      <section className="mt-8 border-l-4 border-[#F97316] bg-white p-6">
        <h2 className="font-black uppercase tracking-[0.14em] text-[#2B2B2B]">
          Envios y logistica
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#4A4A4A]">
          Los costos de envio se calculan segun el volumen, peso y ubicacion de
          entrega. Un asesor se comunicara contigo para coordinar la entrega.
        </p>
      </section>
    </main>
  );
}
