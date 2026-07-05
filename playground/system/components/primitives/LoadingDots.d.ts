import * as React from "react";
/**
 * LoadingDots — three sequentially-pulsing dots for inline loading states.
 */
export interface LoadingDotsProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Dot diameter in px (default 4). */
  size?: number;
}
export function LoadingDots(props: LoadingDotsProps): JSX.Element;
