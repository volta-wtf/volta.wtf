import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";
import { DismissButton } from "../actions/DismissButton.jsx";

/**
 * Attachment — file/image chip with thumbnail, name, size, and optional remove.
 * Supports upload states, three scales, and horizontal/vertical orientation.
 * Wrap several in <AttachmentGroup> for a scrollable, snapping row.
 */
export function Attachment({ name, size, src, icon = "file", state = "done", scale = "default", orientation = "horizontal", onRemove, className = "", ...props }) {
  const busy = state === "uploading" || state === "processing";
  const isError = state === "error";
  const vertical = orientation === "vertical";
  return (
    <div
      className={cn(
        "ds-attachment",
        scale !== "default" && `ds-attachment--${scale}`,
        vertical && "ds-attachment--vertical",
        busy && "ds-attachment--busy",
        isError && "ds-attachment--error",
        className
      )}
      data-state={state}
      {...props}
    >
      <div className="ds-attachment-thumb">
        {src ? <img src={src} alt="" /> : <Icon name={isError ? "alert-triangle" : icon} size={18} />}
        {vertical && onRemove && (
          <DismissButton size="sm" shape="circle" className="ds-attachment-remove-float" aria-label={`Remove ${name}`} onClick={onRemove} />
        )}
      </div>
      <div className="ds-attachment-body">
        <span className={cn("ds-attachment-name", busy && "shimmer")}>{name}</span>
        {size && <span className="ds-attachment-meta">{size}</span>}
      </div>
      {!vertical && onRemove && (
        <DismissButton size="sm" shape="square" className="ds-attachment-remove" aria-label={`Remove ${name}`} onClick={onRemove} />
      )}
    </div>
  );
}

/** AttachmentGroup — horizontally scrollable, snapping row of attachments with a scroll-aware edge fade. */
export function AttachmentGroup({ className = "", ...props }) {
  return <div className={cn("ds-attachment-group scroll-fade-x scrollbar-none", className)} {...props} />;
}
