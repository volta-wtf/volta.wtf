"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function TextPreview({ item }: { cat: Category; item: CatalogItem }) {
  const className = item.cssClass ?? "";
  const styleVar = item.variableName ? { color: `var(${item.variableName})` } : undefined;
  const sample = (item.renderProps?.sampleText as string) || "The quick brown fox — áéíóú ñ Ñ 0123456789";
  const variant = item.variant || "content";

  const renderPreview = () => {
    if (variant === "underline" || variant === "link") {
      return (
        <a className={`underline ${className} text-2xl`} style={styleVar} href="#">
          {sample}
        </a>
      );
    }
    if (variant === "highlight") {
      return (
        <p className="text-base text-center">
          Some words to be highlighted:{" "}
          <mark className={`px-1 ${className}`} style={styleVar}>
            {sample}
          </mark>{" "}
          to show how it works.
        </p>
      );
    }
    // default / wordart / content
    return (
      <span className={`${className} text-8xl`} style={styleVar}>
        {sample}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between hidden">
          <p className="text-xs font-medium text-muted-foreground uppercase">Vista previa</p>
          <Badge variant="secondary" className="font-mono text-xs">
            {variant}
          </Badge>
        </div>
        <div className="flex items-center justify-center p-8 min-h-[180px] bg-muted/40 aspect-6/3 rounded-lg border">
          {renderPreview()}
        </div>
      </div>

      {/* CSS Class */}
      {item.cssClass && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">CSS Class</p>
          <code className="text-sm bg-muted px-3 py-2 rounded-md block font-mono break-all">
            .{item.cssClass}
          </code>
        </div>
      )}

      {/* HTML Usage */}
      {item.cssClass && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">HTML Usage</p>
          <code className="text-xs bg-muted px-3 py-2 rounded-md block font-mono break-all">
            {`<span class="${item.cssClass}">${sample.substring(0, 20)}...</span>`}
          </code>
        </div>
      )}

      {/* CSS Variable */}
      {item.variableName && (
        <>
          <Separator />
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase">CSS Variable</p>
            <code className="text-sm bg-muted px-3 py-2 rounded-md block font-mono break-all">
              {item.variableName}
            </code>
          </div>
        </>
      )}

      {/* CSS Output */}
      {item.cssClass && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">CSS Output</p>
          <pre className="text-[11px] bg-muted px-3 py-3 rounded-md overflow-x-auto font-mono leading-relaxed">
            <code>{`.${item.cssClass} {
  /* Estilos aplicados */
}`}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
