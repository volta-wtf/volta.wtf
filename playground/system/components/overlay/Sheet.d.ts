import * as React from "react";
/**
 * Sheet — edge-anchored panel (Dialog variant), faithful to shadcn/ui + Radix.
 */
export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "right" | "left" | "top" | "bottom";
  showClose?: boolean;
}
export function Sheet(props: SheetProps): JSX.Element;
export function SheetTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }): JSX.Element;
export function SheetContent(props: SheetContentProps): JSX.Element;
export function SheetHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SheetFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SheetTitle(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element;
export function SheetDescription(props: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element;
export function SheetClose(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }): JSX.Element;
