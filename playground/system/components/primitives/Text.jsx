import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Text primitives — semantic level and visual level are decoupled. Each
 * primitive renders a sensible default element but `as` overrides the SEMANTIC
 * element while `size`/`level` sets the VISUAL treatment. So an <h1> can look
 * like body text, or a <span> can look like a display heading:
 *
 *   <Heading as="h1" size="sm">…</Heading>   // semantic h1, small visual
 *   <Text as="span" size="lg">…</Text>       // inline, large body
 *
 * Visual styling comes from `.ds-t-*` classes (styles/components-primitives.css).
 */

/** Display — oversized marketing/hero text. size: sm | md | lg | xl (default lg). Default element <h1>. */
export function Display({ as: As = "h1", size = "lg", className = "", ...props }) {
  return <As className={cn("ds-display", `ds-display--${size}`, className)} {...props} />;
}

/**
 * Heading — section headings. `level` (1–6) drives BOTH the default element
 * (<h{level}>) and the default visual size; override the element with `as` or
 * the visual with `size` to mix them (e.g. `as="h1" size="4"`).
 */
export function Heading({ level = 2, as, size, className = "", ...props }) {
  const El = as || `h${level}`;
  const visual = size || level;
  return <El className={cn("ds-heading", `ds-heading--${visual}`, className)} {...props} />;
}

/** Text — body copy. size: xs | sm | base | lg (default base). variant: default | muted | lead. Default element <p>. */
export function Text({ as: As = "p", size = "base", variant = "default", weight, className = "", style, ...props }) {
  return (
    <As
      className={cn("ds-text", `ds-text--${size}`, variant !== "default" && `ds-text--${variant}`, className)}
      style={weight ? { fontWeight: weight, ...style } : style}
      {...props}
    />
  );
}
