import React from "react";
import { cn } from "../lib/cn.js";

/** Separator — thin divider line. orientation: horizontal | vertical. */
export function Separator({ orientation = "horizontal", decorative = true, className = "", ...props }) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
      className={cn("ds-separator", className)}
      {...props}
    />
  );
}
