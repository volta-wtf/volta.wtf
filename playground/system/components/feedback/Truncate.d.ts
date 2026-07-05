import * as React from "react";
/**
 * Truncate — single-line ellipsis text that reveals its full content in a
 * muted tooltip (above by default) only when actually clipped.
 */
export interface TruncateProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Side the reveal tooltip appears on (default "top"). */
  side?: "top" | "right" | "bottom" | "left";
  /** Where the ellipsis goes: "end" (default) or "middle" (keep start + tail). */
  position?: "end" | "middle";
  /** Trailing characters preserved in "middle" mode (default 11). */
  tail?: number;
  /** How the full string is revealed: "cursor" (follows the pointer, default), "rail" (follows horizontally, anchored to the row), or "cover" (over the original text). */
  reveal?: "cursor" | "rail" | "cover";
}
export function Truncate(props: TruncateProps): JSX.Element;
