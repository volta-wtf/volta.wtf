import * as React from "react";
/**
 * IconButton — an icon-only button sized to the glyph, with an outward round
 * background pseudo-element (Gmail-toolbar style).
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon name (from the design-system icon set). */
  icon?: string;
  /** Background treatment: "ghost" (hover only), "solid" (filled), "surface" (subtle resting fill). */
  variant?: "ghost" | "solid" | "surface";
  /** Icon size — sm · md (default) · lg. */
  size?: "sm" | "md" | "lg";
  /** Optional contextual label shown beside the icon (plain text, no background). */
  label?: string;
  /** Where the context label sits: "top" · "bottom" (default) · "left" · "right". */
  labelPosition?: "top" | "bottom" | "left" | "right";
  /** Non-interactive but NOT visually dimmed like `disabled` — no hover/press, keeps full-strength appearance. */
  readOnly?: boolean;
  /** Tooltip text for icon-only buttons (design-system Tooltip, always shown). Defaults to `aria-label`. */
  tooltip?: string;
  /** Side the tooltip appears on. */
  tooltipSide?: "top" | "bottom" | "left" | "right";
  /** Accessible label (icon-only, so this is important). */
  "aria-label"?: string;
}
export function IconButton(props: IconButtonProps): JSX.Element;
