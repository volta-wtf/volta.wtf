import React from "react";
import { cn } from "../lib/cn.js";

/**
 * DismissButton — a dedicated (✕) control on a soft rounded surface, used to
 * close or remove. Sizes: xs 20 · sm 28 · default 32 · md 36 · lg 40 (px); the ✕ glyph scales.
 * `shape`: circle (default) or square (rounded-square surface).
 * `variant`: default (soft muted), primary (solid), or ghost (transparent).
 */
export function DismissButton({ size = "default", shape = "circle", variant = "default", className = "", "aria-label": ariaLabel = "Dismiss", ...props }) {
  const g = size === "xs" ? 12 : size === "sm" ? 14 : size === "lg" ? 20 : size === "md" ? 18 : 16;
  return (
    <button type="button" aria-label={ariaLabel} className={cn("ds-close-btn", `ds-close-btn--${size}`, `ds-close-btn--${shape}`, variant !== "default" && `ds-close-btn--${variant}`, className)} {...props}>
      <svg width={g} height={g} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
      </svg>
    </button>
  );
}
