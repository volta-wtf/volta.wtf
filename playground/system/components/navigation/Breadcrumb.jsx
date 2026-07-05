import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/** Breadcrumb — hierarchy trail. Compose list/item/link/page/separator. */
export function Breadcrumb({ className = "", ...props }) { return <nav aria-label="breadcrumb" className={cn("ds-breadcrumb", className)} {...props} />; }
export function BreadcrumbList({ className = "", ...props }) { return <ol className={cn("ds-breadcrumb-list", className)} {...props} />; }
export function BreadcrumbItem({ className = "", ...props }) { return <li style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-1-5)" }} className={className} {...props} />; }
export function BreadcrumbLink({ className = "", asChild = false, children, ...props }) {
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { className: cn("ds-breadcrumb-link", children.props.className), ...props });
  return <a className={cn("ds-breadcrumb-link", className)} {...props}>{children}</a>;
}
export function BreadcrumbPage({ className = "", ...props }) { return <span role="link" aria-disabled="true" aria-current="page" className={cn("ds-breadcrumb-page", className)} {...props} />; }
export function BreadcrumbSeparator({ className = "", children, ...props }) {
  return <li role="presentation" aria-hidden="true" className={cn("ds-breadcrumb-separator", className)} {...props}>{children ?? <Icon name="chevron-right" size={14} />}</li>;
}
export function BreadcrumbEllipsis({ className = "", ...props }) {
  return <span role="presentation" aria-hidden="true" className={cn("ds-breadcrumb-separator", className)} {...props}><Icon name="more-horizontal" size={16} /></span>;
}
