import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const AccordionCtx = React.createContext(null);
const ItemCtx = React.createContext(null);

/** Accordion — vertically stacked, expandable sections. `multiple` allows several open at once (alias: type="multiple"). */
export function Accordion({ type, multiple = false, collapsible = true, defaultValue, className = "", children, ...props }) {
  const multi = multiple || type === "multiple";
  const [open, setOpen] = React.useState(() => {
    if (defaultValue == null) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });
  const toggle = (val) => {
    setOpen((prev) => {
      const isOpen = prev.includes(val);
      if (multi) return isOpen ? prev.filter((v) => v !== val) : [...prev, val];
      if (isOpen) return collapsible ? [] : prev;
      return [val];
    });
  };
  return (
    <AccordionCtx.Provider value={{ open, toggle }}>
      <div className={cn("ds-accordion", className)} {...props}>{children}</div>
    </AccordionCtx.Provider>
  );
}
export function AccordionItem({ value, disabled = false, className = "", children, ...props }) {
  return (
    <ItemCtx.Provider value={{ value, disabled }}>
      <div className={cn("ds-accordion-item", className)} data-disabled={disabled ? "" : undefined} {...props}>{children}</div>
    </ItemCtx.Provider>
  );
}
export function AccordionTrigger({ className = "", children, ...props }) {
  const ctx = React.useContext(AccordionCtx);
  const item = React.useContext(ItemCtx);
  const value = item.value;
  const isOpen = ctx.open.includes(value);
  return (
    <h3 style={{ margin: 0 }}>
      <button
        type="button"
        aria-expanded={isOpen}
        disabled={item.disabled}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => ctx.toggle(value)}
        className={cn("ds-accordion-trigger", className)}
        {...props}
      >
        {children}
        <Icon name="chevron-down" size={16} className="ds-accordion-chevron" />
      </button>
    </h3>
  );
}
export function AccordionContent({ className = "", children, ...props }) {
  const ctx = React.useContext(AccordionCtx);
  const item = React.useContext(ItemCtx);
  const isOpen = ctx.open.includes(item.value);
  return (
    <div
      role="region"
      data-state={isOpen ? "open" : "closed"}
      className={cn("ds-accordion-content", className)}
      style={{ display: isOpen ? "block" : "none" }}
      {...props}
    >
      <div className="ds-accordion-content-inner">{children}</div>
    </div>
  );
}
