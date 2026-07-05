import React from "react";
import { cn } from "../lib/cn.js";

const MenubarCtx = React.createContext(null);

/** Menubar — desktop-app-style horizontal menu bar. */
export function Menubar({ className = "", children, ...props }) {
  const [openId, setOpenId] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (openId == null) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpenId(null); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [openId]);
  return (
    <MenubarCtx.Provider value={{ openId, setOpenId }}>
      <div ref={ref} role="menubar" className={cn("ds-menubar", className)} {...props}>{children}</div>
    </MenubarCtx.Provider>
  );
}
export function MenubarMenu({ children }) {
  const id = React.useId();
  return <MenubarMenuInner id={id}>{children}</MenubarMenuInner>;
}
function MenubarMenuInner({ id, children }) {
  return <span data-menu-id={id} style={{ position: "relative" }}>{React.Children.map(children, (c) => React.isValidElement(c) ? React.cloneElement(c, { __menuId: id }) : c)}</span>;
}
export function MenubarTrigger({ __menuId, className = "", children, ...props }) {
  const ctx = React.useContext(MenubarCtx);
  const open = ctx.openId === __menuId;
  return (
    <button type="button" role="menuitem" data-state={open ? "open" : "closed"}
      onClick={() => ctx.setOpenId(open ? null : __menuId)}
      onMouseEnter={() => ctx.openId != null && ctx.setOpenId(__menuId)}
      className={cn("ds-menubar-trigger", className)} {...props}>{children}</button>
  );
}
export function MenubarContent({ __menuId, className = "", children, ...props }) {
  const ctx = React.useContext(MenubarCtx);
  if (ctx.openId !== __menuId) return null;
  return <div role="menu" className={cn("ds-menu", className)} style={{ position: "absolute", top: "calc(100% + 6px)", left: 0 }} {...props}>{children}</div>;
}
export function MenubarItem({ className = "", inset = false, onClick, children, ...props }) {
  const ctx = React.useContext(MenubarCtx);
  return <div role="menuitem" tabIndex={-1} onClick={(e) => { onClick && onClick(e); ctx.setOpenId(null); }}
    className={cn("ds-menu-item", className)} style={inset ? { paddingLeft: "var(--spacing-8)" } : undefined} {...props}>{children}</div>;
}
export function MenubarSeparator({ className = "", ...props }) { return <div className={cn("ds-menu-separator", className)} {...props} />; }
export function MenubarShortcut({ className = "", ...props }) { return <span className={cn("ds-menu-shortcut", className)} {...props} />; }
export function MenubarLabel({ className = "", ...props }) { return <div className={cn("ds-menu-label", className)} {...props} />; }
