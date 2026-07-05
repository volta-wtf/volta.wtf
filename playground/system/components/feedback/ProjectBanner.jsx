import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * ProjectBanner — a full-width announcement bar (Geist). `variant`
 * neutral|info|warning|error. Optional leading `icon`, trailing `action` node
 * and a dismiss button when `onDismiss` is supplied.
 */
export function ProjectBanner({ variant = "neutral", icon, action, onDismiss, className = "", children, ...props }) {
  return (
    <div className={cn("ds-project-banner", `ds-project-banner--${variant}`, className)} {...props}>
      {icon && <Icon name={icon} size={16} className="ds-project-banner-icon" />}
      <span className="ds-project-banner-text">{children}</span>
      {action && <span className="ds-project-banner-action">{action}</span>}
      {onDismiss && (
        <button type="button" className="ds-project-banner-close" aria-label="Dismiss" onClick={onDismiss}><Icon name="close" size={15} /></button>
      )}
    </div>
  );
}
