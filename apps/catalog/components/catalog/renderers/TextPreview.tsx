"use client";
import { useState } from "react";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type TextPreviewMode = "wordart" | "default" | "pangram";

// Background options basados en apps/catalogo
const backgroundOptions = [
  { id: 'default', name: 'Default', class: 'bg-preview-default' },
  { id: 'background', name: 'Background', class: 'bg-preview-background' },
  { id: 'muted', name: 'Muted', class: 'bg-preview-muted' },
  { id: 'subtle', name: 'Subtle', class: 'bg-preview-subtle' },
  { id: 'color-1', name: 'Color 1', class: 'bg-preview-color-1' },
  { id: 'color-2', name: 'Color 2', class: 'bg-preview-color-2' },
  { id: 'color-3', name: 'Color 3', class: 'bg-preview-color-3' },
  { id: 'gradient', name: 'Gradient', class: 'bg-preview-gradient' },
];

export default function TextPreview({ item }: { cat: Category; item: CatalogItem }) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<TextPreviewMode>("wordart");
  const [selectedBackground, setSelectedBackground] = useState('default');

  const className = item.cssClass ?? "";
  const styleVar = item.variableName ? { color: `var(${item.variableName})` } : undefined;
  const pangramText = "The quick brown fox — 0123456789";
  const variant = item.variant || "content";
  const usesData = item.usesData ?? false;
  const cssVariants = item.cssVariants ?? [];
  const previewText = item.previewText ?? "Aa";

  // Obtener el texto a mostrar según el modo seleccionado
  const getDisplayText = (isSmall: boolean = false) => {
    if (isSmall) return "Aa";

    // Usar el modo seleccionado independiente de si usa data-text o no
    switch (previewMode) {
      case "wordart":
        return "WordArt";
      case "default":
        return previewText;
      case "pangram":
        return pangramText;
      default:
        return "WordArt";
    }
  };

  const renderPreview = (variantName?: string | null, isSmall: boolean = false) => {
    // Para previews pequeños (variantes), siempre usar la variante específica
    // Para preview grande, usar la variante seleccionada
    const variantClass = variantName !== undefined
      ? (variantName ? `${className} ${variantName}` : className)
      : (selectedVariant ? `${className} ${selectedVariant}` : className);

    // Obtener el texto según el modo y tamaño
    const displayText = getDisplayText(isSmall);
    // Para estilos con data-text, el atributo debe coincidir con el contenido
    const dataAttrs = usesData ? { "data-text": displayText } : {};
    const textSize = isSmall ? "text-4xl" : "text-6xl md:text-9xl";

    if (variant === "underline" || variant === "link") {
      return (
        <a className={`underline ${variantClass} ${isSmall ? 'text-base' : 'text-2xl'}`} style={styleVar} href="#" {...dataAttrs}>
          {displayText}
        </a>
      );
    }
    if (variant === "highlight") {
      return (
        <p className={`${isSmall ? 'text-xs' : 'text-base'} text-center`}>
          Some words to be highlighted:{" "}
          <mark className={`px-1 ${variantClass}`} style={styleVar} {...dataAttrs}>
            {displayText}
          </mark>{" "}
          to show how it works.
        </p>
      );
    }
    // default / wordart / content
    return (
      <span className={`${variantClass} ${textSize} font-bold`} style={styleVar} {...dataAttrs}>
        {displayText}
      </span>
    );
  };

  // Generar HTML Usage
  const generateHTMLUsage = () => {
    const classAttr = selectedVariant ? `${className} ${selectedVariant}` : className;
    const displayText = getDisplayText();
    const dataAttr = usesData ? ` data-text="${displayText}"` : "";
    const contentText = displayText.substring(0, 20);
    return `<span class="${classAttr}"${dataAttr}>${contentText}...</span>`;
  };

  // Función para obtener la clase de fondo
  const getPreviewBackgroundClass = (): string => {
    const selectedOption = backgroundOptions.find(opt => opt.id === selectedBackground);
    return selectedOption?.class || 'bg-preview-default';
  };

  return (
    <div className="space-y-6">

      <div className="space-y-2">

        {/* Preview Principal */}
        <div className={`flex items-center justify-center p-8 min-h-[180px] overflow-hidden ${getPreviewBackgroundClass()} aspect-6/3 rounded-lg border`}>
          {renderPreview()}
        </div>

        {/* Variantes disponibles */}
        {cssVariants.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {/* Variante base */}
            <button
              onClick={() => setSelectedVariant(null)}
              className={`relative flex flex-1 flex-col items-center justify-center p-4 rounded-lg border transition-all hover:border-foreground/40 flex-shrink-0 min-w-[140px] ${getPreviewBackgroundClass()} ${
                selectedVariant === null ? "border-foreground" : "border-border"
              }`}
            >
              <div className="flex items-center justify-center h-16">
                {renderPreview(null, true)}
              </div>
              <span className="mt-2 text-xs text-muted-foreground">base</span>
            </button>

            {/* Variantes */}
            {cssVariants.map((variantName) => (
              <button
                key={variantName}
                onClick={() => setSelectedVariant(variantName)}
                className={`relative flex flex-1 flex-col items-center justify-center p-4 rounded-lg border transition-all hover:border-foreground/40 flex-shrink-0 min-w-[140px] ${getPreviewBackgroundClass()} ${
                  selectedVariant === variantName ? "border-foreground" : "border-border"
                }`}
              >
                <div className="flex items-center justify-center h-16">
                  {renderPreview(variantName, true)}
                </div>
                <span className="mt-2 text-xs text-muted-foreground">{variantName}</span>
              </button>
            ))}
          </div>
        )}

        {/* Controles de Preview */}
        <div className="flex items-center justify-between pt-2">
          {/* Selector de Fondo */}
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              {backgroundOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedBackground(option.id)}
                  className={`
                  relative w-6 h-6 rounded-full transition-all hover:scale-110 border border-border
                  ${selectedBackground === option.id ? 'ring-1 ring-primary ring-offset-2 ring-offset-background' : ''}
                `}
                  title={option.name}
                >
                  <div className={`absolute inset-0 rounded-full bg-background ${option.class}`} />
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">preview</span>
          </div>
          <div className="flex items-center gap-2">
            {usesData && (
              <Badge variant="secondary" className="text-xs">
                uses data-text
              </Badge>
            )}
            <button
              onClick={() => setPreviewMode("default")}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                previewMode === "default"
                  ? "bg-foreground text-background"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setPreviewMode("pangram")}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                previewMode === "pangram"
                  ? "bg-foreground text-background"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Pangram
            </button>
            <button
              onClick={() => setPreviewMode("wordart")}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                previewMode === "wordart"
                  ? "bg-foreground text-background"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              WordArt
            </button>
          </div>
        </div>

      </div>

      <Separator />

      {/* CSS Class */}
      {item.cssClass && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">CSS Class</p>
          <code className="text-sm bg-muted px-3 py-2 rounded-md block font-mono break-all">
            .{selectedVariant ? `${className}.${selectedVariant}` : className}
          </code>
        </div>
      )}

      {/* HTML Usage */}
      {item.cssClass && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">HTML Usage</p>
          <code className="text-xs bg-muted px-3 py-2 rounded-md block font-mono break-all whitespace-pre-wrap">
            {generateHTMLUsage()}
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
