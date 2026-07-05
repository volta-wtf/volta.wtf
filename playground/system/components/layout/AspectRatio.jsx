import React from "react";
import { cn } from "../lib/cn.js";

/** AspectRatio — constrains children to a width/height ratio (default 16/9). */
export function AspectRatio({ ratio = 16 / 9, className = "", style, children, ...props }) {
  return (
    <div className={cn("ds-aspect-ratio", className)} style={{ aspectRatio: String(ratio), ...style }} {...props}>
      {children}
    </div>
  );
}
