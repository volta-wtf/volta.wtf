import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";
import { Tooltip, TooltipTrigger, TooltipContent } from "../feedback/Tooltip.jsx";

/**
 * Description — a compact label/value pair (Geist). Small muted title above a
 * value. `inline` places them side by side. `hint` adds an info glyph beside
 * the title revealing a tooltip. Group several for a metadata strip.
 */
export function Description({ title, hint, children, inline = false, className = "", ...props }) {
  return (
    <div className={cn("ds-description", inline && "ds-description--inline", className)} {...props}>
      <dt className="ds-description-title">
        {title}
        {hint && (
          <Tooltip>
            <TooltipTrigger asChild><span className="ds-description-hint" tabIndex={0} role="button" aria-label="More info"><Icon name="info" size={13} /></span></TooltipTrigger>
            <TooltipContent size="sm">{hint}</TooltipContent>
          </Tooltip>
        )}
      </dt>
      <dd className="ds-description-content">{children}</dd>
    </div>
  );
}
