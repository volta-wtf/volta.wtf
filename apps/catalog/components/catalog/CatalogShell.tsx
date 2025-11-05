"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { AppSidebar } from "@/components/catalog/AppSidebar";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import GalleryView from "@/components/catalog/GalleryView";
import PreviewHost from "@/components/catalog/PreviewRegistry";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CatalogShellProps {
  categories: Category[];
  children: React.ReactNode;
}

export function CatalogShell({ categories, children }: CatalogShellProps) {
  const pathname = usePathname();

  // Extraer categoría activa y item de la URL
  const { activeCategory, activeCategoryData, activeItemSlug, activeItem } = React.useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 1) {
      const catSlug = parts[0];
      const cat = categories.find((c) => c.name === catSlug);

      if (cat && parts.length >= 2) {
        const itemSlug = parts[1];
        const item = cat.items.find((i) => i.slug === itemSlug);
        return {
          activeCategory: catSlug,
          activeCategoryData: cat,
          activeItemSlug: itemSlug,
          activeItem: item,
        };
      }

      return {
        activeCategory: catSlug,
        activeCategoryData: cat,
        activeItemSlug: null,
        activeItem: undefined,
      };
    }
    return {
      activeCategory: undefined,
      activeCategoryData: undefined,
      activeItemSlug: null,
      activeItem: undefined,
    };
  }, [pathname, categories]);

  // Si no hay datos del catálogo, mostrar error
  if (!activeCategoryData && activeCategory) {
    return (
      <SidebarProvider>
        <AppSidebar categories={categories} activeCategory={activeCategory} />
        <SidebarInset>
          <div className="flex items-center justify-center min-h-screen p-6">
            <Card>
              <CardHeader>
                <CardTitle>Categoría no encontrada</CardTitle>
                <CardDescription>
                  La categoría &quot;{activeCategory}&quot; no existe
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Si tenemos una categoría válida, renderizar el catálogo
  if (activeCategoryData) {
    return (
      <SidebarProvider>
        <AppSidebar categories={categories} activeCategory={activeCategory} />
        <SidebarInset>
          <div className="flex h-screen">
            {/* Columna de la galería */}
            <div
              key={activeCategoryData.name}
              className="flex flex-col"
              style={activeItem ? { flex: '2 1 0%', minWidth: 'calc(33.333% + 16px)' } : { flex: '1 1 0%' }}
            >
              <CatalogHeader
                categoryLabel={activeCategoryData.label}
                categoryName={activeCategoryData.name}
                itemTitle={undefined}
              />
              <div className="flex-1 overflow-y-auto">
                <GalleryView
                  category={activeCategoryData}
                  activeItemSlug={activeItemSlug}
                  isPreviewOpen={!!activeItem}
                />
              </div>
            </div>

            {/* Columna del preview */}
            {activeItem && (
              <aside
                className="flex flex-col bg-background/30"
                style={{ flex: '4 1 0%', minWidth: 'calc(66.666% - 16px)' }}
              >
                <header className="flex h-14 shrink-0 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
                  <h2 className="text-sm font-medium text-foreground truncate">
                    {activeItem.title}
                  </h2>
                </header>
                <div className="flex-1 overflow-y-auto p-4">
                  <PreviewHost cat={activeCategoryData} item={activeItem} />
                </div>
              </aside>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Fallback para otras rutas
  return (
    <SidebarProvider>
      <AppSidebar categories={categories} activeCategory={activeCategory} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
