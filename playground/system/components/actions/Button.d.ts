import * as React from "react";

/**
 * Button — primary action control, faithful to shadcn/ui.
 *
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  /** Render the single child element as the button (Radix Slot pattern). */
  asChild?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
