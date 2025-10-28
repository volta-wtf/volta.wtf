"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function FontPreview({ item }: { cat: Category; item: CatalogItem }) {
  const sample = (item.renderProps?.sampleText as string) || "Sphinx of black quartz, judge my vow — 0123456789";
  const fam = item.variableName ? { fontFamily: `var(${item.variableName})` } : undefined;
  const scale = (item.renderProps?.sizes as string[]) || ["0.75rem","0.875rem","1rem","1.125rem","1.25rem","1.5rem","1.875rem"];
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Family</div>
      <div className="rounded border p-4" style={fam}>{sample}</div>
      <div className="text-sm text-muted-foreground">Scale</div>
      <div className="space-y-2">
        {scale.map((s) => (
          <div key={s} style={{ fontSize: s }}>{sample} <span className="text-xs text-muted-foreground ml-2">{s}</span></div>
        ))}
      </div>
    </div>
  );
}
