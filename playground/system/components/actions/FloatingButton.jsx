import React from "react";
import { cn } from "../lib/cn.js";

/**
 * FloatingButton — Floating Action Button. A circular, elevated primary
 * action (LINE LDSG-style) built on shadcn tokens. Pass an <Icon> as
 * children; set `extended` to render a labelled pill (icon + text).
 * Positioning is the consumer's responsibility (e.g. position: fixed).
 */
export function FloatingButton({ variant = "default", size = "md", extended = false, className = "", children, ...props }) {
  return (
    <button
      type="button"
      className={cn("ds-fab", `ds-fab--${variant}`, `ds-fab--${size}`, extended && "ds-fab--extended", className)}
      {...props}
    >
      {children}
    </button>
  );
}
