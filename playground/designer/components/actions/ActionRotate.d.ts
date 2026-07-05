/**
 * ActionRotate — rotation with quick 90° turn and flips (wraps −180…180).
 */
export interface ActionRotateProps {
  value?: number;
  /** @default 0 */
  defaultValue?: number;
  onChange?: (deg: number) => void;
  onFlipH?: () => void;
  onFlipV?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
