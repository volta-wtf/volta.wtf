import React from "react";
import { cn } from "../lib/cn.js";

const RadioCtx = React.createContext(null);

/**
 * RadioGroup — single-select group of radio items.
 * Controlled via `value` + `onValueChange`, or uncontrolled via `defaultValue`.
 */
export function RadioGroup({ value, defaultValue, onValueChange, className = "", children, ...props }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const select = (v) => {
    if (!isControlled) setInternal(v);
    onValueChange && onValueChange(v);
  };
  return (
    <RadioCtx.Provider value={{ current, select }}>
      <div role="radiogroup" className={cn("ds-radio-group", className)} {...props}>
        {children}
      </div>
    </RadioCtx.Provider>
  );
}

/** RadioGroupItem — a single option; requires a `value`. */
export function RadioGroupItem({ value, disabled = false, className = "", ...props }) {
  const ctx = React.useContext(RadioCtx);
  const checked = ctx && ctx.current === value;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => ctx && ctx.select(value)}
      className={cn("ds-radio", className)}
      {...props}
    />
  );
}
