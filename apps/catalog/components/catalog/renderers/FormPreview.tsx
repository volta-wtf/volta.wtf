"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function FormPreview({ item }: { cat: Category; item: CatalogItem }) {
  const cls = item.cssClass ?? "";
  return (
    <form className="space-y-3">
      <input className={`w-full rounded border px-3 py-2 ${cls}`} placeholder="Input" />
      <button className={`px-3 py-2 rounded ${cls}`} type="button">Button</button>
      <div className={`h-1 rounded ${cls}`} />
    </form>
  );
}
