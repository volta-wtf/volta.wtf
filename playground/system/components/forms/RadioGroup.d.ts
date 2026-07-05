import * as React from "react";
/**
 * RadioGroup / RadioGroupItem — single-select group, faithful to shadcn/ui + Radix.
 */
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  disabled?: boolean;
}
export function RadioGroup(props: RadioGroupProps): JSX.Element;
export function RadioGroupItem(props: RadioGroupItemProps): JSX.Element;
