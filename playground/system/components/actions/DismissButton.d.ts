import * as React from "react";
/** DismissButton — a dedicated (✕) control on a soft rounded surface, for closing or removing. */
export interface DismissButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Square size — xs 20 · sm 28 · default 32 · md 36 · lg 40 (px). */
  size?: "xs" | "sm" | "default" | "md" | "lg";
  /** Surface shape — circle (default) or square (rounded-square). */
  shape?: "circle" | "square";
  /** Visual style — default (soft muted), primary (solid), or ghost (transparent). */
  variant?: "default" | "primary" | "ghost";
}
export function DismissButton(props: DismissButtonProps): JSX.Element;
