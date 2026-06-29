"use client";

import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/Icons";
import { useCart } from "@/components/CartProvider";
import { formatCurrency, getUnitLabel } from "@/lib/products";

export default function CarritoPage() {
  const { items, total, updateItem, removeItem, clearCart } = useCart();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F97316]">Tu selección</p>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-[-0.03em] text-[#242424] sm:text-4xl">Resumen de pedido</h1>
          <p className="mt-3 text-sm text-[#626262]">Revisa cantidades antes de continuar al pago seguro.</p>
        </div>
        <Link href="/catalogo" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-5 text-xs font-black uppercase tracking-[0.1em] text-[#4A4A4A] shadow-sm transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md">
          + Agregar productos
        </Link>
      </div>

      {items.length === 0 ? (
        <section className="premium-panel mt-8 rounded-[2rem] p-10 text-center sm:p-16">
          <span className="mx-auto block h-1 w-12 rounded-full bg-[#F97316]" />
          <h2 className="mt-6 text-2xl font-black uppercase text-[#242424]">Tu carrito está vacío</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#626262]">Explora el catálogo y prepara tu pedido de materiales.</p>
          <Link href="/catalogo" className="premium-button mt-7 inline-flex min-h-12 items-center rounded-xl bg-[#F97316] px-7 text-xs font-black uppercase tracking-[0.1em] text-[#242424] transition hover:-translate-y-0.5 hover:bg-[#242424] hover:text-white">
            Ver catálogo
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_370px]">
          <section className="premium-panel overflow-hidden rounded-[1.75rem]">
            <div className="hidden grid-cols-[96px_minmax(0,1fr)_170px_130px] gap-4 border-b border-black/8 bg-[#F8F7F4] px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#777] md:grid">
              <span>Producto</span><span>Detalle</span><span>Cantidad</span><span className="text-right">Subtotal</span>
            </div>
            <div className="divide-y divide-black/8">
              {items.map((item) => (
                <article key={item.product.id} className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:p-5 md:grid-cols-[96px_minmax(0,1fr)_170px_130px] md:items-center">
                  <div className="relative h-20 overflow-hidden rounded-xl bg-[#E4E2DD] sm:h-24">
                    <Image src={item.product.image} alt={item.product.name} fill sizes="96px" className="object-cover" style={{ objectPosition: item.product.imagePosition }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#F97316]">{item.product.category}</p>
                    <h2 className="mt-1.5 text-sm font-black uppercase leading-snug text-[#242424] sm:text-base">{item.product.name}</h2>
                    <p className="mt-1 text-xs text-[#777]">{formatCurrency(item.product.price)} / {item.product.unit}</p>
                    <button type="button" onClick={() => removeItem(item.product.id)} className="mt-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#8A8A8A] transition hover:text-[#C2410C]">Eliminar</button>
                  </div>
                  <div className="col-span-2 flex items-center justify-between gap-4 md:col-span-1 md:block">
                    <div className="grid w-36 grid-cols-[38px_1fr_38px] overflow-hidden rounded-xl border border-black/12 bg-[#F7F6F3]">
                      <button type="button" aria-label={`Disminuir ${item.product.name}`} onClick={() => updateItem(item.product.id, item.quantity - item.product.step)} className="h-10 text-lg font-medium text-[#555] transition hover:bg-[#E8E6E1]">−</button>
                      <input type="number" min={0} step={item.product.step} value={item.quantity} onChange={(event) => updateItem(item.product.id, Number(event.target.value))} className="h-10 min-w-0 border-x border-black/10 bg-white text-center text-sm font-black outline-none" />
                      <button type="button" aria-label={`Incrementar ${item.product.name}`} onClick={() => updateItem(item.product.id, item.quantity + item.product.step)} className="h-10 text-lg font-medium text-[#555] transition hover:bg-[#E8E6E1]">+</button>
                    </div>
                    <p className="text-xs font-bold text-[#777] md:mt-2">{item.quantity} {getUnitLabel(item.product.unit, item.quantity)}</p>
                  </div>
                  <div className="hidden text-right md:block">
                    <p className="text-lg font-black tracking-tight text-[#242424]">{formatCurrency(item.subtotal)}</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-between border-t border-black/6 pt-3 md:hidden">
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#777]">Subtotal</span>
                    <span className="text-lg font-black text-[#242424]">{formatCurrency(item.subtotal)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="h-fit overflow-hidden rounded-[1.75rem] bg-[#242424] text-white shadow-[0_24px_60px_rgba(25,25,25,0.2)] lg:sticky lg:top-32">
            <div className="p-6 sm:p-7">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#F97316]">Resumen</p>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.02em]">Tu pedido</h2>
              <div className="mt-6 space-y-4 border-y border-white/10 py-5 text-sm">
                <div className="flex justify-between gap-4 text-white/60"><span>Productos</span><span className="font-bold text-white">{items.length}</span></div>
                <div className="flex justify-between gap-4 text-white/60"><span>Subtotal</span><span className="font-bold text-white">{formatCurrency(total)}</span></div>
                <div className="flex justify-between gap-4 text-white/60"><span>Envío</span><span className="text-right font-bold text-white">Por coordinar</span></div>
              </div>
              <div className="mt-5 flex items-end justify-between gap-4"><span className="text-sm font-bold text-white/60">Total</span><span className="text-3xl font-black tracking-tight">{formatCurrency(total)}</span></div>
              <Link href="/checkout" className="premium-button mt-6 flex min-h-13 items-center justify-center rounded-xl bg-[#F97316] px-5 text-center text-xs font-black uppercase tracking-[0.11em] text-[#242424] transition hover:-translate-y-0.5 hover:bg-white">Continuar al checkout</Link>
              <p className="mt-4 text-center text-[11px] leading-5 text-white/45">Pago protegido por Mercado Pago. El total se valida en servidor.</p>
            </div>
            <button type="button" onClick={clearCart} className="min-h-11 w-full border-t border-white/10 text-[10px] font-black uppercase tracking-[0.12em] text-white/50 transition hover:bg-white/5 hover:text-white">Vaciar carrito</button>
          </aside>
        </div>
      )}

      <section className="premium-panel mt-7 flex flex-col gap-5 rounded-[1.5rem] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#242424]">Envío y logística</p><p className="mt-2 max-w-3xl text-sm leading-6 text-[#626262]">Un asesor coordinará contigo costo, fecha y condiciones de entrega según volumen, peso y ubicación.</p></div>
        <a href="https://wa.me/525573328442" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-xs font-black uppercase tracking-[0.09em] text-[#102018] transition hover:-translate-y-0.5 hover:shadow-lg"><WhatsAppIcon className="h-5 w-5" /> Consultar por WhatsApp</a>
      </section>
    </main>
  );
}
