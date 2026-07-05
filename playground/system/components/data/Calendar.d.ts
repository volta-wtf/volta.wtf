import * as React from "react";
/**
 * Calendar — month-grid date picker, faithful to shadcn/ui (react-day-picker).
 */
export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: Date | null;
  defaultSelected?: Date | null;
  onSelect?: (date: Date) => void;
  month?: Date;
  defaultMonth?: Date;
  disabled?: (date: Date) => boolean;
}
export function Calendar(props: CalendarProps): JSX.Element;
