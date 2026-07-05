import * as React from "react";
/**
 * DropdownMenu — action menu, faithful to shadcn/ui + Radix.
 */
export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; }
export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> { align?: "start" | "center" | "end"; }
export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> { variant?: "default" | "destructive"; inset?: boolean; }
export interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> { checked?: boolean; onCheckedChange?: (checked: boolean) => void; }
export function DropdownMenu(props: DropdownMenuProps): JSX.Element;
export function DropdownMenuTrigger(props: DropdownMenuTriggerProps): JSX.Element;
export function DropdownMenuContent(props: DropdownMenuContentProps): JSX.Element;
export function DropdownMenuItem(props: DropdownMenuItemProps): JSX.Element;
export function DropdownMenuCheckboxItem(props: DropdownMenuCheckboxItemProps): JSX.Element;
export function DropdownMenuLabel(props: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }): JSX.Element;
export function DropdownMenuSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DropdownMenuShortcut(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
export function DropdownMenuGroup(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DropdownMenuRadioGroup(props: React.HTMLAttributes<HTMLDivElement> & { value?: string; onValueChange?: (value: string) => void }): JSX.Element;
export function DropdownMenuRadioItem(props: React.HTMLAttributes<HTMLDivElement> & { value: string }): JSX.Element;
export function DropdownMenuSub(props: { children?: React.ReactNode }): JSX.Element;
export function DropdownMenuSubTrigger(props: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }): JSX.Element;
export function DropdownMenuSubContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
