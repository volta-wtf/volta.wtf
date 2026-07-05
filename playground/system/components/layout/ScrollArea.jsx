import React from "react";
import { cn } from "../lib/cn.js";

/** ScrollArea — styled scroll container with a slim custom scrollbar. */
export function ScrollArea({ className = "", children, ...props }) {
  return (
    <div className={cn("ds-scroll-area", className)} {...props}>
      {children}
    </div>
  );
}
