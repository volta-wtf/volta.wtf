"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function ShadowPreview({ item }: { cat: Category; item: CatalogItem }) {
  const variant = item.variant || "elevation";
  const cls = item.cssClass ?? "";
  const elevations = [0,1,2,3,4];
  return (
    <div className="grid grid-cols-5 gap-4">
      {elevations.map((e) => (
        <div key={e} className={`h-24 rounded bg-background ${cls}`} style={{ boxShadow: `var(--shadow-${variant}-${e}, 0 0 0 rgba(0,0,0,0))` }} />
      ))}
    </div>
  );
}
