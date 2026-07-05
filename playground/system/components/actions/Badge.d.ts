import * as React from "react";
/**
 * Badge — compact status/label pill, faithful to shadcn/ui.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  asChild?: boolean;
}
export function Badge(props: BadgeProps): JSX.Element;
