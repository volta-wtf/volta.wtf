import React from "react";
import { cn } from "../lib/cn.js";

const CtxMenuCtx = React.createContext(null);

/** ContextMenu — right-click menu. Reuses the shared .ds-menu styles. */
export function ContextMenu({ children }) {
  const [state, setState] = React.useState({ open: false, x: 0, y: 0 });
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!state.open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setState((s) => ({ ...s, open: false })); };
    const onKey = (e) => e.key === "Escape" && setState((s) => ({ ...s, open: false }));
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [state.open]);
  return <CtxMenuCtx.Provider value={{ state, setState, ref }}>{children}</CtxMenuCtx.Provider>;
}
export function ContextMenuTrigger({ className = "", children, ...props }) {
  const ctx = React.useContext(CtxMenuCtx);
  const onContextMenu = (e) => { e.preventDefault(); ctx.setState({ open: true, x: e.clientX, y: e.clientY }); };
  return <div onContextMenu={onContextMenu} className={className} {...props}>{children}</div>;
}
export function ContextMenuContent({ className = "", children, ...props }) {
  const ctx = React.useContext(CtxMenuCtx);
  if (!ctx.state.open) return null;
  return (
    <div ref={ctx.ref} role="menu" className={cn("ds-menu", className)}
      style={{ position: "fixed", top: ctx.state.y, left: ctx.state.x }} {...props}>
      {children}
    </div>
  );
}
export function ContextMenuItem({ className = "", variant = "default", inset = false, onClick, children, ...props }) {
  const ctx = React.useContext(CtxMenuCtx);
  return (
    <div role="menuitem" tabIndex={-1} onClick={(e) => { onClick && onClick(e); ctx.setState((s) => ({ ...s, open: false })); }}
      className={cn("ds-menu-item", variant === "destructive" && "ds-menu-item--destructive", className)}
      style={inset ? { paddingLeft: "var(--spacing-8)" } : undefined} {...props}>{children}</div>
  );
}
export function ContextMenuLabel({ className = "", ...props }) { return <div className={cn("ds-menu-label", className)} {...props} />; }
export function ContextMenuSeparator({ className = "", ...props }) { return <div className={cn("ds-menu-separator", className)} {...props} />; }
export function ContextMenuShortcut({ className = "", ...props }) { return <span className={cn("ds-menu-shortcut", className)} {...props} />; }
