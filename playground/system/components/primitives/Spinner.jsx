import React from "react";
import { cn } from "../lib/cn.js";

/** Named sizes (px) — mirror Geist's scale; a raw number is also accepted. */
const SIZES = { xs: 12, sm: 14, md: 16, lg: 20, xl: 24, "2xl": 32, "3xl": 40, "4xl": 56 };

/**
 * Spinner — indeterminate loading indicator.
 *   - variant="ring" (default): a spinning arc (Lucide loader) — use in buttons.
 *   - variant="bars": 12 fading radial bars (Geist style) — use in tables/rows.
 * `size` is a named step (xs·sm·md·lg·xl·2xl·3xl·4xl) or a raw px number.
 */
export function Spinner({ size = "md", variant = "ring", className = "", style, ...props }) {
  const px = typeof size === "number" ? size : (SIZES[size] || 16);
  if (variant === "bars") {
    return (
      <span className={cn("ds-spinner-bars", className)} role="status" aria-label="Loading" style={{ width: px, height: px, ...style }} {...props}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="ds-spinner-bar" style={{ transform: `rotate(${i * 30}deg) translate(146%)`, animationDelay: `${-(11 - i) * 100}ms` }} />
        ))}
      </span>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={px} height={px} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={cn("ds-spinner", className)} role="status" aria-label="Loading" style={style} {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
