/**
 * ColorField — swatch + hex + optional alpha %.
 */
export interface ColorFieldProps {
  /** Controlled hex value (#rgb or #rrggbb). */
  value?: string;
  /** @default '#1a1a1a' */
  defaultValue?: string;
  onChange?: (hex: string) => void;
  /** Alpha 0–100; rendering the alpha cell is opt-in by passing it. */
  alpha?: number;
  onAlphaChange?: (alpha: number) => void;
  className?: string;
  style?: React.CSSProperties;
}
