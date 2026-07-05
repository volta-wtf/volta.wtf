import * as React from "react";
/**
 * Select — dropdown single-select, faithful to shadcn/ui + Radix.
 */
export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface SelectValueProps { placeholder?: string; }
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}
export function Select(props: SelectProps): JSX.Element;
export function SelectTrigger(props: SelectTriggerProps): JSX.Element;
export function SelectValue(props: SelectValueProps): JSX.Element;
export function SelectContent(props: SelectContentProps): JSX.Element;
export function SelectItem(props: SelectItemProps): JSX.Element;
export function SelectGroup(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SelectLabel(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SelectSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
