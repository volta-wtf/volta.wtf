"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function FramesPreview({ item }: { cat: Category; item: CatalogItem }) {
  const className = item.cssClass ?? "";
  const variant = item.variant || "card";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase">Vista previa</p>
          <Badge variant="secondary" className="font-mono text-xs">
            {variant}
          </Badge>
        </div>
        <div className="flex items-center justify-center p-8 min-h-[180px] bg-muted/30 rounded-lg border">
          <div className={`w-full max-w-xs ${className}`}>
            {variant === "card" ? (
              <div>
                <div className="font-medium mb-2">Title</div>
                <p className="text-sm text-muted-foreground">Body content</p>
              </div>
            ) : (
              <div className="h-32" />
            )}
          </div>
        </div>
      </div>

      <Separator />

      {item.cssClass && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">CSS Class</p>
          <code className="text-sm bg-muted px-3 py-2 rounded-md block font-mono break-all">
            .{item.cssClass}
          </code>
        </div>
      )}

      <Separator />

      {item.cssClass && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">HTML Usage</p>
          <code className="text-xs bg-muted px-3 py-2 rounded-md block font-mono break-all">
            {`<div class="${item.cssClass}">...</div>`}
          </code>
        </div>
      )}
    </div>
  );
}
