import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";
import { Tooltip, TooltipTrigger, TooltipContent } from "../feedback/Tooltip.jsx";

/**
 * IconButton — an icon-only action sized to the glyph itself. The round
 * hit/hover background is painted by an outward ::before pseudo-element, so it
 * extends beyond the icon without taking layout space (toolbar icons stay
 * tightly spaced). `variant`: "ghost" (default, bg appears on hover) ·
 * "solid" (filled, always) · "surface" (subtle resting fill).
 *
 * Icon-only buttons (no visible `label`) always surface the design-system
 * Tooltip so the action stays discoverable — pass `tooltip` text or it falls
 * back to `aria-label`. With a `label`, a plain-text context label is shown
 * instead (positioned via `labelPosition`).
 */
export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  label,
  labelPosition = "bottom",
  readOnly = false,
  tooltip,
  tooltipSide = "top",
  className = "",
  "aria-label": ariaLabel,
  children,
  ...props
}) {
  const iconOnly = label == null || label === "";
  const tip = tooltip ?? ariaLabel;
  const btn = (
    <button
      type="button"
      aria-label={ariaLabel || label || tooltip}
      aria-disabled={readOnly || undefined}
      tabIndex={readOnly ? -1 : undefined}
      className={cn("ds-icon-btn", `ds-icon-btn--${variant}`, `ds-icon-btn--${size}`, readOnly && "ds-icon-btn--readonly", className)}
      {...props}
    >
      {icon ? <Icon name={icon} /> : children}
    </button>
  );
  if (iconOnly) {
    if (!tip) return btn;
    // The design-system Tooltip's provider is a no-op, so no root setup is needed.
    return (
      <Tooltip>
        <TooltipTrigger asChild>{btn}</TooltipTrigger>
        <TooltipContent side={tooltipSide} size="sm">{tip}</TooltipContent>
      </Tooltip>
    );
  }
  return (
    <span className={cn("ds-icon-btn-ctx", `ds-icon-btn-ctx--${labelPosition}`)}>
      {btn}
      <span className="ds-icon-btn-ctx-label">{label}</span>
    </span>
  );
}
