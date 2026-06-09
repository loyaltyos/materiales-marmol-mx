"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function CartBadge() {
  const { itemCount, formattedTotal } = useCart();

  return (
    <Link
      href="/carrito"
      className="flex min-h-10 items-center justify-between gap-2 rounded-full bg-[#F97316] px-4 text-xs font-black uppercase tracking-[0.11em] text-[#2B2B2B] shadow-sm transition hover:bg-[#2B2B2B] hover:text-white"
    >
      <span>Carrito</span>
      <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-2 text-[11px] text-[#2B2B2B]">
        {itemCount}
      </span>
      <span className="hidden text-[11px] sm:inline">{formattedTotal}</span>
    </Link>
  );
}
