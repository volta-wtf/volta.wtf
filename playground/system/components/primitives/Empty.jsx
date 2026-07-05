import React from "react";
import { cn } from "../lib/cn.js";

/** Empty — empty-state layout: media, title, description, content (actions). */
export function Empty({ className = "", ...props }) { return <div className={cn("ds-empty", className)} {...props} />; }
export function EmptyMedia({ className = "", ...props }) { return <div className={cn("ds-empty-media", className)} {...props} />; }
export function EmptyTitle({ className = "", ...props }) { return <div className={cn("ds-empty-title", className)} {...props} />; }
export function EmptyDescription({ className = "", ...props }) { return <p className={cn("ds-empty-description", className)} {...props} />; }
export function EmptyContent({ className = "", ...props }) { return <div className={cn("ds-empty-content", className)} {...props} />; }
export function EmptyHeader({ className = "", ...props }) { return <div className={cn(className)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--spacing-1)" }} {...props} />; }
