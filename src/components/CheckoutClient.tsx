"use client";

import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, FormEvent, useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/products";

type CustomerData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  comments: string;
};

type Quote = {
  amount: number;
  customer: CustomerData;
  idempotencyKey: string;
};

const fields = [
  { label: "Nombre completo", name: "name", type: "text", autoComplete: "name" },
  { label: "Teléfono", name: "phone", type: "tel", autoComplete: "tel" },
  { label: "Correo", name: "email", type: "email", autoComplete: "email" },
  { label: "Dirección de entrega", name: "address", type: "text", autoComplete: "street-address" },
  { label: "Ciudad / Estado", name: "city", type: "text", autoComplete: "address-level2" },
] as const;

export function CheckoutClient({ publicKey }: { publicKey: string | null }) {
  const router = useRouter();
  const { items, total } = useCart();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [message, setMessage] = useState("");

  const cartPayload = useMemo(
    () => items.map((item) => ({ id: item.product.id, quantity: item.quantity })),
    [items],
  );

  useEffect(() => {
    if (publicKey) initMercadoPago(publicKey, { locale: "es-MX" });
  }, [publicKey]);

  async function preparePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!publicKey || items.length === 0) return;

    setIsPreparing(true);
    setMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const customer: CustomerData = {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? ""),
        address: String(formData.get("address") ?? ""),
        city: String(formData.get("city") ?? ""),
        comments: String(formData.get("comments") ?? ""),
      };
      const response = await fetch("/api/mercadopago/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartPayload }),
      });
      const data = (await response.json()) as { amount?: number; message?: string };

      if (!response.ok || typeof data.amount !== "number") {
        throw new Error(data.message);
      }

      setQuote({ amount: data.amount, customer, idempotencyKey: crypto.randomUUID() });
    } catch {
      setMessage("No fue posible preparar el pago. Verifica tus datos e intenta nuevamente.");
    } finally {
      setIsPreparing(false);
    }
  }

  const handlePayment: ComponentProps<typeof Payment>["onSubmit"] = async ({ formData }) => {
    if (!quote) return Promise.reject();

    setMessage("");
    try {
      const response = await fetch("/api/mercadopago/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartPayload,
          customer: quote.customer,
          idempotencyKey: quote.idempotencyKey,
          payment: formData,
        }),
      });
      const data = (await response.json()) as { redirectTo?: string; message?: string };

      if (!response.ok || !data.redirectTo) {
        setMessage(data.message ?? "No fue posible completar el pago. Puedes intentarlo nuevamente.");
        return Promise.reject();
      }

      router.push(data.redirectTo);
    } catch {
      setMessage("No fue posible completar el pago. Puedes intentarlo nuevamente o comunicarte con nosotros.");
      return Promise.reject();
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F97316]">Checkout seguro</p>
        <h1 className="mt-3 text-3xl font-black uppercase text-[#2B2B2B] sm:text-4xl">Finalizar compra</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4A4A4A]">
          Captura tus datos de entrega y paga sin salir de esta página mediante Mercado Pago.
        </p>
        <p className="mt-3 inline-flex rounded-full bg-[#FFF7ED] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#C2410C]">
          Entorno de prueba · No se realizan cargos reales
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
          {!quote ? (
            <form onSubmit={preparePayment}>
              <h2 className="text-xl font-black uppercase text-[#2B2B2B]">Datos del cliente</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.name} className="block">
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-[#4A4A4A]">{field.label}</span>
                    <input
                      required
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      className="mt-2 h-12 w-full rounded-2xl border border-[#CFCFCF] bg-[#F5F5F5] px-4 font-semibold outline-none transition focus:border-[#F97316] focus:bg-white"
                    />
                  </label>
                ))}
              </div>
              <label className="mt-5 block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#4A4A4A]">Comentarios adicionales</span>
                <textarea
                  name="comments"
                  rows={4}
                  maxLength={500}
                  className="mt-2 w-full rounded-2xl border border-[#CFCFCF] bg-[#F5F5F5] px-4 py-3 font-semibold outline-none transition focus:border-[#F97316] focus:bg-white"
                />
              </label>
              {!publicKey ? (
                <div className="mt-5 rounded-2xl border-l-4 border-[#F97316] bg-[#FFF7ED] p-4 text-sm font-bold">
                  El pago de prueba aún no está configurado. Agrega una NEXT_PUBLIC_MP_PUBLIC_KEY de TEST.
                </div>
              ) : null}
              <button
                type="submit"
                disabled={!publicKey || items.length === 0 || isPreparing}
                className="mt-6 min-h-12 w-full rounded-full bg-[#F97316] px-6 text-sm font-black uppercase tracking-[0.1em] text-[#2B2B2B] transition hover:bg-[#2B2B2B] hover:text-white disabled:cursor-not-allowed disabled:bg-[#D8D8D8] disabled:text-[#7A7A7A]"
              >
                {isPreparing ? "Preparando pago..." : "Continuar al pago"}
              </button>
            </form>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F97316]">Pago con Mercado Pago</p>
                  <h2 className="mt-2 text-xl font-black uppercase text-[#2B2B2B]">Total: {formatCurrency(quote.amount)}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => { setQuote(null); setMessage(""); }}
                  className="rounded-full border border-[#CFCFCF] px-4 py-2 text-xs font-black uppercase tracking-[0.1em]"
                >
                  Editar datos
                </button>
              </div>
              <div className="mt-6 min-h-80">
                <Payment
                  initialization={{ amount: quote.amount, payer: { email: quote.customer.email } }}
                  customization={{
                    paymentMethods: { creditCard: "all", debitCard: "all", maxInstallments: 12 },
                    visual: { style: { theme: "default" }, defaultPaymentOption: { creditCardForm: true } },
                  }}
                  locale="es-MX"
                  onSubmit={handlePayment}
                  onError={() => setMessage("No fue posible cargar o procesar el medio de pago. Intenta nuevamente.")}
                />
              </div>
            </div>
          )}

          {message ? (
            <div role="alert" className="mt-5 rounded-2xl border-l-4 border-[#F97316] bg-[#FFF7ED] p-4 text-sm font-bold text-[#2B2B2B]">
              {message}
            </div>
          ) : null}
        </section>

        <aside className="h-fit rounded-3xl border border-black/10 bg-white p-5 shadow-sm lg:sticky lg:top-36">
          <h2 className="text-xl font-black uppercase text-[#2B2B2B]">Resumen de productos</h2>
          <div className="mt-5 max-h-96 space-y-4 overflow-auto border-y border-[#E5E5E5] py-5">
            {items.length > 0 ? items.map((item) => (
              <div key={item.product.id} className="grid grid-cols-[64px_1fr] gap-3">
                <div className="relative h-16 overflow-hidden rounded-2xl bg-[#D9D9D9]">
                  <Image src={item.product.image} alt={item.product.name} fill sizes="64px" className="object-cover" style={{ objectPosition: item.product.imagePosition }} />
                </div>
                <div className="min-w-0 text-sm">
                  <p className="font-black text-[#2B2B2B]">{item.product.name}</p>
                  <p className="mt-1 text-[#7A7A7A]">{item.quantity} × {formatCurrency(item.product.price)}</p>
                  <p className="mt-1 font-black text-[#F97316]">{formatCurrency(item.subtotal)}</p>
                </div>
              </div>
            )) : <p className="text-sm leading-6 text-[#4A4A4A]">Tu carrito está vacío. Agrega productos para continuar.</p>}
          </div>
          <div className="mt-5 flex items-center justify-between text-lg font-black">
            <span>Total</span><span className="text-[#F97316]">{formatCurrency(total)}</span>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#4A4A4A]">El importe del pago se valida nuevamente en el servidor.</p>
          <Link href="/carrito" className="mt-5 flex min-h-11 items-center justify-center rounded-full border border-[#CFCFCF] text-sm font-black uppercase tracking-[0.1em] text-[#4A4A4A] transition hover:border-[#F97316] hover:text-[#2B2B2B]">
            Volver al carrito
          </Link>
        </aside>
      </div>
    </main>
  );
}
