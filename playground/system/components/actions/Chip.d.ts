import * as React from "react";
/**
 * Chip — compact entity representation (user, channel, filter), built on the
 * Badge language but larger and interactive.
 */
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour treatment. */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Leading media — an icon, avatar, or avatar stack. */
  media?: React.ReactNode;
  /** Show a check on the right (selected filter/option). */
  selected?: boolean;
  /** Show a trailing chevron (filter/menu chip). */
  dropdown?: boolean;
  /** When set, renders a trailing ✕ remove button; called on click. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Makes the whole chip a button (also implied by `dropdown`). */
  onClick?: (e: React.MouseEvent) => void;
}
export function Chip(props: ChipProps): JSX.Element;
