import * as React from "react";
/**
 * Table — data table primitives, faithful to shadcn/ui.
 */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}
export function Table(props: TableProps): JSX.Element;
export function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>): JSX.Element;
export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>): JSX.Element;
export function TableFooter(props: React.HTMLAttributes<HTMLTableSectionElement>): JSX.Element;
export function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>): JSX.Element;
export function TableHead(props: React.ThHTMLAttributes<HTMLTableCellElement>): JSX.Element;
export function TableCell(props: React.TdHTMLAttributes<HTMLTableCellElement>): JSX.Element;
export function TableCaption(props: React.HTMLAttributes<HTMLTableCaptionElement>): JSX.Element;
