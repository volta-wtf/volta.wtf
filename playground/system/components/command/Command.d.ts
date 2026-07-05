import * as React from "react";
/**
 * Command — command palette / filterable list, faithful to shadcn/ui (cmdk).
 */
export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  keywords?: string;
  onSelect?: () => void;
}
export function Command(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CommandInput(props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element;
export function CommandList(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CommandEmpty(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element | null;
export function CommandGroup(props: React.HTMLAttributes<HTMLDivElement> & { heading?: string }): JSX.Element;
export function CommandItem(props: CommandItemProps): JSX.Element;
export function CommandSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CommandShortcut(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
