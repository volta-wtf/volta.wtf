import React from "react";

const CollapsibleCtx = React.createContext(null);

/** Collapsible — show/hide a single content region. */
export function Collapsible({ open, defaultOpen = false, onOpenChange, children, ...props }) {
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internal;
  const setOpen = (v) => { if (!isControlled) setInternal(v); onOpenChange && onOpenChange(v); };
  return (
    <CollapsibleCtx.Provider value={{ isOpen, setOpen }}>
      <div data-state={isOpen ? "open" : "closed"} {...props}>{children}</div>
    </CollapsibleCtx.Provider>
  );
}
export function CollapsibleTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(CollapsibleCtx);
  const onClick = () => ctx.setOpen(!ctx.isOpen);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick, "aria-expanded": ctx.isOpen, ...props });
  }
  return <button type="button" aria-expanded={ctx.isOpen} onClick={onClick} {...props}>{children}</button>;
}
export function CollapsibleContent({ children, ...props }) {
  const ctx = React.useContext(CollapsibleCtx);
  if (!ctx.isOpen) return null;
  return <div data-state="open" {...props}>{children}</div>;
}
