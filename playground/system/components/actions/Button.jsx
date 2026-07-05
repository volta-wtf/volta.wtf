import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Button — shadcn/ui button. Variants: default | secondary | destructive |
 * outline | ghost | link. Sizes: default | sm | lg | icon.
 */
export function Button({
  variant = "default",
  size = "default",
  className = "",
  asChild = false,
  children,
  ...props
}) {
  const classes = cn(
    "ds-btn ds-focus-ring",
    `ds-btn--${size}`,
    `ds-btn--${variant === "default" ? "primary" : variant}`,
    className
  );
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    });
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
