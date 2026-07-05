import * as React from "react";
/** Progress — determinate progress bar, faithful to shadcn/ui + Radix. */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  value?: number;
}
export function Progress(props: ProgressProps): JSX.Element;
