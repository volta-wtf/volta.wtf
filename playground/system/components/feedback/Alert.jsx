import React from "react";
import { cn } from "../lib/cn.js";

/** Alert — callout for contextual messages. variant: default | destructive. */
export function Alert({ variant = "default", className = "", ...props }) {
  return <div role="alert" className={cn("ds-alert", variant === "destructive" && "ds-alert--destructive", className)} {...props} />;
}
export function AlertTitle({ className = "", ...props }) {
  return <div className={cn("ds-alert-title", className)} {...props} />;
}
export function AlertDescription({ className = "", ...props }) {
  return <div className={cn("ds-alert-description", className)} {...props} />;
}
export function AlertAction({ className = "", ...props }) {
  return <div className={cn("ds-alert-action", className)} {...props} />;
}
