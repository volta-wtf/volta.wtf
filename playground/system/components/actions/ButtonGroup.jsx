import React from "react";
import { cn } from "../lib/cn.js";

/** ButtonGroup — visually joins a row (or column) of Buttons/controls. */
export function ButtonGroup({ orientation = "horizontal", className = "", ...props }) {
  return <div role="group" data-orientation={orientation} className={cn("ds-button-group", orientation === "vertical" && "ds-button-group--vertical", className)} {...props} />;
}
export function ButtonGroupSeparator({ orientation = "vertical", className = "", ...props }) {
  return <div data-orientation={orientation} className={cn("ds-button-group-separator", className)} {...props} />;
}
export function ButtonGroupText({ className = "", ...props }) {
  return <span className={cn("ds-button-group-text", className)} {...props} />;
}
