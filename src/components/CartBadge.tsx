"use client";

import Link from "next/link";
import { CartIcon } from "@/components/Icons";
import { useCart } from "@/components/CartProvider";

export function CartBadge() {
  const { itemCount, formattedTotal } = useCart();

  return (
    <Link
      href="/carrito"
      className="premium-button flex min-h-11 items-center justify-between gap-2 rounded-xl bg-[#F97316] px-4 text-xs font-black uppercase tracking-[0.11em] text-[#242424] transition duration-300 hover:-translate-y-0.5 hover:bg-[#242424] hover:text-white"
    >
      <CartIcon className="h-4 w-4" />
      <span>Carrito</span>
      <span className="grid h-6 min-w-6 place-items-center rounded-md bg-white px-2 text-[11px] text-[#242424]">
        {itemCount}
      </span>
      <span className="hidden text-[11px] sm:inline">{formattedTotal}</span>
    </Link>
  );
}
