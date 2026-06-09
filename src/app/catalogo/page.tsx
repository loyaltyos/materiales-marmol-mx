import { CatalogClient } from "@/components/CatalogClient";
import { SectionHeader } from "@/components/SectionHeader";

export default function CatalogoPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Catalogo"
        title="Productos para construccion, obra civil y remodelacion"
        description="Selecciona cantidades reales de obra, revisa subtotales por material y solicita una cotizacion con coordinacion logistica."
      />
      <div className="mt-10">
        <CatalogClient />
      </div>
    </main>
  );
}
