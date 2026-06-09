import Link from "next/link";
import { CartBadge } from "@/components/CartBadge";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 shadow-[0_8px_30px_rgba(43,43,43,0.08)] backdrop-blur">
      <div className="bg-[#242424] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-[11px] font-semibold sm:px-6 lg:justify-between lg:px-8">
          <span>Envios coordinados en CDMX y Estado de Mexico</span>
          <span>Lunes a Viernes 8:00 - 18:00</span>
          <a href="tel:+525573328442" className="transition hover:text-[#F97316]">
            55 7332 8442
          </a>
          <a
            href="https://wa.me/525573328442"
            className="font-black text-[#F97316] transition hover:text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#2B2B2B] font-black text-[#F97316] shadow-sm">
            MM
          </span>
          <span className="min-w-0">
            <span className="block text-base font-black uppercase tracking-[0.12em] text-[#2B2B2B] sm:text-lg">
              Materiales
            </span>
            <span className="block text-xs font-black uppercase tracking-[0.18em] text-[#F97316] sm:text-sm">
              Marmol MX
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 lg:justify-end">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.11em] text-[#4A4A4A] transition hover:bg-[#F5F5F5] hover:text-[#F97316] sm:px-4"
            >
              {item.label}
            </Link>
          ))}
          <CartBadge />
        </nav>
      </div>
    </header>
  );
}
