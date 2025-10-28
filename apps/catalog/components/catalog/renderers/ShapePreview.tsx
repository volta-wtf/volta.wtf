"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ShapePreview({ item }: { cat: Category; item: CatalogItem }) {
  const variant = item.variant || "radius";
  const isClipPath = item.variableName?.includes('clip') && !item.variableName.includes('squircle');
  const itemValue = (item as any).value;
  const baseShapeStyle = item.variableName
    ? isClipPath
      ? { clipPath: itemValue || `var(${item.variableName})` }
      : { borderRadius: itemValue || `var(${item.variableName})` }
    : undefined;

  const renderPreview = () => {
    const dropShadowStyle = { filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))' };
    const boxShadowStyle = { boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' };

    if (variant === "sizes") {
      return (
        <div className="flex items-end justify-center gap-3">
          {[24, 36, 48, 64, 96].map((h) =>
            isClipPath ? (
              <div key={h} style={dropShadowStyle}>
                <div
                  className="w-8 bg-white"
                  style={{ height: h, ...baseShapeStyle }}
                />
              </div>
            ) : (
              <div
                key={h}
                className="w-8 bg-white"
                style={{ height: h, ...baseShapeStyle, ...boxShadowStyle }}
              />
            )
          )}
        </div>
      );
    }

    if (variant === "geometries") {
      return (
        <div className="flex justify-center gap-6">
          {isClipPath ? (
            <div style={dropShadowStyle}>
              <div className="w-20 h-20 bg-white" style={baseShapeStyle} />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-white" style={{ ...baseShapeStyle, ...boxShadowStyle }} />
          )}
          <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[80px] border-transparent border-b-white"
               style={dropShadowStyle} />
        </div>
      );
    }

    // radius/borders - default
    if (isClipPath) {
      return (
        <div className="flex justify-center">
          <div style={dropShadowStyle}>
            <div className="w-32 h-32 bg-white" style={baseShapeStyle} />
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <div className="w-32 h-32 bg-white" style={{ ...baseShapeStyle, ...boxShadowStyle }} />
      </div>
    );
  };

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
          {renderPreview()}
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
            {isClipPath
              ? `clip-path: var(${item.variableName});`
              : `border-radius: var(${item.variableName});`
            }
          </code>
        </div>
      )}
    </div>
  );
}
