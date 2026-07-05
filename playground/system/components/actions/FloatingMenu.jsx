import React from "react";
import { cn } from "../lib/cn.js";
import { FloatingButton } from "./FloatingButton.jsx";
import { Overlay } from "../overlay/Overlay.jsx";
import { Icon } from "../icons/Icon.jsx";

/**
 * FloatingMenu — an expandable floating action button (speed dial).
 * The trigger toggles open/closed; while open it reveals labelled child
 * actions stacked above it and swaps its icon to a close glyph.
 *
 * `actions`: `[{ icon, label, onClick, id? }]`. Controlled via `open` +
 * `onOpenChange`, or uncontrolled with `defaultOpen`. Positioning is the
 * consumer's responsibility (e.g. position: fixed, bottom/right).
 */
export function FloatingMenu({
  actions = [],
  icon = "add",
  openIcon = "close",
  variant = "default",
  size = "md",
  actionVariant = "surface",
  background = false,
  overlay = false,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className = "",
  ...props
}) {
  const isControlled = openProp !== undefined;
  const bg = background === true ? "label" : background;
  const [internal, setInternal] = React.useState(defaultOpen);
  const open = isControlled ? openProp : internal;
  const setOpen = (v) => {
    if (!isControlled) setInternal(v);
    if (onOpenChange) onOpenChange(v);
  };

  return (
    <React.Fragment>
      {overlay && <Overlay open={open} onClick={() => setOpen(false)} />}
      <div className={cn("ds-fab-menu", className)} data-open={open ? "" : undefined} data-bg={bg || undefined} data-overlay={overlay ? "" : undefined} {...props}>
      <div className="ds-fab-menu-actions">
        {actions.map((a, i) => (
          <div
            className="ds-fab-menu-action"
            key={a.id != null ? a.id : i}
            style={{ transitionDelay: (open ? actions.length - 1 - i : i) * 30 + "ms" }}
          >
            {a.label && <span className="ds-fab-menu-label">{a.label}</span>}
            <FloatingButton
              variant={actionVariant}
              size="sm"
              aria-label={a.label}
              tabIndex={open ? 0 : -1}
              onClick={() => { if (a.onClick) a.onClick(); setOpen(false); }}
            >
              <Icon name={a.icon || "add"} />
            </FloatingButton>
          </div>
        ))}
      </div>
      <FloatingButton
        variant={variant}
        size={size}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? openIcon : icon} />
      </FloatingButton>
      </div>
    </React.Fragment>
  );
}
