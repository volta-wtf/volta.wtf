import * as React from "react";
/**
 * DatePicker — Calendar in a popover behind a trigger button, faithful to shadcn/ui.
 */
export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  width?: number;
}
export function DatePicker(props: DatePickerProps): JSX.Element;
