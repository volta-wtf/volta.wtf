import * as React from "react";
/**
 * Pagination — paged navigation, faithful to shadcn/ui.
 */
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}
export function Pagination(props: PaginationProps): JSX.Element;
export function PaginationContent(props: React.HTMLAttributes<HTMLUListElement>): JSX.Element;
export function PaginationItem(props: React.HTMLAttributes<HTMLLIElement>): JSX.Element;
export function PaginationLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }): JSX.Element;
export function PaginationPrevious(props: React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element;
export function PaginationNext(props: React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element;
export function PaginationEllipsis(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
