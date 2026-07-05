import React from "react";
import { cn } from "../lib/cn.js";

/** Avatar — image with graceful fallback to initials. */
export function Avatar({ className = "", ...props }) {
  return <span className={cn("ds-avatar", className)} {...props} />;
}
export function AvatarImage({ className = "", alt = "", onError, ...props }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return null;
  return <img alt={alt} className={className} onError={(e) => { setFailed(true); onError && onError(e); }} {...props} />;
}
export function AvatarFallback({ className = "", ...props }) {
  return <span className={cn("ds-avatar-fallback", className)} {...props} />;
}
