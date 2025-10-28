"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function GradientPreview({ item }: { cat: Category; item: CatalogItem }) {
  const cls = item.cssClass ?? "";
  const style = item.variableName ? { background: `var(${item.variableName})` } : undefined;
  return <div className={`h-40 rounded border ${cls}`} style={style} />;
}
