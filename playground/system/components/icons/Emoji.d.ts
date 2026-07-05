import * as React from "react";

/**
 * Emoji — renders a Unicode emoji from the design-system's registry
 * (emojiData.js, grouped by the standard Unicode categories).
 */
export interface EmojiProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Registry shortcode (e.g. "joy", "rocket", "red-heart") — or the emoji character itself. */
  name: string;
  /** Pixel size (font-size). Default 16. */
  size?: number;
  /** Accessible label. Defaults to `name`. */
  label?: string;
  className?: string;
}

export function Emoji(props: EmojiProps): JSX.Element | null;
