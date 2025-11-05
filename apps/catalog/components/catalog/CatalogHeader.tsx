"use client";

import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface CatalogHeaderProps {
  categoryLabel?: string;
  categoryName?: string;
  itemTitle?: string;
}

export function CatalogHeader({ categoryLabel, categoryName, itemTitle }: CatalogHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Catálogo
          </Link>
          {categoryLabel && (
            <>
              <span>/</span>
              {itemTitle ? (
                <Link href={`/${categoryName}`} className="hover:text-foreground transition-colors">
                  {categoryLabel}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{categoryLabel}</span>
              )}
            </>
          )}
          {itemTitle && (
            <>
              <span>/</span>
              <span className="text-foreground font-medium">{itemTitle}</span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
