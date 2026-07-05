import React from "react";
import { cn } from "../lib/cn.js";

const TabsCtx = React.createContext(null);

/** Tabs — layered content panels. Controlled via value or uncontrolled via defaultValue. */
export function Tabs({ value, defaultValue, onValueChange, orientation = "horizontal", className = "", children, ...props }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const select = (v) => { if (!isControlled) setInternal(v); onValueChange && onValueChange(v); };
  return (
    <TabsCtx.Provider value={{ current, select }}>
      <div data-orientation={orientation} className={cn("ds-tabs", orientation === "vertical" && "ds-tabs--vertical", className)} {...props}>{children}</div>
    </TabsCtx.Provider>
  );
}
export function TabsList({ variant = "default", className = "", ...props }) {
  return <div role="tablist" className={cn("ds-tabs-list", variant === "line" && "ds-tabs-list--line", variant === "geist" && "ds-tabs-list--geist", className)} {...props} />;
}
export function TabsTrigger({ value, className = "", disabled = false, ...props }) {
  const ctx = React.useContext(TabsCtx);
  const active = ctx.current === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-state={active ? "active" : "inactive"}
      disabled={disabled}
      onClick={() => ctx.select(value)}
      className={cn("ds-tabs-trigger", className)}
      {...props}
    />
  );
}
export function TabsContent({ value, className = "", ...props }) {
  const ctx = React.useContext(TabsCtx);
  if (ctx.current !== value) return null;
  return <div role="tabpanel" className={cn("ds-tabs-content", className)} {...props} />;
}
