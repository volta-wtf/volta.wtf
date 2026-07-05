import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const SheetCtx = React.createContext(null);

/** Sheet — a Dialog that slides in from an edge. side: right | left | top | bottom. */
export function Sheet({ open, defaultOpen = false, onOpenChange, children }) {
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
  return <SheetCtx.Provider value={{ isOpen, setOpen }}>{children}</SheetCtx.Provider>;
}
export function SheetTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(SheetCtx);
  const onClick = () => ctx.setOpen(true);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, ...props });
  return <button type="button" onClick={onClick} {...props}>{children}</button>;
}
export function SheetContent({ side = "right", className = "", showClose = true, children, ...props }) {
  const ctx = React.useContext(SheetCtx);
  if (!ctx.isOpen) return null;
  return (
    <div>
      <div className="ds-overlay" onClick={() => ctx.setOpen(false)} />
      <div role="dialog" aria-modal="true" className={cn("ds-sheet", `ds-sheet--${side}`, className)} {...props}>
        {children}
        {showClose && <button type="button" className="ds-dialog-close" aria-label="Close" onClick={() => ctx.setOpen(false)}><Icon name="close" size={16} /></button>}
      </div>
    </div>
  );
}
export function SheetHeader({ className = "", ...props }) { return <div className={cn("ds-dialog-header", className)} {...props} />; }
export function SheetFooter({ className = "", ...props }) { return <div className={cn("ds-dialog-footer", className)} style={{ marginTop: "auto" }} {...props} />; }
export function SheetTitle({ className = "", ...props }) { return <h2 className={cn("ds-dialog-title", className)} {...props} />; }
export function SheetDescription({ className = "", ...props }) { return <p className={cn("ds-dialog-description", className)} {...props} />; }
export function SheetClose({ asChild = false, children, ...props }) {
  const ctx = React.useContext(SheetCtx);
  const onClick = () => ctx.setOpen(false);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, ...props });
  return <button type="button" onClick={onClick} {...props}>{children}</button>;
}
