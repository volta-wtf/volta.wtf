import * as React from "react";
/**
 * Toggle — two-state button, faithful to shadcn/ui + Radix.
 */
export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}
export function Toggle(props: ToggleProps): JSX.Element;
