import * as React from "react";
/**
 * Switch — on/off toggle, faithful to shadcn/ui + Radix.
 */
export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "checked" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Track size — "sm" · "md" (default) · "lg". */
  size?: "sm" | "md" | "lg";
  /** Glyph inside the thumb (both states unless `checkedIcon` set). */
  icon?: React.ReactNode;
  /** Glyph on the thumb when checked. */
  checkedIcon?: React.ReactNode;
}
export function Switch(props: SwitchProps): JSX.Element;
