import React from "react";
import { cn } from "../lib/cn.js";

/** Bubble — a chat message bubble. variant: assistant | user. */
export function Bubble({ variant = "assistant", className = "", ...props }) {
  return <div className={cn("ds-bubble", `ds-bubble--${variant}`, className)} {...props} />;
}
