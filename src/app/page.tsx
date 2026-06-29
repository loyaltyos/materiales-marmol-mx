import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppIcon } from "@/components/Icons";
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
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#242424] text-white">
        <Image
          src="/hero-industrial.png"
          alt="Patio industrial con materiales de construccion, block, cemento, grava y transporte"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,28,28,0.94)_0%,rgba(43,43,43,0.78)_48%,rgba(43,43,43,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(249,115,22,0.18),transparent_30%)]" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-xl border border-white/15 bg-white/8 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#F97316] shadow-sm backdrop-blur">
              Proveedor industrial para obra
            </p>
            <h1 className="mt-6 text-4xl font-black uppercase leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Materiales para Construccion y Obra Civil
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/78">
              Proveemos materiales de calidad para proyectos residenciales,
              comerciales e industriales en todo Mexico.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalogo"
                className="premium-button rounded-xl bg-[#F97316] px-7 py-4 text-center text-xs font-black uppercase tracking-[0.13em] text-[#242424] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Ver Catalogo
              </Link>
              <Link
                href="/cotizaciones"
                className="rounded-xl border border-white/20 bg-white/8 px-7 py-4 text-center text-xs font-black uppercase tracking-[0.13em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#242424]"
              >
                Solicitar Cotizacion
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#242424] text-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/12 px-4 py-1 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {advantages.map((advantage) => (
            <div key={advantage} className="bg-[#242424] px-5 py-7">
              <span className="block h-1 w-7 rounded-full bg-[#F97316]" />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-white/85">
                {advantage}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Categorias destacadas"
          title="Materiales clave para avanzar la obra"
          description="Abasto para compras planeadas, reposiciones urgentes y suministro por volumen para constructoras, contratistas y proyectos de remodelacion."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category,
            );
            const count = categoryProducts.length;
            const image = categoryProducts[0]?.image;

            return (
              <Link
                key={category}
                href={`/catalogo?categoria=${encodeURIComponent(category)}`}
                className="group relative min-h-64 overflow-hidden rounded-[1.5rem] bg-[#242424] p-6 shadow-[0_16px_45px_rgba(30,30,30,.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(30,30,30,.2)]"
              >
                {image ? <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-45" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#242424]/45 to-transparent" />
                <div className="relative flex min-h-52 flex-col justify-between">
                <p className="w-fit rounded-lg border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                  {count} productos
                </p>
                <div><h3 className="text-2xl font-black uppercase tracking-[-0.025em] text-white">
                  {category}
                </h3>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#F97316]">Ver disponibilidad →</p></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#303030]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 text-white sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F97316]">
              Envios y logistica
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase">
              Transporte coordinado por volumen, peso y destino
            </h2>
          </div>
          <div><p className="text-base leading-8 text-white/68">
            Los costos de envio pueden variar segun el volumen, peso y ubicacion
            de entrega. Una vez realizada la compra, uno de nuestros asesores se
            comunicara para coordinar la logistica, tiempos de entrega y
            requerimientos especiales de transporte.
          </p><a href="https://wa.me/525573328442" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25D366] px-5 text-xs font-black uppercase tracking-[0.1em] text-[#102018] transition hover:-translate-y-0.5 hover:bg-white"><WhatsAppIcon className="h-5 w-5" /> Coordinar con un asesor</a></div>
        </div>
      </section>
    </main>
  );
}
