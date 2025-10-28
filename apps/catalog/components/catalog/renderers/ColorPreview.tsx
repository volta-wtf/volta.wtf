"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

function Swatch({ style, label }: { style: React.CSSProperties; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded border" style={style} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function ColorPreview({ item }: { cat: Category; item: CatalogItem }) {
  const variant = item.variant || "single";
  if (variant === "single") {
    const style = item.variableName ? { background: `var(${item.variableName})` } : {};
    return <Swatch style={style} label={item.variableName ?? item.title} />;
  }
  if (variant === "palette" || variant === "scale") {
    const names = (item.renderProps?.steps as string[]) || [
      "--color-primary-50","--color-primary-100","--color-primary-200","--color-primary-300","--color-primary-400","--color-primary-500"
    ];
    return (
      <div className="grid grid-cols-3 gap-3">
        {names.map((n) => (
          <div key={n} className="p-2 rounded border">
            <div className="h-10 rounded" style={{ background: `var(${n})` }} />
            <div className="mt-1 text-[10px] text-muted-foreground">{n}</div>
          </div>
        ))}
      </div>
    );
  }
  // roles demo
  return (
    <div className="rounded border">
      <div className="p-4" style={{ background: `var(--surface)` }}>
        <div className="p-3 rounded" style={{ background: `var(--card)` }}>
          <p style={{ color: `var(--text)` }}>Sample text</p>
          <button className="mt-2 px-2 py-1 rounded border" style={{ background: `var(--accent)` }}>Button</button>
        </div>
      </div>
    </div>
  );
}
