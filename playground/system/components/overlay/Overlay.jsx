import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Overlay — a dimming scrim/backdrop. Reusable behind menus, sheets, custom
 * popovers, etc. Fixed full-viewport by default; set `fixed={false}` to fill
 * the nearest positioned ancestor instead. Toggle with `open`; `onClick`
 * typically dismisses the thing it backs.
 */
export function Overlay({ open = false, fixed = true, onClick, className = "", ...props }) {
  return (
    <div
      className={cn("ds-scrim", fixed && "ds-scrim--fixed", className)}
      data-open={open ? "" : undefined}
      aria-hidden={open ? undefined : true}
      onClick={onClick}
      {...props}
    />
  );
}
