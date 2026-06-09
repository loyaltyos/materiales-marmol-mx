import Link from "next/link";
import { CartBadge } from "@/components/CartBadge";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

const categories = [
  "Cementos",
  "Ladrillos y Blocks",
  "Acero y Varillas",
  "Agregados",
  "Herramientas",
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#D8D8D8] bg-white shadow-sm">
      <div className="bg-[#2B2B2B] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-2 text-center text-xs font-bold sm:px-6 lg:justify-between lg:px-8">
          <p>Envios coordinados en CDMX y Estado de Mexico</p>
          <p>Lunes a Viernes 8:00 - 18:00</p>
          <a href="tel:+525573328442" className="hover:text-[#F97316]">
            55 7332 8442
          </a>
          <a href="https://wa.me/525573328442" className="text-[#F97316]">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[260px_1fr_260px] lg:items-center lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center bg-[#2B2B2B] font-black text-[#F97316]">
            MM
          </span>
          <span>
            <span className="block text-lg font-black uppercase tracking-[0.12em] text-[#2B2B2B]">
              Materiales
            </span>
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-[#F97316]">
              Marmol MX
            </span>
          </span>
        </Link>

        <form action="/catalogo" className="flex min-w-0 border border-[#CFCFCF] bg-[#F5F5F5]">
          <label className="sr-only" htmlFor="site-search">
            Buscar productos
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Buscar cemento, block, arena, varilla..."
            className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-[#2B2B2B] outline-none placeholder:text-[#7A7A7A]"
          />
          <button
            type="submit"
            className="bg-[#2B2B2B] px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#F97316] hover:text-[#2B2B2B]"
          >
            Buscar
          </button>
        </form>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr]">
          <Link
            href="/checkout"
            className="flex min-h-12 items-center justify-center border border-[#CFCFCF] px-4 text-center text-xs font-black uppercase tracking-[0.12em] text-[#4A4A4A] transition hover:border-[#F97316] hover:text-[#2B2B2B]"
          >
            Mi cuenta
          </Link>
          <CartBadge />
        </div>
      </div>

      <nav className="border-t border-[#E5E5E5] bg-[#F5F5F5]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          <Link
            href="/catalogo"
            className="shrink-0 bg-[#F97316] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#2B2B2B]"
          >
            Categorias
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#4A4A4A] transition hover:bg-white hover:text-[#F97316]"
            >
              {item.label}
            </Link>
          ))}
          {categories.map((category) => (
            <Link
              key={category}
              href={`/catalogo?categoria=${encodeURIComponent(category)}`}
              className="hidden shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A7A] transition hover:text-[#F97316] xl:block"
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
