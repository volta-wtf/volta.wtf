/**
 * ActionFill — fill color action with quick swatches.
 */
export interface ActionFillProps {
  value?: string;
  /** @default '#1a1a1a' */
  defaultValue?: string;
  onChange?: (hex: string) => void;
  alpha?: number;
  onAlphaChange?: (alpha: number) => void;
  /** Quick-pick row. */
  swatches?: string[];
  className?: string;
  style?: React.CSSProperties;
}
