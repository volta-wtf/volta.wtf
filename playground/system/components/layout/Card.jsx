import React from "react";
import { cn } from "../lib/cn.js";

/** Card — container with header/content/footer sub-parts. */
export function Card({ className = "", ...props }) {
  return <div className={cn("ds-card", className)} {...props} />;
}
export function CardHeader({ className = "", ...props }) {
  return <div className={cn("ds-card-header", className)} {...props} />;
}
export function CardTitle({ className = "", ...props }) {
  return <div className={cn("ds-card-title", className)} {...props} />;
}
export function CardDescription({ className = "", ...props }) {
  return <div className={cn("ds-card-description", className)} {...props} />;
}
export function CardContent({ className = "", ...props }) {
  return <div className={cn("ds-card-content", className)} {...props} />;
}
export function CardFooter({ className = "", ...props }) {
  return <div className={cn("ds-card-footer", className)} {...props} />;
}
