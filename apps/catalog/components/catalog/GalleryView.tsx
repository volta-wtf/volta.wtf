"use client";
import Link from "next/link";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

interface GalleryViewProps {
  category: Category;
  activeItemSlug?: string | null;
  isPreviewOpen?: boolean;
}

function GalleryItemPreview({ item, view }: { item: CatalogItem; view: Category["view"] }) {
  const className = item.cssClass ?? "";
  const sample = (item.renderProps?.sampleText as string) || "Aa";

  // Frames - Solo mostrar el borde/marco sin texto
  if (view === "frames") {
    return (
      <div className={`w-full h-full ${className}`} />
    );
  }

  // Shape - Div con fondo blanco que muestra la forma (border-radius, clip-path, mask o borders)
  if (view === "shape") {
    const isClipPath = item.variableName?.includes('clip') && !item.variableName.includes('squircle');
    const isMask = item.variableName?.includes('mask');
    const isBorder = item.variableName?.startsWith('--border-');
    const isBorderWidth = isBorder && (item.variableName?.includes('thin') || item.variableName?.includes('base') || item.variableName?.includes('bold'));
    const isBorderStyle = isBorder && item.variableName?.includes('style');
    const isBorderColor = isBorder && item.variableName?.includes('color');
    const itemValue = (item as any).value;

    let shapeStyle: React.CSSProperties = {};

    if (isBorder) {
      // Renderizar borders
      shapeStyle = { backgroundColor: 'white' };
      if (isBorderWidth) {
        shapeStyle = {
          ...shapeStyle,
          borderWidth: itemValue || `var(${item.variableName})`,
          borderStyle: 'solid',
          borderColor: 'hsl(221, 70%, 55%)',
        };
      } else if (isBorderStyle) {
        shapeStyle = {
          ...shapeStyle,
          borderWidth: '2px',
          borderStyle: itemValue || `var(${item.variableName})`,
          borderColor: 'hsl(221, 70%, 55%)',
        };
      } else if (isBorderColor) {
        shapeStyle = {
          ...shapeStyle,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: itemValue || `var(${item.variableName})`,
        };
      }
    } else {
      // Para clip-path, mask o border-radius
      shapeStyle = item.variableName
        ? isClipPath
          ? { clipPath: itemValue || `var(${item.variableName})` }
          : isMask
            ? {
                mask: itemValue || `var(${item.variableName})`,
                WebkitMask: itemValue || `var(${item.variableName})`
              }
            : { borderRadius: itemValue || `var(${item.variableName})` }
        : {};
    }

    // Para clip-path o mask, necesitamos un contenedor con el filter
    if (isClipPath || isMask) {
      return (
        <div className="flex items-center justify-center p-6">
          <div style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))' }}>
            <div
              className={`w-40 h-20 bg-white ${className}`}
              style={shapeStyle}
            />
          </div>
        </div>
      );
    }

    // Para border-radius o borders, usamos box-shadow directamente
    return (
      <div className="flex items-center justify-center p-6">
        <div
          className={`w-40 h-20 ${isBorder ? 'rounded-md' : ''} bg-white ${className}`}
          style={{
            ...shapeStyle,
            ...(!isBorder && { boxShadow: '0 4px 6px rgb(0 0 0 / 0.1), 0 2px 4px rgb(0 0 0 / 0.1)' })
          }}
        />
      </div>
    );
  }

  // Shadow - Div con fondo blanco que muestra la sombra
  if (view === "shadow") {
    const shadowStyle = item.variableName
      ? { boxShadow: `var(${item.variableName})` }
      : undefined;
    return (
      <div className="flex items-center justify-center p-6">
        <div
          className={`w-24 h-24 bg-white rounded-lg ${className}`}
          style={shadowStyle}
        />
      </div>
    );
  }

  // Gradient - Div que muestra el gradiente como fondo
  if (view === "gradient") {
    const gradientStyle = item.variableName
      ? { backgroundImage: `var(${item.variableName})` }
      : undefined;
    return (
      <div
        className={`w-full h-full rounded-md ${className}`}
        style={gradientStyle}
      />
    );
  }

  // Image - Div que muestra la imagen como fondo
  if (view === "image") {
    const imageStyle = item.variableName
      ? { backgroundImage: `var(${item.variableName})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : undefined;
    return (
      <div
        className={`w-full h-full rounded-md ${className}`}
        style={imageStyle}
      />
    );
  }

  // Color - Div que muestra el color
  if (view === "color") {
    const colorStyle = item.variableName
      ? { backgroundColor: `var(${item.variableName})` }
      : undefined;
    return (
      <div
        className={`w-full h-full rounded-md ${className}`}
        style={colorStyle}
      />
    );
  }

  // Text y otros - Mostrar texto con el estilo aplicado
  const textStyle = item.variableName ? { color: `var(${item.variableName})` } : undefined;
  return (
    <div
      className={`text-center text-7xl font-bold select-none pointer-events-none ${className}`}
      style={textStyle}
    >
      {sample}
    </div>
  );
}

export default function GalleryView({ category, activeItemSlug, isPreviewOpen = false }: GalleryViewProps) {
  const gridCols = isPreviewOpen
    ? "grid-cols-2"
    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

  return (
    <div className={`grid ${gridCols} gap-2 p-4`}>
      {category.items.map((item) => {
        const href = `/${category.name}/${item.slug}`;
        const isActive = activeItemSlug === item.slug;

        return (
          <Link
            key={item.slug}
            href={href}
            className={`
              group relative aspect-[4/3] rounded-md cursor-pointer
              bg-muted/40 aspect-6/3 border transition-all duration-300 overflow-hidden
              hover:border-primary/30 hover:bg-muted/50
              ${isActive ? "border-primary/50 bg-muted/60 ring-1 ring-primary/20" : "border-transparent"}
            `}
          >
            {/* Preview */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <GalleryItemPreview item={item} view={category.view} />
            </div>

            {/* Label on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs font-medium truncate">{item.title}</p>
              {item.cssClass && (
                <p className="text-[10px] text-muted-foreground font-mono truncate">
                  .{item.cssClass}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
