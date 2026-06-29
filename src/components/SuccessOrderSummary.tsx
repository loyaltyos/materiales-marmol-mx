"use client";

import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/products";

export function SuccessOrderSummary() {
  const { items, total } = useCart();
  if (items.length === 0) return null;

  return (
    <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-black/8 bg-[#F7F6F3] p-4 text-left sm:p-5">
      <div className="flex items-center justify-between gap-4 border-b border-black/8 pb-3">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#666]">Resumen del pedido</p>
        <p className="text-sm font-black text-[#242424]">{formatCurrency(total)}</p>
      </div>
      <div className="mt-3 grid gap-3">
        {items.slice(0, 3).map((item) => (
          <div key={item.product.id} className="grid grid-cols-[42px_1fr_auto] items-center gap-3">
            <div className="relative h-10 overflow-hidden rounded-lg bg-[#DDD]"><Image src={item.product.image} alt="" fill sizes="42px" className="object-cover" /></div>
            <p className="min-w-0 truncate text-xs font-bold text-[#444]">{item.product.name} <span className="text-[#888]">× {item.quantity}</span></p>
            <p className="text-xs font-black text-[#242424]">{formatCurrency(item.subtotal)}</p>
          </div>
        ))}
        {items.length > 3 ? <p className="text-[11px] text-[#777]">Y {items.length - 3} producto(s) más.</p> : null}
      </div>
    </div>
  );
}
