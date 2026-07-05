import * as React from "react";
/**
 * Spinner — indeterminate loading indicator.
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
  /** Named step (xs·sm·md·lg·xl·2xl·3xl·4xl) or a raw px number. */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | number;
  /** "ring" (arc, default) or "bars" (12 radial bars). */
  variant?: "ring" | "bars";
}
export function Spinner(props: SpinnerProps): JSX.Element;
