import * as React from "react";
/**
 * Aside — application layout shell (variant-aware sidebar + inset content).
 */
export interface AsideProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar treatment. */
  variant?: "sidebar" | "floating" | "inset" | "inverse";
  /** How the sidebar collapses. */
  collapsible?: "offcanvas" | "icon" | "none";
  /** Which edge the sidebar sits on. */
  side?: "left" | "right";
  /** Initial open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Sidebar rail content — compose with SidebarContent/SidebarGroup/SidebarMenu. */
  sidebar?: React.ReactNode;
}
export function Aside(props: AsideProps): JSX.Element;
