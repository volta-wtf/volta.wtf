import React from "react";
import { pictos } from "./pictosData.js";

/**
 * Picto — renders a raw Lucide glyph from the base library (pictosData.js)
 * by its canonical Lucide name. For semantic/product UI names use <Icon>,
 * which resolves through iconData.js to a picto.
 */
export function Picto({
  name,
  size = 16,
  strokeWidth = 2,
  className = "",
  style,
  ...rest
}) {
  const markup = pictos[name];
  if (!markup) {
    if (typeof console !== "undefined") {
      console.warn(`[Picto] unknown picto name: "${name}"`);
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
