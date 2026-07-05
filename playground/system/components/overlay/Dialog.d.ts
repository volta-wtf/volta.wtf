import * as React from "react";
/**
 * Dialog — modal overlay window, faithful to shadcn/ui + Radix.
 */
export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; }
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> { showClose?: boolean; }
export function Dialog(props: DialogProps): JSX.Element;
export function DialogTrigger(props: DialogTriggerProps): JSX.Element;
export function DialogContent(props: DialogContentProps): JSX.Element;
export function DialogHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DialogFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DialogTitle(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element;
export function DialogDescription(props: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element;
export function DialogClose(props: DialogTriggerProps): JSX.Element;
