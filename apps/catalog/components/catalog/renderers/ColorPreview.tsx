"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ColorPreview({ item }: { cat: Category; item: CatalogItem }) {
  const variant = item.variant || "single";

  if (variant === "single") {
    const colorStyle = item.variableName
      ? { backgroundColor: `var(${item.variableName})` }
      : {};

    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase">Vista previa</p>
            <Badge variant="secondary" className="font-mono text-xs">
              single
            </Badge>
          </div>
          <div className="flex items-center justify-center p-8 min-h-[180px] bg-muted/40 aspect-6/3 rounded-lg border">
            <div
              className="w-full h-32 rounded-md shadow-sm"
              style={colorStyle}
            />
          </div>
        </div>

        <Separator />

        {item.variableName && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase">CSS Variable</p>
            <code className="text-sm bg-muted px-3 py-2 rounded-md block font-mono break-all">
              {item.variableName}
            </code>
          </div>
        )}

        <Separator />

        {item.variableName && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase">CSS Usage</p>
            <code className="text-xs bg-muted px-3 py-2 rounded-md block font-mono break-all">
              {`background-color: var(${item.variableName});`}
            </code>
          </div>
        )}
      </div>
    );
  }

  if (variant === "palette" || variant === "scale") {
    const names = (item.renderProps?.steps as string[]) || [
      "--color-primary-50","--color-primary-100","--color-primary-200","--color-primary-300","--color-primary-400","--color-primary-500"
    ];
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase">Vista previa</p>
            <Badge variant="secondary" className="font-mono text-xs">
              {variant}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{names.length} colores</p>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-3">
          {names.map((n) => (
            <div key={n} className="space-y-2">
              <div
                className="w-full h-20 rounded-md border shadow-sm"
                style={{ backgroundColor: `var(${n})` }}
              />
              <span className="text-xs font-mono text-muted-foreground block truncate">
                {n}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // roles demo
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase">Vista previa</p>
          <Badge variant="secondary" className="font-mono text-xs">
            roles
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Demostración de roles de color</p>
      </div>
      <Separator />
      <div className="rounded-lg border p-4" style={{ backgroundColor: `var(--surface)` }}>
        <div className="p-3 rounded-lg shadow-sm" style={{ backgroundColor: `var(--card)` }}>
          <p className="mb-2 text-sm" style={{ color: `var(--text)` }}>Sample text</p>
          <button className="px-3 py-1.5 text-sm rounded-md border shadow-sm" style={{ backgroundColor: `var(--accent)` }}>
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
