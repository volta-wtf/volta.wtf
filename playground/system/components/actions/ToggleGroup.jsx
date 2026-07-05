import React from "react";
import { cn } from "../lib/cn.js";

const ToggleGroupCtx = React.createContext(null);

/** ToggleGroup — a set of toggles. type: single | multiple. */
export function ToggleGroup({ type = "single", value, defaultValue, onValueChange, variant = "default", size = "default", className = "", children, ...props }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (type === "multiple" ? [] : ""));
  const current = isControlled ? value : internal;
  const set = (v) => {
    let next;
    if (type === "multiple") {
      const arr = Array.isArray(current) ? current : [];
      next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
    } else {
      next = current === v ? "" : v;
    }
    if (!isControlled) setInternal(next);
    onValueChange && onValueChange(next);
  };
  const isOn = (v) => (type === "multiple" ? (current || []).includes(v) : current === v);
  return (
    <ToggleGroupCtx.Provider value={{ isOn, set, variant, size }}>
      <div role="group" className={cn("ds-toggle-group", variant === "outline" && "ds-toggle-group--outline", className)} {...props}>
        {children}
      </div>
    </ToggleGroupCtx.Provider>
  );
}
export function ToggleGroupItem({ value, className = "", disabled = false, ...props }) {
  const ctx = React.useContext(ToggleGroupCtx);
  const on = ctx.isOn(value);
  return (
    <button
      type="button"
      aria-pressed={on}
      data-state={on ? "on" : "off"}
      disabled={disabled}
      onClick={() => ctx.set(value)}
      className={cn("ds-toggle", ctx.variant === "outline" && "ds-toggle--outline", ctx.size !== "default" && `ds-toggle--${ctx.size}`, className)}
      {...props}
    />
  );
}
