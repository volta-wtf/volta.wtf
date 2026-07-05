import * as React from "react";
/**
 * Slider — range input, faithful to shadcn/ui + Radix. Single-thumb by
 * default; pass a two-element array value for a two-thumb range (Geist range).
 */
export interface SliderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange"> {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  /** Force two-thumb range mode (implied when value/defaultValue is an array). */
  range?: boolean;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number | [number, number]) => void;
}
export function Slider(props: SliderProps): JSX.Element;
