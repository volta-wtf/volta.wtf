import React from "react";
import { cn } from "../lib/cn.js";

/** Field — form-field layout wrapper: label, control, description, error. */
export function Field({ orientation = "vertical", className = "", ...props }) {
  return <div role="group" data-orientation={orientation} className={cn("ds-field", orientation !== "vertical" && `ds-field--${orientation}`, className)} {...props} />;
}
export function FieldContent({ className = "", ...props }) { return <div className={cn("ds-field-content", className)} {...props} />; }
export function FieldTitle({ className = "", ...props }) { return <div className={cn("ds-field-title", className)} {...props} />; }
export function FieldLabel({ className = "", asChild = false, children, ...props }) {
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { className: cn("ds-field-label", children.props.className), ...props });
  return <label className={cn("ds-field-label", className)} {...props}>{children}</label>;
}
export function FieldDescription({ className = "", ...props }) { return <p className={cn("ds-field-description", className)} {...props} />; }
export function FieldError({ className = "", errors, children, ...props }) {
  let content = children;
  if (errors && errors.length) {
    const msgs = errors.filter(Boolean).map((e) => e.message).filter(Boolean);
    content = msgs.length > 1 ? <ul style={{ margin: 0, paddingLeft: "1.1em" }}>{msgs.map((m, i) => <li key={i}>{m}</li>)}</ul> : msgs[0];
  }
  if (content == null) return null;
  return <p role="alert" className={cn("ds-field-error", className)} {...props}>{content}</p>;
}
export function FieldGroup({ className = "", ...props }) { return <div className={cn("ds-field-group", className)} {...props} />; }
export function FieldSet({ className = "", ...props }) { return <fieldset className={cn("ds-fieldset", className)} {...props} />; }
export function FieldLegend({ variant = "legend", className = "", ...props }) { return <legend className={cn("ds-field-legend", variant === "label" && "ds-field-legend--label", className)} {...props} />; }
export function FieldSeparator({ className = "", children, ...props }) {
  if (children) return <div className={cn("ds-field-separator-text", className)} {...props}><span>{children}</span></div>;
  return <div className={cn("ds-field-separator", className)} {...props} />;
}
