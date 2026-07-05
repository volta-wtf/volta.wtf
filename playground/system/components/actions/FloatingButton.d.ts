import * as React from "react";
/**
 * FloatingButton — Floating Action Button, faithful to LINE LDSG on shadcn tokens.
 */
export interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Colour treatment. */
  variant?: "default" | "secondary" | "surface";
  /** Circular diameter — sm 40 · md 56 (default) · lg 64. */
  size?: "sm" | "md" | "lg";
  /** Render as a labelled pill (icon + text) instead of a circle. */
  extended?: boolean;
}
export function FloatingButton(props: FloatingButtonProps): JSX.Element;
