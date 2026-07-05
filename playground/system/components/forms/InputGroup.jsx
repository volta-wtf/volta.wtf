import React from "react";
import { cn } from "../lib/cn.js";

/** InputGroup — an input with leading/trailing addons (icons, buttons, text). */
export function InputGroup({ className = "", ...props }) {
  return <div className={cn("ds-input-group", className)} {...props} />;
}
export function InputGroupInput({ className = "", ...props }) {
  return <input data-slot="input-group-control" className={cn("ds-input-group-input", className)} {...props} />;
}
export function InputGroupTextarea({ className = "", ...props }) {
  return <textarea data-slot="input-group-control" className={cn("ds-input-group-textarea", className)} {...props} />;
}
export function InputGroupAddon({ align = "inline-start", className = "", ...props }) {
  return <div data-align={align} className={cn("ds-input-group-addon", `ds-input-group-addon--${align}`, className)} {...props} />;
}
export function InputGroupText({ className = "", ...props }) {
  return <span className={cn("ds-input-group-addon", className)} {...props} />;
}
export function InputGroupButton({ className = "", size = "xs", variant = "ghost", ...props }) {
  const sizeCls = size === "icon-xs" ? "ds-btn--icon-xs" : size === "icon-sm" ? "ds-btn--icon-sm" : `ds-btn--${size}`;
  return <button type="button" className={cn("ds-btn", sizeCls, `ds-btn--${variant}`, className)} {...props} />;
}
