import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * Chip — a compact representation of an entity (a user, channel, filter…),
 * not just a status label. Built on the Badge language but larger and
 * interactive. Supports leading `media` (icon/avatar), a `dropdown` chevron
 * (filter chips), a `selected` check on the right, and a removable `onRemove`
 * ✕ button. Variants: "primary" (default) · "secondary" · "outline" · "ghost".
 */
export function Chip({
  variant = "primary",
  media,
  selected = false,
  dropdown = false,
  onRemove,
  onClick,
  className = "",
  children,
  ...props
}) {
  const clickable = !!onClick || dropdown;
  return (
    <span
      className={cn("ds-chip", `ds-chip--${variant}`, clickable && "ds-chip--interactive", selected && "ds-chip--selected", className)}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-pressed={clickable ? selected : undefined}
      onClick={onClick}
      {...props}
    >
      {media != null && <span className="ds-chip-media">{media}</span>}
      <span className="ds-chip-label">{children}</span>
      {dropdown && <Icon name="chevron-down" className="ds-chip-caret" />}
      {selected && <Icon name="check" className="ds-chip-check" />}
      {onRemove && (
        <button
          type="button"
          className="ds-chip-remove"
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
        >
          <Icon name="close" />
        </button>
      )}
    </span>
  );
}
