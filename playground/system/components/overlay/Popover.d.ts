import * as React from "react";
/** Popover — anchored floating panel, faithful to shadcn/ui + Radix. */
export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; }
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
}
export function Popover(props: PopoverProps): JSX.Element;
export function PopoverTrigger(props: PopoverTriggerProps): JSX.Element;
export function PopoverContent(props: PopoverContentProps): JSX.Element;
