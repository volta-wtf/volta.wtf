import React from "react";
import { cn } from "../lib/cn.js";

/** Toggle — a two-state button. variant: default | outline. size: default | sm | lg. */
export function Toggle({ pressed, defaultPressed = false, onPressedChange, variant = "default", size = "default", disabled = false, className = "", ...props }) {
  const isControlled = pressed !== undefined;
  const [internal, setInternal] = React.useState(defaultPressed);
  const on = isControlled ? pressed : internal;
  const toggle = () => { if (disabled) return; const next = !on; if (!isControlled) setInternal(next); onPressedChange && onPressedChange(next); };
  return (
    <button
      type="button"
      aria-pressed={on}
      data-state={on ? "on" : "off"}
      disabled={disabled}
      onClick={toggle}
      className={cn("ds-toggle", variant === "outline" && "ds-toggle--outline", size !== "default" && `ds-toggle--${size}`, className)}
      {...props}
    />
  );
}
