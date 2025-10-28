import { getCategories, getCategory, getItem } from "@/lib/catalog.gen";
import CatalogNav from "@/components/catalog/CatalogNav";
import ItemsList from "@/components/catalog/ItemsList";
import PreviewPane from "@/components/catalog/PreviewPane";
import PreviewHost from "@/components/catalog/PreviewRegistry";

export default function ItemPage({ params }: { params: { category: string; item: string } }) {
  const categories = getCategories();
  const cat = getCategory(params.category);
  const found = cat ? getItem(cat.name, params.item) : undefined;
  if (!cat || !found) return <div className="p-6">No encontrado.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_360px_1fr] min-h-screen">
      <aside className="border-r border-border bg-background/50 sticky top-0 h-svh p-4">
        <CatalogNav categories={categories} active={cat.name} />
      </aside>
      <aside className="border-r border-border bg-background/30 sticky top-0 h-svh p-4 overflow-y-auto">
        <ItemsList category={cat} activeItem={found.slug} />
      </aside>
      <main className="p-0 lg:p-6 overflow-y-auto">
        <PreviewPane title={found.title}>
          <PreviewHost cat={cat} item={found} />
        </PreviewPane>
      </main>
    </div>
  );
}
