import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Typography — the shadcn/ui typography set as composable elements.
 * Each applies a `.ds-*` class from styles/components-typography.css and
 * forwards className + props, so it stays a plain, overridable element.
 */
const make = (Tag, cls) =>
  function TypographyEl({ className = "", ...props }) {
    return <Tag className={cn(cls, className)} {...props} />;
  };

export const H1 = make("h1", "ds-h1");
export const H2 = make("h2", "ds-h2");
export const H3 = make("h3", "ds-h3");
export const H4 = make("h4", "ds-h4");
export const P = make("p", "ds-p");
export const Blockquote = make("blockquote", "ds-blockquote");
export const InlineCode = make("code", "ds-inline-code");
export const Lead = make("p", "ds-lead");
export const Large = make("div", "ds-large");
export const Small = make("small", "ds-small");
export const Muted = make("p", "ds-muted");

/** List — a disc/decimal typographic list. `ordered` renders an <ol>. */
export function List({ ordered = false, className = "", ...props }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className={cn("ds-list", ordered && "ds-list--ordered", className)} {...props} />;
}

/** Namespace grouping of every typography element. */
export const Typography = { H1, H2, H3, H4, P, Blockquote, InlineCode, Lead, Large, Small, Muted, List };
