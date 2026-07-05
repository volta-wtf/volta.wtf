import * as React from "react";
/**
 * Breadcrumb — page hierarchy trail, faithful to shadcn/ui.
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
export function BreadcrumbList(props: React.HTMLAttributes<HTMLOListElement>): JSX.Element;
export function BreadcrumbItem(props: React.HTMLAttributes<HTMLLIElement>): JSX.Element;
export function BreadcrumbLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }): JSX.Element;
export function BreadcrumbPage(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
export function BreadcrumbSeparator(props: React.HTMLAttributes<HTMLLIElement>): JSX.Element;
export function BreadcrumbEllipsis(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
