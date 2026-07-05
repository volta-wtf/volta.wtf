import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Checkbox — Radix-style checkbox (button role="checkbox").
 * Controlled via `checked` + `onCheckedChange`, or uncontrolled via
 * `defaultChecked`. Supports the "indeterminate" state.
 */
export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className = "",
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const value = isControlled ? checked : internal;
  const state = value === "indeterminate" ? "indeterminate" : value ? "checked" : "unchecked";

  const toggle = () => {
    if (disabled) return;
    const next = value === true ? false : true;
    if (!isControlled) setInternal(next);
    onCheckedChange && onCheckedChange(next);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={value === "indeterminate" ? "mixed" : value}
      data-state={state}
      disabled={disabled}
      onClick={toggle}
      className={cn("ds-checkbox", className)}
      {...props}
    />
  );
}
