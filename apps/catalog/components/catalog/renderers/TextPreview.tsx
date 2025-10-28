"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function TextPreview({ item }: { cat: Category; item: CatalogItem }) {
  const className = item.cssClass ?? "";
  const styleVar = item.variableName ? { color: `var(${item.variableName})` } : undefined;
  const sample = (item.renderProps?.sampleText as string) || "The quick brown fox — áéíóú ñ Ñ 0123456789";
  const variant = item.variant || "content";

  if (variant === "underline" || variant === "link") {
    return (
      <div className="space-y-3">
        <a className={`underline ${className}`} style={styleVar} href="#">{sample}</a>
      </div>
    );
  }
  if (variant === "highlight") {
    return (
      <div className="space-y-3">
        Some words to be highlighted:
        <mark className={`px-1 ${className}`} style={styleVar}>{sample}</mark>
        to show how it works.
      </div>
    );
  }
  // default / wordart / content
  return (
    <div className="space-y-3">
      <span className={`${className}`} style={styleVar}>{sample}</span>
    </div>
  );
}
