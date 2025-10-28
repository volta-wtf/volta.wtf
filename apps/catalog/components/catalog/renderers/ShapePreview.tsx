"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function ShapePreview({ item }: { cat: Category; item: CatalogItem }) {
  const variant = item.variant || "radius";
  const cls = item.cssClass ?? "";
  if (variant === "sizes") {
    return (
      <div className="flex items-end gap-3">
        {[24, 36, 48, 64, 96].map((h) => (
          <div key={h} className={`w-8 bg-foreground/20 ${cls}`} style={{ height: h }} />
        ))}
      </div>
    );
  }
  if (variant === "geometries") {
    return (
      <div className="flex gap-4">
        <div className={`w-16 h-16 rounded-full bg-foreground/20 ${cls}`} />
        <div className={`w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-foreground/30 ${cls}`} />
      </div>
    );
  }
  // radius/borders
  return (
    <div className="flex gap-4">
      {[4, 8, 12, 16].map((r) => (
        <div key={r} className={`w-16 h-16 bg-foreground/20 ${cls}`} style={{ borderRadius: r }} />
      ))}
    </div>
  );
}
