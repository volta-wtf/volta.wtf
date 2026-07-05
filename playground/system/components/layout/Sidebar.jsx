import React from "react";
import { cn } from "../lib/cn.js";

const SidebarCtx = React.createContext(null);

/** SidebarProvider — holds open/collapsed state for the sidebar layout. */
export function SidebarProvider({ defaultOpen = true, open, onOpenChange, className = "", children, ...props }) {
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internal;
  const setOpen = (v) => { if (!isControlled) setInternal(v); onOpenChange && onOpenChange(v); };
  const toggle = () => setOpen(!isOpen);
  return (
    <SidebarCtx.Provider value={{ isOpen, setOpen, toggle }}>
      <div className={cn("ds-sidebar-wrap", className)} {...props}>{children}</div>
    </SidebarCtx.Provider>
  );
}
export function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className = "", children, ...props }) {
  const ctx = React.useContext(SidebarCtx);
  const inverse = variant === "inverse";
  const layout = inverse ? "inset" : variant; // inverse reuses inset geometry
  return <aside data-state={ctx.isOpen ? "expanded" : "collapsed"} data-side={side} data-variant={layout} data-inverse={inverse ? "" : undefined} className={cn("ds-sidebar", className)} {...props}>{children}</aside>;
}
export function useSidebar() { return React.useContext(SidebarCtx); }
export function SidebarTrigger({ className = "", children, ...props }) {
  const ctx = React.useContext(SidebarCtx);
  return (
    <button type="button" aria-label="Toggle sidebar" onClick={ctx.toggle} className={cn("ds-btn ds-btn--ghost ds-btn--icon", className)} {...props}>
      {children || <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>}
    </button>
  );
}
export function SidebarHeader({ className = "", ...props }) { return <div className={cn("ds-sidebar-header", className)} {...props} />; }
export function SidebarContent({ className = "", ...props }) { return <div className={cn("ds-sidebar-content", className)} {...props} />; }
export function SidebarFooter({ className = "", ...props }) { return <div className={cn("ds-sidebar-footer", className)} {...props} />; }
export function SidebarGroup({ className = "", ...props }) { return <div className={cn("ds-sidebar-group", className)} {...props} />; }
export function SidebarGroupLabel({ className = "", ...props }) { return <div className={cn("ds-sidebar-group-label", className)} {...props} />; }
export function SidebarMenu({ className = "", ...props }) { return <ul className={cn("ds-sidebar-menu", className)} {...props} />; }
export function SidebarMenuItem({ className = "", ...props }) { return <li className={cn("ds-sidebar-menu-item", className)} {...props} />; }
export function SidebarMenuButton({ className = "", isActive = false, asChild = false, children, ...props }) {
  const cls = cn("ds-sidebar-menu-button", className);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { className: cn(cls, children.props.className), "data-active": isActive || undefined, ...props });
  return <button type="button" data-active={isActive || undefined} className={cls} {...props}>{children}</button>;
}
export function SidebarInset({ className = "", ...props }) { return <div className={cn("ds-sidebar-inset", className)} {...props} />; }
export function SidebarGroupContent({ className = "", ...props }) { return <div className={cn("ds-sidebar-group-content", className)} {...props} />; }
export function SidebarGroupAction({ className = "", ...props }) { return <button type="button" className={cn("ds-sidebar-group-action", className)} {...props} />; }
export function SidebarMenuAction({ className = "", showOnHover = false, ...props }) { return <button type="button" data-hover={showOnHover || undefined} className={cn("ds-sidebar-menu-action", className)} {...props} />; }
export function SidebarMenuBadge({ className = "", ...props }) { return <span className={cn("ds-sidebar-menu-badge", className)} {...props} />; }
export function SidebarMenuSub({ className = "", ...props }) { return <ul className={cn("ds-sidebar-menu-sub", className)} {...props} />; }
export function SidebarMenuSubItem({ className = "", ...props }) { return <li className={className} {...props} />; }
export function SidebarMenuSubButton({ className = "", isActive = false, asChild = false, children, ...props }) {
  const cls = cn("ds-sidebar-menu-sub-button", className);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { className: cn(cls, children.props.className), "data-active": isActive || undefined, ...props });
  return <a data-active={isActive || undefined} className={cls} {...props}>{children}</a>;
}
export function SidebarRail({ className = "", ...props }) {
  const ctx = React.useContext(SidebarCtx);
  return <button type="button" aria-label="Toggle sidebar" tabIndex={-1} onClick={ctx.toggle} className={cn("ds-sidebar-rail", className)} {...props} />;
}
export function SidebarMenuSkeleton({ showIcon = false, className = "", ...props }) {
  const w = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return (
    <div className={cn("ds-sidebar-menu-skeleton", className)} {...props}>
      {showIcon && <div className="ds-skeleton" style={{ width: 16, height: 16, borderRadius: 4 }} />}
      <div className="ds-skeleton" style={{ height: 16, flex: 1, maxWidth: w }} />
    </div>
  );
}
