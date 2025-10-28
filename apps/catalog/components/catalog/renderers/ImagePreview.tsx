"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function ImagePreview({ item }: { cat: Category; item: CatalogItem }) {
  const cls = item.cssClass ?? "";
  return (
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={`h-24 rounded border ${cls}`} />
      ))}
    </div>
  );
}
