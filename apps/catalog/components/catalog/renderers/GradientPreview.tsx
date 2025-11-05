"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function GradientPreview({ item }: { cat: Category; item: CatalogItem }) {
  const variant = item.variant || "linear";
  const gradientStyle = item.variableName
    ? { backgroundImage: `var(${item.variableName})` }
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
            className="w-full h-40 rounded-md shadow-sm"
            style={gradientStyle}
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
            {`background-image: var(${item.variableName});`}
          </code>
        </div>
      )}
    </div>
  );
}
