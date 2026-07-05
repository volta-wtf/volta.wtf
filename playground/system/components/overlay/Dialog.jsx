import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const DialogCtx = React.createContext(null);

/** Dialog — modal window. Controlled via open/onOpenChange or uncontrolled. */
export function Dialog({ open, defaultOpen = false, onOpenChange, children }) {
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
  return <DialogCtx.Provider value={{ isOpen, setOpen }}>{children}</DialogCtx.Provider>;
}
export function DialogTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(DialogCtx);
  const onClick = () => ctx.setOpen(true);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, ...props });
  return <button type="button" onClick={onClick} {...props}>{children}</button>;
}
export function DialogContent({ className = "", children, showClose = true, ...props }) {
  const ctx = React.useContext(DialogCtx);
  if (!ctx.isOpen) return null;
  return (
    <div>
      <div className="ds-overlay" onClick={() => ctx.setOpen(false)} />
      <div role="dialog" aria-modal="true" className={cn("ds-dialog", className)} {...props}>
        {children}
        {showClose && (
          <button type="button" className="ds-dialog-close" aria-label="Close" onClick={() => ctx.setOpen(false)}>
            <Icon name="close" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
export function DialogHeader({ className = "", ...props }) { return <div className={cn("ds-dialog-header", className)} {...props} />; }
export function DialogFooter({ className = "", ...props }) { return <div className={cn("ds-dialog-footer", className)} {...props} />; }
export function DialogTitle({ className = "", ...props }) { return <h2 className={cn("ds-dialog-title", className)} {...props} />; }
export function DialogDescription({ className = "", ...props }) { return <p className={cn("ds-dialog-description", className)} {...props} />; }
export function DialogClose({ asChild = false, children, ...props }) {
  const ctx = React.useContext(DialogCtx);
  const onClick = () => ctx.setOpen(false);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, ...props });
  return <button type="button" onClick={onClick} {...props}>{children}</button>;
}
