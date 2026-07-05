import React from "react";
import { cn } from "../lib/cn.js";

/**
 * LoadingDots — three dots that pulse in sequence (Geist/Vercel style), for
 * inline "working…" states inside buttons, text, or menus. `size` sets the dot
 * diameter in px; color follows `currentColor`.
 */
export function LoadingDots({ size = 4, className = "", ...props }) {
  return (
    <span className={cn("ds-loading-dots", className)} role="status" aria-label="Loading" style={{ "--ld-size": `${size}px` }} {...props}>
      <span className="ds-loading-dot" />
      <span className="ds-loading-dot" />
      <span className="ds-loading-dot" />
    </span>
  );
}
