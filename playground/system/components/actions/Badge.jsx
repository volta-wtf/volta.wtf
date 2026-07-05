import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Badge — small status/label pill. Variants: default | secondary |
 * destructive | outline.
 */
export function Badge({ variant = "default", className = "", asChild = false, children, ...props }) {
  const classes = cn("ds-badge", `ds-badge--${variant}`, className);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { className: cn(classes, children.props.className), ...props });
  }
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
