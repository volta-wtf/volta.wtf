import * as React from "react";
/** Separator — divider line, faithful to shadcn/ui + Radix. */
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}
export function Separator(props: SeparatorProps): JSX.Element;
