import * as React from "react";
/** ToggleGroup — grouped toggles, faithful to shadcn/ui + Radix. */
export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}
export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { value: string; }
export function ToggleGroup(props: ToggleGroupProps): JSX.Element;
export function ToggleGroupItem(props: ToggleGroupItemProps): JSX.Element;
