import { getCategories } from "@/lib/catalog.gen";
import { CatalogShell } from "@/components/catalog/CatalogShell";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getCategories();

  return <CatalogShell categories={categories}>{children}</CatalogShell>;
}
