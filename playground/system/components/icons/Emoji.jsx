import React from "react";
import { emojis } from "./emojiData.js";

/**
 * Emoji — renders a Unicode emoji from the design-system registry by name.
 * Names come from emojiData.js (grouped by the standard Unicode categories).
 * You may also pass the emoji character directly as `name`.
 */
export function Emoji({
  name,
  size = 16,
  label,
  className = "",
  style,
  ...rest
}) {
  const char = emojis[name] || name;
  if (!char) {
    if (typeof console !== "undefined") {
      console.warn(`[Emoji] unknown emoji name: "${name}"`);
    }
    return null;
  }
  return (
    <span
      role="img"
      aria-label={label || name}
      className={["ds-emoji", className].filter(Boolean).join(" ")}
      style={{ fontSize: size, lineHeight: 1, ...style }}
      {...rest}
    >
      {char}
    </span>
  );
}
