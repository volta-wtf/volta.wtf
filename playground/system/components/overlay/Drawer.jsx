import React from "react";
import { cn } from "../lib/cn.js";

const DrawerCtx = React.createContext(null);

/** Drawer — bottom sheet (vaul-style) with a drag handle. */
export function Drawer({ open, defaultOpen = false, onOpenChange, children }) {
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internal;
  const setOpen = (v) => { if (!isControlled) setInternal(v); onOpenChange && onOpenChange(v); };
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);
  return <DrawerCtx.Provider value={{ isOpen, setOpen }}>{children}</DrawerCtx.Provider>;
}
export function DrawerTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(DrawerCtx);
  const onClick = () => ctx.setOpen(true);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, ...props });
  return <button type="button" onClick={onClick} {...props}>{children}</button>;
}
export function DrawerContent({ className = "", children, ...props }) {
  const ctx = React.useContext(DrawerCtx);
  if (!ctx.isOpen) return null;
  return (
    <div>
      <div className="ds-overlay" onClick={() => ctx.setOpen(false)} />
      <div role="dialog" aria-modal="true" className={cn("ds-drawer", className)} {...props}>
        <div className="ds-drawer-handle" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
export function DrawerHeader({ className = "", ...props }) { return <div className={cn("ds-drawer-header", className)} {...props} />; }
export function DrawerFooter({ className = "", ...props }) { return <div className={cn("ds-drawer-footer", className)} {...props} />; }
export function DrawerTitle({ className = "", ...props }) { return <h2 className={cn("ds-drawer-title", className)} {...props} />; }
export function DrawerDescription({ className = "", ...props }) { return <p className={cn("ds-drawer-description", className)} {...props} />; }
export function DrawerClose({ asChild = false, children, ...props }) {
  const ctx = React.useContext(DrawerCtx);
  const onClick = () => ctx.setOpen(false);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, ...props });
  return <button type="button" onClick={onClick} {...props}>{children}</button>;
}
