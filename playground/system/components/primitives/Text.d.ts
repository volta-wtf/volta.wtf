import * as React from "react";
/**
 * Text primitives — semantic level (element) and visual level (styling) are
 * decoupled: `as` sets the rendered element, `size`/`level` sets the look.
 */
type Base = React.HTMLAttributes<HTMLElement> & { as?: keyof JSX.IntrinsicElements; className?: string };

export interface DisplayProps extends Base {
  /** Visual size. */
  size?: "sm" | "md" | "lg" | "xl";
}
/** Oversized hero/display text. Default element <h1>. */
export function Display(props: DisplayProps): JSX.Element;

export interface HeadingProps extends Base {
  /** Semantic + default visual level (1–6). Default element is <h{level}>. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Override the visual level independently of the semantic element. */
  size?: 1 | 2 | 3 | 4 | 5 | 6;
}
/** Section heading. `level` drives element + visual; `as`/`size` mix them. */
export function Heading(props: HeadingProps): JSX.Element;

export interface TextProps extends Base {
  /** Visual size. */
  size?: "xs" | "sm" | "base" | "lg";
  /** Tone/role. */
  variant?: "default" | "muted" | "lead";
  /** Optional explicit font-weight. */
  weight?: number;
}
/** Body copy. Default element <p>. */
export function Text(props: TextProps): JSX.Element;
