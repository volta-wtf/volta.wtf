/**
 * ActionOpacity — opacity slider + exact % field (0–100).
 */
export interface ActionOpacityProps {
  value?: number;
  /** @default 100 */
  defaultValue?: number;
  onChange?: (opacity: number) => void;
  className?: string;
  style?: React.CSSProperties;
}
