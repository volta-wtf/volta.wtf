/**
 * PositionField — two NumberFields side by side (X/Y, W/H).
 */
export interface PositionFieldProps {
  /** Affix glyphs. @default ['X','Y'] */
  labels?: [React.ReactNode, React.ReactNode];
  /** Controlled pair. @default [0,0] */
  values?: [number, number];
  onChange?: (values: [number, number]) => void;
  /** Unit per cell, e.g. ['px','px']. */
  units?: [string?, string?];
  step?: number;
  min?: number;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}
