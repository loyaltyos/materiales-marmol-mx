"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/products";

const fields = [
  { label: "Nombre completo", name: "nombre", type: "text" },
  { label: "Telefono", name: "telefono", type: "tel" },
  { label: "Correo", name: "correo", type: "email" },
  { label: "Direccion de entrega", name: "direccion", type: "text" },
  { label: "Ciudad / Estado", name: "ciudad", type: "text" },
];

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/mercadopago/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          id: item.product.id,
          title: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price,
        })),
      }),
    });

    const data = (await response.json()) as { message?: string };
    setMessage(
      data.message ??
        "Pago pendiente de integracion. Tu pedido no fue cobrado.",
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F97316]">
          Checkout
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase text-[#2B2B2B] sm:text-4xl">
          Finalizar compra
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4A4A4A]">
          Captura tus datos de entrega y revisa el resumen. Mercado Pago queda
          preparado para integracion futura sin realizar cobros en este modo.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit}
          className="border border-[#D8D8D8] bg-white p-5 shadow-sm sm:p-7"
        >
          <h2 className="text-xl font-black uppercase text-[#2B2B2B]">
            Datos del cliente
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#4A4A4A]">
                  {field.label}
                </span>
                <input
                  required
                  name={field.name}
                  type={field.type}
                  className="mt-2 h-12 w-full border border-[#CFCFCF] bg-[#F5F5F5] px-4 font-semibold outline-none focus:border-[#F97316]"
                />
              </label>
            ))}
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#4A4A4A]">
              Comentarios adicionales
            </span>
            <textarea
              name="comentarios"
              rows={5}
              className="mt-2 w-full border border-[#CFCFCF] bg-[#F5F5F5] px-4 py-3 font-semibold outline-none focus:border-[#F97316]"
            />
          </label>

          <section className="mt-7 border border-[#D8D8D8] bg-[#F5F5F5] p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2B2B2B]">
              Metodo de pago
            </p>
            <label className="mt-4 flex items-start gap-3 bg-white p-4">
              <input
                defaultChecked
                type="radio"
                name="payment"
                value="card"
                className="mt-1 accent-[#F97316]"
              />
              <span>
                <span className="block font-black text-[#2B2B2B]">
                  Tarjeta de credito o debito
                </span>
                <span className="mt-1 block text-sm leading-6 text-[#4A4A4A]">
                  Mercado Pago pendiente de integracion. No se cobra realmente
                  hasta configurar credenciales.
                </span>
              </span>
            </label>
          </section>

          {message ? (
            <div className="mt-5 border-l-4 border-[#F97316] bg-[#FFF7ED] p-4 text-sm font-bold text-[#2B2B2B]">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={items.length === 0}
            className="mt-6 min-h-12 w-full bg-[#F97316] px-6 text-sm font-black uppercase tracking-[0.14em] text-[#2B2B2B] transition hover:bg-[#2B2B2B] hover:text-white disabled:cursor-not-allowed disabled:bg-[#D8D8D8] disabled:text-[#7A7A7A]"
          >
            Pagar pedido
          </button>
        </form>

        <aside className="h-fit border border-[#2B2B2B] bg-white p-5 shadow-sm lg:sticky lg:top-48">
          <h2 className="text-xl font-black uppercase text-[#2B2B2B]">
            Resumen de productos
          </h2>
          <div className="mt-5 max-h-96 space-y-4 overflow-auto border-y border-[#E5E5E5] py-5">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.product.id} className="grid grid-cols-[64px_1fr] gap-3">
                  <div className="relative h-16 overflow-hidden bg-[#D9D9D9]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      style={{ objectPosition: item.product.imagePosition }}
                    />
                  </div>
                  <div className="min-w-0 text-sm">
                    <p className="font-black text-[#2B2B2B]">{item.product.name}</p>
                    <p className="mt-1 text-[#7A7A7A]">
                      {item.quantity} x {formatCurrency(item.product.price)}
                    </p>
                    <p className="mt-1 font-black text-[#F97316]">
                      {formatCurrency(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-[#4A4A4A]">
                Tu carrito esta vacio. Agrega productos para continuar.
              </p>
            )}
          </div>
          <div className="mt-5 flex items-center justify-between text-lg font-black">
            <span>Total estimado</span>
            <span className="text-[#F97316]">{formatCurrency(total)}</span>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#4A4A4A]">
            Envio calculado en el siguiente paso segun volumen, peso y ubicacion
            de entrega.
          </p>
          <Link
            href="/carrito"
            className="mt-5 flex min-h-11 items-center justify-center border border-[#CFCFCF] text-sm font-black uppercase tracking-[0.12em] text-[#4A4A4A] transition hover:border-[#F97316] hover:text-[#2B2B2B]"
          >
            Volver al carrito
          </Link>
        </aside>
      </div>
    </main>
  );
}
