import * as React from "react";
import { GridPickerGroup } from "./GridPicker";

export type ColorSwatch = string | { value: string; label?: string };

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Swatch colors — hex strings or `{ value, label }`. Ignored when `groups` is set. */
  colors?: ColorSwatch[];
  /** Categorized palettes (GridPicker groups, each item a color). */
  groups?: GridPickerGroup[];
  /** Controlled selected color (hex). */
  value?: string;
  /** Initial color when uncontrolled. */
  defaultValue?: string;
  /** Fires with the picked hex. */
  onChange?: (value: string) => void;
  /** Grid columns. Default 5. */
  columns?: number;
  /** Swatch diameter in px. Default 34. */
  swatchSize?: number;
  /** GridPicker frame variant. Default "clear" (flush, no border). */
  variant?: "solid" | "clear";
}

/** ColorPicker — pick one color from a swatch grid (built on GridPicker). */
export declare function ColorPicker(props: ColorPickerProps): JSX.Element;
export declare const DEFAULT_SWATCHES: string[];
