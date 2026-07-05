import React from "react";
import { cn } from "../lib/cn.js";

/** Progress — determinate progress bar (0–100). */
export function Progress({ value = 0, className = "", ...props }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn("ds-progress", className)}
      {...props}
    >
      <div className="ds-progress-indicator" style={{ transform: `translateX(-${100 - pct}%)` }} />
    </div>
  );
}
