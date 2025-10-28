"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Badge } from "@/components/ui/badge";

export default function ComponentPreview({ cat, item }: { cat: Category; item: CatalogItem }) {
  // assumes path: components/previews/<subfolder>/<ComponentName>.tsx
  const sub = cat.name.split("-")[1] ?? "misc";
  const Dyn = useMemo(
    () => dynamic(() => import(`@/components/previews/${sub}/${item.componentName}`)),
    [sub, item.componentName]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase">Vista previa</p>
          <Badge variant="secondary" className="font-mono text-xs">
            {item.componentName}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Componente interactivo</p>
      </div>
      <div className="bg-muted/30 p-6 rounded-lg border flex items-center justify-center min-h-[300px]">
        {/* @ts-ignore */}
        <Dyn />
      </div>
    </div>
  );
}
