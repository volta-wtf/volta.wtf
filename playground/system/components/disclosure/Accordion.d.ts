import * as React from "react";
/**
 * Accordion — expandable sections, faithful to shadcn/ui + Radix.
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alias for multiple selection. */
  type?: "single" | "multiple";
  /** Allow several items open at once. */
  multiple?: boolean;
  /** In single mode, allow closing the open item (default true). */
  collapsible?: boolean;
  defaultValue?: string | string[];
}
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Disable this item (non-interactive, dimmed). */
  disabled?: boolean;
}
export function Accordion(props: AccordionProps): JSX.Element;
export function AccordionItem(props: AccordionItemProps): JSX.Element;
export function AccordionTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
export function AccordionContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
