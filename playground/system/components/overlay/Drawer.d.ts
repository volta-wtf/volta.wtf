import * as React from "react";
/**
 * Drawer — bottom sheet with drag handle (vaul-style), faithful to shadcn/ui.
 */
export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
export function Drawer(props: DrawerProps): JSX.Element;
export function DrawerTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }): JSX.Element;
export function DrawerContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DrawerHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DrawerFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DrawerTitle(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element;
export function DrawerDescription(props: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element;
export function DrawerClose(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }): JSX.Element;
