import React from "react";
import { cn } from "../lib/cn.js";

/** Marker — inline text highlight / annotation (styled <mark>). */
export function Marker({ className = "", ...props }) {
  return <mark className={cn("ds-marker", className)} {...props} />;
}
