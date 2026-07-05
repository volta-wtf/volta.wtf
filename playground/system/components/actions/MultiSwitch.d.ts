import * as React from "react";
/** MultiSwitch — segmented multi-option control (Geist). NOT a boolean switch. */
export interface MultiSwitchOption { label: React.ReactNode; value: string; icon?: string; }
export interface MultiSwitchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: (string | MultiSwitchOption)[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg";
}
export function MultiSwitch(props: MultiSwitchProps): JSX.Element;
