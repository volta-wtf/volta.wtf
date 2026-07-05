import * as React from "react";
/**
 * NavigationMenu — site navigation with dropdown panels, faithful to shadcn/ui + Radix.
 */
export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {}
export function NavigationMenu(props: NavigationMenuProps): JSX.Element;
export function NavigationMenuList(props: React.HTMLAttributes<HTMLUListElement>): JSX.Element;
export function NavigationMenuItem(props: { children?: React.ReactNode }): JSX.Element;
export function NavigationMenuTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
export function NavigationMenuContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function NavigationMenuLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { title?: string }): JSX.Element;
