"use client";

import * as React from "react";
import Link from "next/link";
import type { Category } from "@/lib/catalog.runtime";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  categories: Category[];
  activeCategory?: string;
}

export function AppSidebar({ categories, activeCategory, ...props }: AppSidebarProps) {
  const [filter, setFilter] = React.useState<Category["type"] | "all">("all");

  const TYPES: Array<{ key: Category["type"] | "all"; label: string }> = [
    { key: "all", label: "Todos" },
    { key: "markdown", label: "Docs" },
    { key: "component", label: "Components" },
    { key: "css-classes", label: "Styles" },
    { key: "variables", label: "Variables" },
    { key: "presets", label: "Presets" },
  ];

  const filteredCategories = React.useMemo(
    () => (filter === "all" ? categories : categories.filter((c) => c.type === filter)),
    [categories, filter]
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-sm font-bold">V</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Catálogo VOLTA</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Estilos y componentes
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Filtros */}
        <SidebarGroup>
          <SidebarGroupLabel>Filtros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TYPES.map((type) => (
                <SidebarMenuItem key={type.key}>
                  <SidebarMenuButton
                    isActive={filter === type.key}
                    onClick={() => setFilter(type.key)}
                  >
                    <span>{type.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categorías */}
        <SidebarGroup>
          <SidebarGroupLabel>
            Categorías ({filteredCategories.length})
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredCategories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeCategory === category.name}
                    tooltip={category.label}
                  >
                    <Link href={`/${category.name}`}>
                      <span>{category.label}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {category.items.length}
                      </Badge>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="text-xs text-muted-foreground">
                {categories.length} categorías · {categories.reduce((acc, c) => acc + c.items.length, 0)} items
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
