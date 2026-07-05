import * as React from "react";
/** Choicebox — selectable card option (Geist). */
export interface ChoiceboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  value?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  type?: "radio" | "checkbox" | "switch";
  name?: string;
  onChange?: (checked: boolean, value?: string) => void;
}
export function Choicebox(props: ChoiceboxProps): JSX.Element;

export interface ChoiceboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: "radio" | "checkbox" | "switch";
  name?: string;
  /** Number of grid columns. */
  columns?: number;
}
export function ChoiceboxGroup(props: ChoiceboxGroupProps): JSX.Element;
