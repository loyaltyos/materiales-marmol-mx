import Link from "next/link";
import { CartBadge } from "@/components/CartBadge";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-white/94 shadow-[0_12px_40px_rgba(20,20,20,0.08)] backdrop-blur-xl">
      <div className="bg-[#242424] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.08em] sm:px-6 lg:px-8">
          <span className="hidden text-white/65 md:inline">Entregas coordinadas en CDMX y Estado de México</span>
          <span className="hidden text-white/65 lg:inline">Lun–Vie · 8:00–18:00</span>
          <div className="ml-auto flex items-center gap-4 sm:gap-6">
            <a href="tel:+525573328442" className="flex items-center gap-2 text-white/80 transition hover:text-white">
              <PhoneIcon className="h-3.5 w-3.5 text-[#F97316]" />
              55 7332 8442
            </a>
            <a href="https://wa.me/525573328442" className="flex items-center gap-2 text-[#F97316] transition hover:text-white">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-[#242424] text-sm font-black tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
            <span className="absolute bottom-0 left-0 h-1 w-full bg-[#F97316]" />MM
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-black uppercase leading-none tracking-[0.14em] text-[#242424]">Materiales</span>
            <span className="mt-1.5 block text-xs font-extrabold uppercase tracking-[0.2em] text-[#F97316]">Marmol MX</span>
          </span>
        </Link>

        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-3 py-2.5 text-[11px] font-black uppercase tracking-[0.09em] text-[#525252] transition duration-300 hover:bg-[#F3F1ED] hover:text-[#242424]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="shrink-0"><CartBadge /></div>
      </div>
    </header>
  );
}
