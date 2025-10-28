"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function FramesPreview({ item }: { cat: Category; item: CatalogItem }) {
  const cls = item.cssClass ?? "";
  const variant = item.variant || "card";
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`p-4 border rounded ${cls}`}>
          {variant === "card" ? (
            <div>
              <div className="font-medium mb-2">Title</div>
              <p className="text-sm text-muted-foreground">Body content</p>
            </div>
          ) : (
            <div className="h-16" />
          )}
        </div>
      ))}
    </div>
  );
}
