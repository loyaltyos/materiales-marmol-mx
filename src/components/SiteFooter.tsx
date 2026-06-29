import Link from "next/link";
import { WhatsAppIcon } from "@/components/Icons";
import { categories } from "@/lib/products";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/carrito", label: "Carrito" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#202020] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.9fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/6 text-sm font-black">MM</span>
            <p className="text-lg font-black uppercase tracking-[0.14em]">Materiales Marmol MX</p>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/58">
            Suministro profesional de materiales para construcción, obra civil y remodelación, con compra segura y logística coordinada.
          </p>
          <div className="mt-7 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-white/75">
            <span className="rounded-lg border border-white/10 bg-white/6 px-3 py-2">Visa</span>
            <span className="rounded-lg border border-white/10 bg-white/6 px-3 py-2">Mastercard</span>
            <span className="rounded-lg border border-white/10 bg-white/6 px-3 py-2">Pago seguro · Mercado Pago</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F97316]">Navegación</p>
          <div className="mt-5 grid gap-3 text-sm text-white/62">
            {links.map((link) => <Link key={link.href} href={link.href} className="transition hover:translate-x-1 hover:text-white">{link.label}</Link>)}
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F97316]">Categorías</p>
          <div className="mt-5 grid gap-3 text-sm text-white/62">
            {categories.map((category) => (
              <Link key={category} href={`/catalogo?categoria=${encodeURIComponent(category)}`} className="transition hover:translate-x-1 hover:text-white">
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F97316]">Atención comercial</p>
          <div className="mt-5 space-y-3 text-sm text-white/62">
            <a href="tel:+525573328442" className="block transition hover:text-white">+52 55 7332 8442</a>
            <a href="mailto:ventas@marmolmx.com.mx" className="block transition hover:text-white">ventas@marmolmx.com.mx</a>
            <p>CDMX, México</p>
          </div>
          <a
            href="https://wa.me/525573328442"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25D366] px-4 text-xs font-black uppercase tracking-[0.1em] text-[#102018] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white"
          >
            <WhatsAppIcon className="h-5 w-5" /> Hablar con un asesor
          </a>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-[11px] text-white/35 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 Materiales Marmol MX</p><p>Construcción · Suministro · Logística</p>
        </div>
      </div>
    </footer>
  );
}
