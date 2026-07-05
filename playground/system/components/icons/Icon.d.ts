import * as React from "react";

/**
 * Icon — renders a single glyph from the design-system's Lucide-based
 * registry (Pictos + Icons + Context layers).
 *
 */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Registry name, e.g. "check", "customer", "play". */
  name: string;
  /** Pixel size (width = height). Default 16. */
  size?: number;
  /** Stroke width on the 24px canvas. Default 2. */
  strokeWidth?: number;
  className?: string;
}

export function Icon(props: IconProps): JSX.Element | null;
