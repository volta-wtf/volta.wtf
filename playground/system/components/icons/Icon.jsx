import React from "react";
import { icons } from "./iconData.js";

/**
 * Icon — renders a Lucide-canvas glyph from the design-system registry.
 * Base library is Lucide; names are drawn from the Pictos / Icons /
 * Context layers merged in iconData.js.
 */
export function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  className = "",
  style,
  ...rest
}) {
  const markup = icons[name];
  if (!markup) {
    if (typeof console !== "undefined") {
      console.warn(`[Icon] unknown icon name: "${name}"`);
    }
    return null;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={["ds-icon", className].filter(Boolean).join(" ")}
      style={style}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: markup }}
      {...rest}
    />
  );
}
