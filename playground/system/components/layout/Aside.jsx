import React from "react";
import { cn } from "../lib/cn.js";
import { SidebarProvider, Sidebar, SidebarInset } from "./Sidebar.jsx";

/**
 * Aside — application layout shell.
 * Wraps the Sidebar primitives into a single variant-aware layout:
 * a `SidebarProvider` holding open state, a `Sidebar` whose `variant`
 * (sidebar | floating | inset | inverse) is forwarded, and a `SidebarInset`
 * for the main content. Fill the rail via the `sidebar` prop (compose it
 * with SidebarContent/SidebarGroup/SidebarMenu) and pass the page as
 * children.
 */
export function Aside({
  variant = "sidebar",
  collapsible = "none",
  side = "right",
  defaultOpen = true,
  open,
  onOpenChange,
  sidebar = null,
  className = "",
  children,
  ...props
}) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cn("ds-aside", className)}
      {...props}
    >
      <Sidebar variant={variant} collapsible={collapsible} side={side}>
        {sidebar}
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
