import React from "react";
import { cn } from "../lib/cn.js";

/** Input — single-line text field. Set aria-invalid for the error state. */
export function Input({ className = "", type = "text", ...props }) {
  return <input type={type} className={cn("ds-input", className)} {...props} />;
}
