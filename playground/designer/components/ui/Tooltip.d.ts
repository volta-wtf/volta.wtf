/**
 * Tooltip — CSS-only hover/focus label, 350ms delay, no portal.
 */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tooltip text. Include the shortcut when there is one: "Select — V". */
  label: string;
  /** @default 'top' */
  side?: 'top' | 'bottom';
  children: React.ReactNode;
}
