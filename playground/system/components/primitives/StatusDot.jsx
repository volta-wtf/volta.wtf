import React from "react";
import { cn } from "../lib/cn.js";

/**
 * StatusDot — a small colored dot conveying state (Geist/Vercel style).
 * `status`: "ready" (green) · "error" (red) · "warning" (amber) · "info"
 * (blue) · "neutral" (gray). `pulse` adds a soft radiating halo for live
 * states. `label` renders trailing text beside the dot. `size` in px.
 */
export function StatusDot({ status = "neutral", pulse = false, label, size = 8, className = "", ...props }) {
  const dot = (
    <span className={cn("ds-status-dot", `ds-status-dot--${status}`, pulse && "ds-status-dot--pulse")} style={{ width: size, height: size }} aria-hidden={label ? "true" : undefined} />
  );
  if (label == null) {
    return <span className={cn("ds-status-dot-wrap", className)} role="status" {...props}>{dot}</span>;
  }
  return (
    <span className={cn("ds-status-dot-wrap", className)} role="status" {...props}>
      {dot}
      <span className="ds-status-dot-label">{label}</span>
    </span>
  );
}
