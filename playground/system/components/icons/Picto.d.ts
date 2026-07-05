import * as React from "react";

/**
 * Picto — renders a raw Lucide glyph from the base library (pictosData.js)
 * by its canonical Lucide name.
 */
export interface PictoProps extends React.SVGAttributes<SVGSVGElement> {
  /** Canonical Lucide name, e.g. "x", "arrow-left", "trash-2". */
  name: string;
  /** Pixel size (width = height). Default 16. */
  size?: number;
  /** Stroke width on the 24px canvas. Default 2. */
  strokeWidth?: number;
  className?: string;
}

export function Picto(props: PictoProps): JSX.Element | null;
