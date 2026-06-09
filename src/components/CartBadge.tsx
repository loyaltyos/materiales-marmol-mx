"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function CartBadge() {
  const { itemCount, formattedTotal } = useCart();

  return (
    <Link
      href="/carrito"
      className="flex min-h-12 items-center justify-between gap-3 bg-[#F97316] px-4 text-sm font-black uppercase tracking-[0.12em] text-[#2B2B2B] transition hover:bg-[#2B2B2B] hover:text-white"
    >
      <span>Carrito</span>
      <span className="grid h-7 min-w-7 place-items-center bg-white px-2 text-xs text-[#2B2B2B]">
        {itemCount}
      </span>
      <span className="hidden text-xs sm:inline">{formattedTotal}</span>
    </Link>
  );
}
