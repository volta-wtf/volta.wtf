import * as React from "react";
/**
 * ThemeSwitcher — segmented light / system / dark control (Geist style).
 * Uncontrolled by default (persists to localStorage `theme` and toggles `.dark`
 * on <html>); pass `value` + `onValueChange` to control.
 */
export interface ThemeSwitcherProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: "light" | "system" | "dark";
  defaultValue?: "light" | "system" | "dark";
  onValueChange?: (value: "light" | "system" | "dark") => void;
  /** Show text labels beside the icons. */
  showLabels?: boolean;
}
export function ThemeSwitcher(props: ThemeSwitcherProps): JSX.Element;
