import React from "react";
import { cn } from "../lib/cn.js";

/** Label — form label. Pass htmlFor to associate with a control. */
export function Label({ className = "", ...props }) {
  return <label className={cn("ds-label", className)} {...props} />;
}
