import React from "react";
import { cn } from "../lib/cn.js";

/** Kbd — a keyboard key. KbdGroup joins several into a shortcut. */
export function Kbd({ className = "", ...props }) {
  return <kbd className={cn("ds-kbd", className)} {...props} />;
}
export function KbdGroup({ className = "", ...props }) {
  return <span className={cn("ds-kbd-group", className)} {...props} />;
}
