"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ShadowPreview({ item }: { cat: Category; item: CatalogItem }) {
  const variant = item.variant || "elevation";
  const shadowStyle = item.variableName
    ? { boxShadow: `var(${item.variableName})` }
    : undefined;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase">Vista previa</p>
          <Badge variant="secondary" className="font-mono text-xs">
            {variant}
          </Badge>
        </div>
        <div className="flex items-center justify-center p-8 min-h-[180px] bg-muted/40 aspect-6/3 rounded-lg border">
          <div
            className="w-32 h-32 bg-white rounded-lg"
            style={shadowStyle}
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
            {`box-shadow: var(${item.variableName});`}
          </code>
        </div>
      )}
    </div>
  );
}
