import { redirect } from "next/navigation";
import { getCategories } from "@/lib/catalog.gen";

export default function Home() {
  const categories = getCategories();

  // Redirigir a la primera categoría si existe
  if (categories.length > 0) {
    redirect(`/${categories[0].name}`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Catálogo VOLTA</h1>
        <p className="text-muted-foreground mb-4">No hay categorías configuradas.</p>
        <div className="bg-muted p-4 rounded-lg text-left">
          <p className="text-sm text-muted-foreground">
            Para generar el catálogo, ejecuta:
          </p>
          <code className="block mt-2 bg-background px-3 py-2 rounded text-sm">
            pnpm run gen:catalog
          </code>
        </div>
      </div>
    </div>
  );
}
