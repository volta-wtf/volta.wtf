import React from "react";
import { cn } from "../lib/cn.js";

const ADCtx = React.createContext(null);

/** AlertDialog — modal confirmation that interrupts and requires a response. */
export function AlertDialog({ open, defaultOpen = false, onOpenChange, children }) {
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internal;
  const setOpen = (v) => { if (!isControlled) setInternal(v); onOpenChange && onOpenChange(v); };
  return <ADCtx.Provider value={{ isOpen, setOpen }}>{children}</ADCtx.Provider>;
}
export function AlertDialogTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(ADCtx);
  const onClick = () => ctx.setOpen(true);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, ...props });
  return <button type="button" onClick={onClick} {...props}>{children}</button>;
}
export function AlertDialogContent({ className = "", size = "default", children, ...props }) {
  const ctx = React.useContext(ADCtx);
  if (!ctx.isOpen) return null;
  return (
    <div>
      <div className="ds-overlay" />
      <div role="alertdialog" aria-modal="true" className={cn("ds-dialog ds-alertdialog", size === "sm" && "ds-alertdialog--sm", className)} {...props}>{children}</div>
    </div>
  );
}
export function AlertDialogMedia({ className = "", ...props }) {
  return <div className={cn("ds-alertdialog-media", className)} {...props} />;
}
export function AlertDialogHeader({ className = "", ...props }) { return <div className={cn("ds-dialog-header", className)} {...props} />; }
export function AlertDialogFooter({ className = "", ...props }) { return <div className={cn("ds-dialog-footer", className)} {...props} />; }
export function AlertDialogTitle({ className = "", ...props }) { return <h2 className={cn("ds-dialog-title", className)} {...props} />; }
export function AlertDialogDescription({ className = "", ...props }) { return <p className={cn("ds-dialog-description", className)} {...props} />; }
export function AlertDialogAction({ asChild = false, variant = "primary", className = "", children, onClick: onClickProp, ...props }) {
  const ctx = React.useContext(ADCtx);
  const onClick = (e) => { onClickProp && onClickProp(e); ctx.setOpen(false); };
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick });
  return <button type="button" className={cn("ds-btn ds-btn--default", `ds-btn--${variant}`, className)} {...props} onClick={onClick}>{children}</button>;
}
export function AlertDialogCancel({ asChild = false, className = "", children, ...props }) {
  const ctx = React.useContext(ADCtx);
  const onClick = (e) => { props.onClick && props.onClick(e); ctx.setOpen(false); };
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick });
  return <button type="button" className={cn("ds-btn ds-btn--default ds-btn--outline", className)} {...props} onClick={onClick}>{children}</button>;
}
