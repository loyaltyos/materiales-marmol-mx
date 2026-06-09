import { SectionHeader } from "@/components/SectionHeader";

const pillars = [
  {
    title: "Experiencia",
    text: "Integramos conocimiento de obra, abastecimiento y servicio para responder a proyectos residenciales, comerciales e industriales.",
  },
  {
    title: "Calidad",
    text: "Trabajamos con materiales seleccionados para cumplir necesidades tecnicas, ritmos de ejecucion y estandares de construccion.",
  },
  {
    title: "Servicio",
    text: "Acompañamos cada solicitud con atencion clara, seguimiento comercial y respuestas practicas para compras de volumen.",
  },
  {
    title: "Logistica",
    text: "Coordinamos entregas considerando peso, volumen, accesos, ubicacion y requerimientos especiales de transporte.",
  },
];

export default function NosotrosPage() {
  return (
    <main>
      <section className="bg-[#2B2B2B] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#F97316]">
            Ecosistema Marmol MX
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-tight sm:text-5xl">
            Soluciones de suministro con respaldo institucional
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Materiales Marmol MX forma parte del ecosistema Marmol MX, una linea
            institucional enfocada en calidad, cumplimiento y atencion
            profesional para proyectos que requieren proveedores confiables.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nosotros"
          title="Compromiso operativo para construir con continuidad"
          description="Nuestro enfoque combina experiencia, calidad, servicio y logistica para que cada compra avance con claridad desde la cotizacion hasta la entrega."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="border border-[#D4D4D4] bg-white p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F97316]">
                {pillar.title}
              </p>
              <p className="mt-4 leading-7 text-[#4A4A4A]">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
