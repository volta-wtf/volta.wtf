import * as React from "react";
/**
 * Menubar — persistent desktop-style menu bar, faithful to shadcn/ui + Radix.
 */
export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Menubar(props: MenubarProps): JSX.Element;
export function MenubarMenu(props: { children?: React.ReactNode }): JSX.Element;
export function MenubarTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
export function MenubarContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function MenubarItem(props: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }): JSX.Element;
export function MenubarSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function MenubarShortcut(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
export function MenubarLabel(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
