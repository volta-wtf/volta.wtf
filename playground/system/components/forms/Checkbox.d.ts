import * as React from "react";
/**
 * Checkbox — binary/indeterminate toggle, faithful to shadcn/ui + Radix.
 */
export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "checked" | "onChange"> {
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
