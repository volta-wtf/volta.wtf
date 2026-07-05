/**
 * Icon — role-based glyph component. The only way icons enter the UI.
 * Requires the lucide UMD script (lucide@0.525.0) on the page.
 */
export interface IconProps {
  /** Semantic role from the registry ("visible", "select", "field-number", …) or a raw Lucide PascalCase name. */
  name: string;
  /** Square size in px. 16 chrome default · 14 dense rows · 12 micro. @default 16 */
  size?: number;
  /** Stroke width. Defaults to 1.5, or 2 when size ≤ 12. */
  strokeWidth?: number;
  /** Accessible label; omit for decorative icons (aria-hidden). */
  title?: string;
  style?: React.CSSProperties;
  className?: string;
}
