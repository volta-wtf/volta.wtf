import * as React from "react";
/**
 * Sidebar — collapsible application sidebar layout, faithful to shadcn/ui.
 */
export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  asChild?: boolean;
}
export function SidebarProvider(props: SidebarProviderProps): JSX.Element;
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset" | "inverse";
  collapsible?: "offcanvas" | "icon" | "none";
}
export function Sidebar(props: SidebarProps): JSX.Element;
export function useSidebar(): { isOpen: boolean; setOpen: (open: boolean) => void; toggle: () => void };
export function SidebarTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
export function SidebarHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SidebarContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SidebarFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SidebarGroup(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SidebarGroupLabel(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SidebarMenu(props: React.HTMLAttributes<HTMLUListElement>): JSX.Element;
export function SidebarMenuItem(props: React.HTMLAttributes<HTMLLIElement>): JSX.Element;
export function SidebarMenuButton(props: SidebarMenuButtonProps): JSX.Element;
export function SidebarInset(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SidebarGroupContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SidebarGroupAction(props: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
export function SidebarMenuAction(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { showOnHover?: boolean }): JSX.Element;
export function SidebarMenuBadge(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
export function SidebarMenuSub(props: React.HTMLAttributes<HTMLUListElement>): JSX.Element;
export function SidebarMenuSubItem(props: React.HTMLAttributes<HTMLLIElement>): JSX.Element;
export function SidebarMenuSubButton(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean; asChild?: boolean }): JSX.Element;
export function SidebarRail(props: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
export function SidebarMenuSkeleton(props: React.HTMLAttributes<HTMLDivElement> & { showIcon?: boolean }): JSX.Element;
