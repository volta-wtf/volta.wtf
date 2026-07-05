import React from "react";
import { cn } from "../lib/cn.js";

/** Textarea — multi-line text field. field-sizing:content grows with input. */
export function Textarea({ className = "", ...props }) {
  return <textarea className={cn("ds-textarea", className)} {...props} />;
}
