import Link from "next/link";
import { categories } from "@/lib/products";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/carrito", label: "Carrito" },
  { href: "/checkout", label: "Checkout" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#2B2B2B] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-black uppercase tracking-[0.16em]">
            Materiales Marmol MX
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/68">
            Tienda profesional de materiales para construccion, obra civil y
            remodelacion con venta online, cotizaciones especiales y logistica
            coordinada.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.12em]">
            <span className="bg-white px-3 py-2 text-[#2B2B2B]">Visa</span>
            <span className="bg-white px-3 py-2 text-[#2B2B2B]">Mastercard</span>
            <span className="bg-white px-3 py-2 text-[#2B2B2B]">Mercado Pago</span>
          </div>
        </div>

        <div>
          <p className="font-black uppercase tracking-[0.16em] text-[#F97316]">
            Enlaces
          </p>
          <div className="mt-4 grid gap-2 text-sm text-white/72">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[#F97316]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-black uppercase tracking-[0.16em] text-[#F97316]">
            Categorias
          </p>
          <div className="mt-4 grid gap-2 text-sm text-white/72">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/catalogo?categoria=${encodeURIComponent(category)}`}
                className="hover:text-[#F97316]"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-black uppercase tracking-[0.16em] text-[#F97316]">
            Contacto
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/72">
            <p>+52 55 7332 8442</p>
            <p>info@marmolmx.com.mx</p>
            <p>ventas@marmolmx.com.mx</p>
            <p>CDMX, Mexico</p>
            <a href="https://wa.me/525573328442" className="block text-[#F97316]">
              WhatsApp
            </a>
          </div>
          <p className="mt-6 text-xs leading-5 text-white/46">
            Informacion legal y politicas de compra pendientes de integracion.
          </p>
        </div>
      </div>
    </footer>
  );
}
