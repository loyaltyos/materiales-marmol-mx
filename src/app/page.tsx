import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { categories, products } from "@/lib/products";

const advantages = [
  "Amplio catalogo",
  "Entrega coordinada",
  "Atencion especializada",
  "Materiales certificados",
];

export default function Home() {
  return (
    <main>
      <section className="relative isolate min-h-[calc(100vh-86px)] overflow-hidden bg-[#2B2B2B] text-white">
        <Image
          src="/hero-industrial.png"
          alt="Patio industrial con materiales de construccion, block, cemento, grava y transporte"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,43,43,0.96)_0%,rgba(43,43,43,0.82)_42%,rgba(43,43,43,0.24)_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-86px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="border-l-4 border-[#F97316] pl-4 text-sm font-black uppercase tracking-[0.24em] text-[#F97316]">
              Proveedor industrial para obra
            </p>
            <h1 className="mt-6 text-4xl font-black uppercase leading-[1.04] sm:text-6xl lg:text-7xl">
              Materiales para Construccion y Obra Civil
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Proveemos materiales de calidad para proyectos residenciales,
              comerciales e industriales en todo Mexico.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalogo"
                className="bg-[#F97316] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-[#2B2B2B] transition hover:bg-white"
              >
                Ver Catalogo
              </Link>
              <Link
                href="/cotizaciones"
                className="border border-white/35 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-white transition hover:border-[#F97316] hover:text-[#F97316]"
              >
                Solicitar Cotizacion
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2B2B2B] text-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/12 px-4 py-1 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {advantages.map((advantage) => (
            <div key={advantage} className="bg-[#2B2B2B] px-5 py-7">
              <p className="text-3xl font-black text-[#F97316]">+</p>
              <p className="mt-2 font-black uppercase tracking-[0.12em]">
                {advantage}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Categorias destacadas"
          title="Materiales clave para avanzar la obra"
          description="Abasto para compras planeadas, reposiciones urgentes y suministro por volumen para constructoras, contratistas y proyectos de remodelacion."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = products.filter(
              (product) => product.category === category,
            ).length;

            return (
              <Link
                key={category}
                href="/catalogo"
                className="group border border-[#D4D4D4] bg-white p-6 transition hover:border-[#F97316] hover:bg-[#2B2B2B]"
              >
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F97316]">
                  {count} productos
                </p>
                <h3 className="mt-6 text-2xl font-black uppercase text-[#2B2B2B] transition group-hover:text-white">
                  {category}
                </h3>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#7A7A7A] transition group-hover:text-white/70">
                  Ver disponibilidad
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#4A4A4A]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 text-white sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F97316]">
              Envios y logistica
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase">
              Transporte coordinado por volumen, peso y destino
            </h2>
          </div>
          <p className="text-base leading-8 text-white/78">
            Los costos de envio pueden variar segun el volumen, peso y ubicacion
            de entrega. Una vez realizada la compra, uno de nuestros asesores se
            comunicara para coordinar la logistica, tiempos de entrega y
            requerimientos especiales de transporte.
          </p>
        </div>
      </section>
    </main>
  );
}
