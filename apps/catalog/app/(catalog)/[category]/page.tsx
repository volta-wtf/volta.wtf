import { getCategories, getCategory } from "@/lib/catalog.gen";
import CatalogNav from "@/components/catalog/CatalogNav";
import ItemsList from "@/components/catalog/ItemsList";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categories = getCategories();
  const cat = getCategory(params.category);
  if (!cat) return <div className="p-6">Categoría no encontrada.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_360px_1fr] min-h-screen">
      <aside className="border-r border-border bg-background/50 sticky top-0 h-svh p-4">
        <CatalogNav categories={categories} active={cat.name} />
      </aside>
      <aside className="border-r border-border bg-background/30 sticky top-0 h-svh p-4 overflow-y-auto">
        <ItemsList category={cat} activeItem={null} />
      </aside>
      <main className="p-6 text-muted-foreground">
        Elige un item de <span className="font-medium">{cat.label}</span>.
      </main>
    </div>
  );
}
