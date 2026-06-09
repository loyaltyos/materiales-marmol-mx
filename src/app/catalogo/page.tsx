import { CatalogClient } from "@/components/CatalogClient";
import { SectionHeader } from "@/components/SectionHeader";

type CatalogoPageProps = {
  searchParams: Promise<{
    categoria?: string;
    q?: string;
  }>;
};

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Catalogo"
        title="Compra materiales para construccion"
        description="Elige productos, ajusta cantidades de obra y agregalos al carrito para finalizar tu pedido online o solicitar una cotizacion especial."
      />
      <div className="mt-10">
        <CatalogClient
          initialCategory={params.categoria}
          initialSearch={params.q}
        />
      </div>
    </main>
  );
}
