import React from "react";
import { cn } from "../lib/cn.js";

/** Skeleton — animated placeholder for loading content. Size via style/className. */
export function Skeleton({ className = "", ...props }) {
  return <div className={cn("ds-skeleton", className)} {...props} />;
}
