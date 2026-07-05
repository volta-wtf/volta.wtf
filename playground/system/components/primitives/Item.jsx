import React from "react";
import { cn } from "../lib/cn.js";

/** Item — flexible list row: media, content (title/description), actions. */
export function Item({ variant = "default", size = "default", asChild = false, className = "", children, ...props }) {
  const cls = cn("ds-item", variant !== "default" && `ds-item--${variant}`, size !== "default" && `ds-item--${size}`, className);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { className: cn(cls, children.props.className), ...props });
  }
  return <div className={cls} {...props}>{children}</div>;
}
export function ItemHeader({ className = "", ...props }) { return <div className={cn("ds-item-header", className)} {...props} />; }
export function ItemFooter({ className = "", ...props }) { return <div className={cn("ds-item-footer", className)} {...props} />; }
export function ItemMedia({ variant = "default", className = "", ...props }) {
  return <div className={cn("ds-item-media", variant === "icon" && "ds-item-media--icon", className)} {...props} />;
}
export function ItemContent({ className = "", ...props }) { return <div className={cn("ds-item-content", className)} {...props} />; }
export function ItemTitle({ className = "", ...props }) { return <div className={cn("ds-item-title", className)} {...props} />; }
export function ItemDescription({ className = "", ...props }) { return <div className={cn("ds-item-description", className)} {...props} />; }
export function ItemActions({ className = "", ...props }) { return <div className={cn("ds-item-actions", className)} {...props} />; }
export function ItemGroup({ className = "", ...props }) { return <div className={cn("ds-item-group", className)} {...props} />; }
export function ItemSeparator({ className = "", ...props }) { return <div className={cn("ds-item-separator", className)} {...props} />; }
