import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * Error — an inline error message (Geist). Red-tinted text with a leading
 * alert glyph. `size` sm|md|lg. Wrap form fields or surface validation copy.
 */
export function Error({ size = "md", className = "", children, ...props }) {
  return (
    <div role="alert" className={cn("ds-error", `ds-error--${size}`, className)} {...props}>
      <Icon name="circle-alert" className="ds-error-icon" />
      <span className="ds-error-text">{children}</span>
    </div>
  );
}
