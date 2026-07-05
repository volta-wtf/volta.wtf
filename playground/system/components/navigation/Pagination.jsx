import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/** Pagination — page navigation. Compose content/item/link + prev/next/ellipsis. */
export function Pagination({ className = "", ...props }) { return <nav role="navigation" aria-label="pagination" className={cn("ds-pagination", className)} {...props} />; }
export function PaginationContent({ className = "", ...props }) { return <ul className={cn("ds-pagination-list", className)} {...props} />; }
export function PaginationItem({ className = "", ...props }) { return <li className={className} {...props} />; }
export function PaginationLink({ isActive = false, className = "", children, ...props }) {
  return <a aria-current={isActive ? "page" : undefined} data-active={isActive || undefined} className={cn("ds-pagination-link", className)} {...props}>{children}</a>;
}
export function PaginationPrevious({ className = "", ...props }) {
  return <a aria-label="Go to previous page" className={cn("ds-pagination-link", className)} style={{ paddingLeft: "var(--spacing-2-5)" }} {...props}><Icon name="chevron-left" size={16} /> Previous</a>;
}
export function PaginationNext({ className = "", ...props }) {
  return <a aria-label="Go to next page" className={cn("ds-pagination-link", className)} style={{ paddingRight: "var(--spacing-2-5)" }} {...props}>Next <Icon name="chevron-right" size={16} /></a>;
}
export function PaginationEllipsis({ className = "", ...props }) {
  return <span aria-hidden="true" className={cn("ds-pagination-ellipsis", className)} {...props}><Icon name="more-horizontal" size={16} /></span>;
}
