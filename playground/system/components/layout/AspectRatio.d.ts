import * as React from "react";
/** AspectRatio — locks content to a ratio, faithful to shadcn/ui + Radix. */
export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}
export function AspectRatio(props: AspectRatioProps): JSX.Element;
