import * as React from "react";
/** Collapsible — show/hide a region, faithful to shadcn/ui + Radix. */
export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; }
export function Collapsible(props: CollapsibleProps): JSX.Element;
export function CollapsibleTrigger(props: CollapsibleTriggerProps): JSX.Element;
export function CollapsibleContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
