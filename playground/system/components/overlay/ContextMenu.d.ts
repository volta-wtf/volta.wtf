import * as React from "react";
/**
 * ContextMenu — right-click menu, faithful to shadcn/ui + Radix.
 */
export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> { variant?: "default" | "destructive"; inset?: boolean; }
export function ContextMenu(props: { children?: React.ReactNode }): JSX.Element;
export function ContextMenuTrigger(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ContextMenuContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ContextMenuItem(props: ContextMenuItemProps): JSX.Element;
export function ContextMenuLabel(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ContextMenuSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ContextMenuShortcut(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
