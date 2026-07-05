import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const SelectCtx = React.createContext(null);

/** Recursively collect value→label text from SelectItem descendants. */
function collectItemLabels(children, map) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const isItem = child.props && child.props.value !== undefined && typeof child.props.children === "string";
    if (isItem) map[child.props.value] = child.props.children;
    if (child.props && child.props.children) collectItemLabels(child.props.children, map);
  });
  return map;
}

/**
 * Select — Radix-style select. Compose:
 *   <Select value onValueChange>
 *     <SelectTrigger><SelectValue placeholder="…" /></SelectTrigger>
 *     <SelectContent>
 *       <SelectGroup>
 *         <SelectLabel>Group</SelectLabel>
 *         <SelectItem value="a">A</SelectItem>
 *       </SelectGroup>
 *     </SelectContent>
 *   </Select>
 */
export function Select({ value, defaultValue, onValueChange, children }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [labels, setLabels] = React.useState({});
  const current = isControlled ? value : internal;
  const ref = React.useRef(null);
  const staticLabels = React.useMemo(() => collectItemLabels(children, {}), [children]);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const select = (v) => {
    if (!isControlled) setInternal(v);
    onValueChange && onValueChange(v);
    setOpen(false);
  };
  const registerLabel = (v, l) => setLabels((m) => (m[v] === l ? m : { ...m, [v]: l }));

  return (
    <SelectCtx.Provider value={{ current, open, setOpen, select, labels: { ...staticLabels, ...labels }, registerLabel }}>
      <div ref={ref} style={{ position: "relative", width: "fit-content" }}>{children}</div>
    </SelectCtx.Provider>
  );
}

export function SelectTrigger({ className = "", children, ...props }) {
  const ctx = React.useContext(SelectCtx);
  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={ctx.open}
      data-state={ctx.open ? "open" : "closed"}
      data-placeholder={ctx.current == null ? "" : undefined}
      onClick={() => ctx.setOpen((o) => !o)}
      className={cn("ds-select", className)}
      {...props}
    >
      {children}
      <Icon name="chevron-down" size={16} />
    </button>
  );
}

export function SelectValue({ placeholder }) {
  const ctx = React.useContext(SelectCtx);
  const label = ctx.current != null ? ctx.labels[ctx.current] ?? ctx.current : null;
  return <span>{label ?? placeholder}</span>;
}

export function SelectContent({ className = "", children, ...props }) {
  const ctx = React.useContext(SelectCtx);
  if (!ctx.open) return null;
  return (
    <div
      role="listbox"
      className={cn("ds-select-content", className)}
      style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 50 }}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, disabled = false, className = "", children, ...props }) {
  const ctx = React.useContext(SelectCtx);
  React.useEffect(() => {
    if (typeof children === "string") ctx.registerLabel(value, children);
  }, [value, children]);
  const selected = ctx.current === value;
  return (
    <div
      role="option"
      aria-selected={selected}
      data-state={selected ? "checked" : "unchecked"}
      aria-disabled={disabled || undefined}
      onClick={() => !disabled && ctx.select(value)}
      className={cn("ds-select-item", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectGroup({ children, ...props }) {
  return <div role="group" {...props}>{children}</div>;
}
export function SelectLabel({ className = "", ...props }) {
  return <div className={cn("ds-select-label", className)} {...props} />;
}
export function SelectSeparator({ className = "", ...props }) {
  return <div className={cn("ds-menu-separator", className)} {...props} />;
}
