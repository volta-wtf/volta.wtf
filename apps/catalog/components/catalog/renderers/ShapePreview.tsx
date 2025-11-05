"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Tipos y constantes
type PresetSize = {
  label: string;
  width: number;
  height: number;
};

type PresetCategory = {
  title: string;
  items: PresetSize[];
};

const PRESET_SIZES: PresetCategory[] = [
  {
    title: "Preset sizes",
    items: [
      { label: "Avatar", width: 32, height: 32 },
      { label: "Icono", width: 40, height: 40 },
      { label: "Button", width: 120, height: 40 },
      { label: "Input", width: 200, height: 40 },
      { label: "Card", width: 320, height: 240 },
    ],
  },
];

// Componente del handle de redimensionamiento
function ResizeHandle({
  onMouseDown,
  isDragging
}: {
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging: boolean;
}) {
  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute cursor-nwse-resize group select-none ${isDragging ? '' : 'hover:scale-110 transition-transform'}`}
      style={{
        right: '-16px',
        bottom: '-16px',
        width: '24px',
        height: '24px',
        touchAction: 'none',
      }}
    >
      <div
        className={`absolute bg-primary/20 group-hover:opacity-100 pointer-events-none ${isDragging ? '' : 'transition-all'}`}
        style={{
          width: '4px',
          height: '20px',
          opacity: isDragging ? 1 : 0.6,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          borderRadius: '2px',
        }}
      />
    </div>
  );
}

// Componente para items del dropdown
function DropdownItem({
  preset,
  onClick
}: {
  preset: PresetSize;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 text-xs text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
    >
      <span>{preset.label}</span>
      <span className="font-mono text-muted-foreground">
        {preset.width}×{preset.height}
      </span>
    </button>
  );
}

// Componente para categorías del dropdown
function DropdownCategory({
  category,
  onSelectSize,
  showSeparator
}: {
  category: PresetCategory;
  onSelectSize: (width: number, height: number) => void;
  showSeparator: boolean;
}) {
  return (
    <>
      {showSeparator && <Separator className="my-1" />}
      <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground/50">
        {category.title}
      </div>
      {category.items.map((preset) => (
        <DropdownItem
          key={`${preset.width}x${preset.height}`}
          preset={preset}
          onClick={() => onSelectSize(preset.width, preset.height)}
        />
      ))}
    </>
  );
}

export default function ShapePreview({ item }: { cat: Category; item: CatalogItem }) {
  const [shapeWidth, setShapeWidth] = useState(240);
  const [shapeHeight, setShapeHeight] = useState(120);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const variant = item.variant || "radius";
  const isClipPath = item.variableName?.includes('clip') && !item.variableName.includes('squircle');
  const isMask = item.variableName?.includes('mask');
  const isBorder = item.variableName?.startsWith('--border-');
  const isBorderWidth = isBorder && (item.variableName?.includes('thin') || item.variableName?.includes('base') || item.variableName?.includes('bold'));
  const isBorderStyle = isBorder && item.variableName?.includes('style');
  const isBorderColor = isBorder && item.variableName?.includes('color');
  const itemValue = (item as any).value;

  // Handlers para el redimensionamiento por arrastre
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: shapeWidth,
      height: shapeHeight,
    };
  }, [shapeWidth, shapeHeight]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    // Calcular el movimiento del mouse desde la posición inicial
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Obtener el tamaño máximo disponible del contenedor (con algo de padding)
    const maxWidth = containerRef.current
      ? containerRef.current.offsetWidth - 64  // Restar padding del contenedor
      : 800;  // Fallback si no hay referencia
    const maxHeight = containerRef.current
      ? containerRef.current.offsetHeight - 64
      : 600;

    // Duplicar el delta porque el shape está centrado y crece en ambas direcciones
    const newWidth = Math.max(48, Math.min(maxWidth, dragStartRef.current.width + (deltaX * 2)));
    const newHeight = Math.max(48, Math.min(maxHeight, dragStartRef.current.height + (deltaY * 2)));

    // Usar requestAnimationFrame para suavizar las actualizaciones
    requestAnimationFrame(() => {
      setShapeWidth(Math.round(newWidth));
      setShapeHeight(Math.round(newHeight));
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Efectos para los event listeners globales
  useEffect(() => {
    if (isDragging) {
      // Prevenir selección de texto durante el drag
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'nwse-resize';

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Determinar el estilo base según el tipo de variable
  const baseShapeStyle = item.variableName
    ? isClipPath
      ? { clipPath: itemValue || `var(${item.variableName})` }
      : isMask
        ? {
            mask: itemValue || `var(${item.variableName})`,
            WebkitMask: itemValue || `var(${item.variableName})`
          }
        : isBorder
          ? {} // Los borders se manejan de forma especial abajo
          : { borderRadius: itemValue || `var(${item.variableName})` }
    : undefined;

  const renderPreview = () => {
    const dropShadowStyle = { filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))' };
    const boxShadowStyle = { boxShadow: '0 4px 6px rgb(0 0 0 / 0.1), 0 2px 4px rgb(0 0 0 / 0.1)' };

    // Renderizar borders
    if (isBorder) {
      let borderStyle: React.CSSProperties = {
        backgroundColor: 'white',
      };

      if (isBorderWidth) {
        borderStyle = {
          ...borderStyle,
          borderWidth: itemValue || `var(${item.variableName})`,
          borderStyle: 'solid',
          borderColor: 'hsl(221, 70%, 55%)',
        };
      } else if (isBorderStyle) {
        borderStyle = {
          ...borderStyle,
          borderWidth: '3px',
          borderStyle: itemValue || `var(${item.variableName})`,
          borderColor: 'hsl(221, 70%, 55%)',
        };
      } else if (isBorderColor) {
        borderStyle = {
          ...borderStyle,
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: itemValue || `var(${item.variableName})`,
        };
      }

      return (
        <div className="flex justify-center gap-4">
          <div className="relative inline-block">
            <div
              className="rounded-md"
              style={{
                width: shapeWidth,
                height: shapeHeight,
                transition: isDragging ? 'none' : 'width 0.15s ease-out, height 0.15s ease-out',
                ...borderStyle
              }}
            />
            <ResizeHandle onMouseDown={handleMouseDown} isDragging={isDragging} />
          </div>
        </div>
      );
    }

    if (variant === "sizes") {
      return (
        <div className="flex items-end justify-center gap-3">
          {[24, 36, 48, 64, 96].map((h) =>
            isClipPath || isMask ? (
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
          {isClipPath || isMask ? (
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
    if (isClipPath || isMask) {
      return (
        <div className="flex justify-center">
          <div className="relative inline-block">
            <div style={dropShadowStyle}>
              <div
                className="bg-white"
                style={{
                  width: shapeWidth,
                  height: shapeHeight,
                  transition: isDragging ? 'none' : 'width 0.15s ease-out, height 0.15s ease-out',
                  ...baseShapeStyle
                }}
              />
            </div>
            <ResizeHandle onMouseDown={handleMouseDown} isDragging={isDragging} />
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <div className="relative inline-block">
          <div
            className="bg-white"
            style={{
              width: shapeWidth,
              height: shapeHeight,
              transition: isDragging ? 'none' : 'width 0.15s ease-out, height 0.15s ease-out',
              ...baseShapeStyle,
              ...boxShadowStyle
            }}
          />
          <ResizeHandle onMouseDown={handleMouseDown} isDragging={isDragging} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">

      <div className="space-y-3">
        <div className="flex items-center justify-between hidden">
          <p className="text-xs font-medium text-muted-foreground uppercase">Vista previa</p>
          <Badge variant="secondary" className="font-mono text-xs">
            {variant}
          </Badge>
        </div>
        <div ref={containerRef} className="flex items-center justify-center p-8 min-h-[180px] bg-muted/40 aspect-6/3 rounded-lg border">
          {renderPreview()}
        </div>
      </div>

      {/* Indicador de tamaño actual con desplegable */}
      {variant !== "sizes" && variant !== "geometries" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-muted-foreground uppercase">Tamaño</p>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-1.5"
              >
                <Badge variant="outline" className="font-mono text-xs cursor-pointer hover:bg-muted/50 transition-colors inline-flex items-center gap-1">
                  {shapeWidth}×{shapeHeight}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Badge>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-popover border rounded-md shadow-lg z-50 py-1">
                  {PRESET_SIZES.map((category, index) => (
                    <DropdownCategory
                      key={category.title}
                      category={category}
                      onSelectSize={(width, height) => {
                        setShapeWidth(width);
                        setShapeHeight(height);
                        setIsDropdownOpen(false);
                      }}
                      showSeparator={index > 0}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {item.variableName && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">CSS Variable</p>
          <code className="text-sm bg-muted px-3 py-2 rounded-md block font-mono break-all">
            {item.variableName}
          </code>
        </div>
      )}

      {item.variableName && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">CSS Usage</p>
          <code className="text-xs bg-muted px-3 py-2 rounded-md block font-mono break-all">
            {isClipPath
              ? `clip-path: var(${item.variableName});`
              : isMask
                ? `mask: var(${item.variableName});`
                : isBorderWidth
                  ? `border-width: var(${item.variableName});`
                  : isBorderStyle
                    ? `border-style: var(${item.variableName});`
                    : isBorderColor
                      ? `border-color: var(${item.variableName});`
                      : isBorder
                        ? `border: var(${item.variableName});`
                        : `border-radius: var(${item.variableName});`
            }
          </code>
        </div>
      )}
    </div>
  );
}
