"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function DecorationPreview({ item }: { cat: Category; item: CatalogItem }) {
  const variant = item.variant || "divider";
  const cls = item.cssClass ?? "";
  if (variant === "divider") {
    return <div className={`h-px w-full ${cls}`} />;
  }
  if (variant === "badge") {
    return <span className={`inline-block px-2 py-1 text-xs rounded ${cls}`}>Badge</span>;
  }
  // ribbon/corner etc.
  return <div className={`p-6 border rounded ${cls}`}>Decoration</div>;
}
