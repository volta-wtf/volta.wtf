import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Switch — on/off toggle (button role="switch").
 * Controlled via `checked` + `onCheckedChange`, or uncontrolled via `defaultChecked`.
 * `size`: "sm" · "md" (default) · "lg" (Geist scale). `icon`/`checkedIcon`
 * render a small glyph inside the thumb (e.g. sun/moon, check/×).
 */
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  icon,
  checkedIcon,
  className = "",
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const value = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange && onCheckedChange(next);
  };
  const glyph = value ? (checkedIcon ?? icon) : icon;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      data-state={value ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={toggle}
      className={cn("ds-switch", `ds-switch--${size}`, (icon || checkedIcon) && "ds-switch--with-icon", className)}
      {...props}
    >
      {glyph != null && <span className="ds-switch-thumb-icon" aria-hidden="true">{glyph}</span>}
    </button>
  );
}
