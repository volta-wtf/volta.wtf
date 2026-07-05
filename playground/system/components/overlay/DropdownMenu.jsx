import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const MenuCtx = React.createContext(null);

/** DropdownMenu — action menu anchored to a trigger. */
export function DropdownMenu({ open, defaultOpen = false, onOpenChange, children }) {
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internal;
  const setOpen = (v) => { if (!isControlled) setInternal(v); onOpenChange && onOpenChange(v); };
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!isOpen) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [isOpen]);
  return (
    <MenuCtx.Provider value={{ isOpen, setOpen }}>
      <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>{children}</span>
    </MenuCtx.Provider>
  );
}
export function DropdownMenuTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(MenuCtx);
  const onClick = () => ctx.setOpen(!ctx.isOpen);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, "aria-haspopup": "menu", "aria-expanded": ctx.isOpen, ...props });
  return <button type="button" aria-haspopup="menu" aria-expanded={ctx.isOpen} onClick={onClick} {...props}>{children}</button>;
}
export function DropdownMenuContent({ align = "start", className = "", style, children, ...props }) {
  const ctx = React.useContext(MenuCtx);
  if (!ctx.isOpen) return null;
  const alignStyle = align === "end" ? { right: 0 } : align === "center" ? { left: "50%", transform: "translateX(-50%)" } : { left: 0 };
  return (
    <div role="menu" className={cn("ds-menu", className)} style={{ position: "absolute", top: "calc(100% + 4px)", ...alignStyle, ...style }} {...props}>
      {children}
    </div>
  );
}
export function DropdownMenuItem({ className = "", variant = "default", inset = false, onClick, children, ...props }) {
  const ctx = React.useContext(MenuCtx);
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      onClick={(e) => { onClick && onClick(e); ctx.setOpen(false); }}
      className={cn("ds-menu-item", variant === "destructive" && "ds-menu-item--destructive", className)}
      style={inset ? { paddingLeft: "var(--spacing-8)" } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
export function DropdownMenuCheckboxItem({ checked = false, onCheckedChange, className = "", children, ...props }) {
  return (
    <div role="menuitemcheckbox" aria-checked={checked} tabIndex={-1} onClick={() => onCheckedChange && onCheckedChange(!checked)} className={cn("ds-menu-item", className)} style={{ paddingLeft: "var(--spacing-8)", position: "relative" }} {...props}>
      {checked && <span style={{ position: "absolute", left: "var(--spacing-2)", display: "inline-flex" }}><Icon name="check" size={16} /></span>}
      {children}
    </div>
  );
}
export function DropdownMenuLabel({ className = "", inset = false, ...props }) {
  return <div className={cn("ds-menu-label", className)} style={inset ? { paddingLeft: "var(--spacing-8)" } : undefined} {...props} />;
}
export function DropdownMenuSeparator({ className = "", ...props }) { return <div className={cn("ds-menu-separator", className)} {...props} />; }
export function DropdownMenuShortcut({ className = "", ...props }) { return <span className={cn("ds-menu-shortcut", className)} {...props} />; }
export function DropdownMenuGroup({ children, ...props }) { return <div role="group" {...props}>{children}</div>; }

const RadioCtx = React.createContext(null);
export function DropdownMenuRadioGroup({ value, onValueChange, children, ...props }) {
  return <RadioCtx.Provider value={{ value, onValueChange }}><div role="group" {...props}>{children}</div></RadioCtx.Provider>;
}
export function DropdownMenuRadioItem({ value, className = "", children, ...props }) {
  const menu = React.useContext(MenuCtx);
  const radio = React.useContext(RadioCtx);
  const checked = radio && radio.value === value;
  return (
    <div role="menuitemradio" aria-checked={checked} tabIndex={-1}
      onClick={() => { radio && radio.onValueChange && radio.onValueChange(value); menu.setOpen(false); }}
      className={cn("ds-menu-item", className)} style={{ paddingLeft: "var(--spacing-8)", position: "relative" }} {...props}>
      {checked && <span style={{ position: "absolute", left: "var(--spacing-2-5)", display: "inline-flex" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} /></span>}
      {children}
    </div>
  );
}

const SubCtx = React.createContext(null);
export function DropdownMenuSub({ children }) {
  const [open, setOpen] = React.useState(false);
  const t = React.useRef();
  const enter = () => { clearTimeout(t.current); setOpen(true); };
  const leave = () => { clearTimeout(t.current); t.current = setTimeout(() => setOpen(false), 140); };
  return <SubCtx.Provider value={{ open, setOpen }}><div style={{ position: "relative" }} onMouseEnter={enter} onMouseLeave={leave}>{children}</div></SubCtx.Provider>;
}
export function DropdownMenuSubTrigger({ className = "", inset = false, children, ...props }) {
  const sub = React.useContext(SubCtx);
  return (
    <div role="menuitem" aria-haspopup="menu" aria-expanded={sub.open} data-state={sub.open ? "open" : "closed"} tabIndex={-1}
      className={cn("ds-menu-item", className)} style={inset ? { paddingLeft: "var(--spacing-8)" } : undefined} {...props}>
      {children}
      <span style={{ marginLeft: "auto", display: "inline-flex" }}><Icon name="chevron-right" size={16} /></span>
    </div>
  );
}
export function DropdownMenuSubContent({ className = "", children, ...props }) {
  const sub = React.useContext(SubCtx);
  if (!sub.open) return null;
  return <div role="menu" className={cn("ds-menu", className)} style={{ position: "absolute", top: -4, left: "100%", marginLeft: 2 }} {...props}><span aria-hidden="true" className="ds-overlay-bridge" style={{ position: "absolute", top: 0, bottom: 0, left: -14, width: 14 }} />{children}</div>;
}
