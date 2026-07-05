/**
 * Panel — docked side panel (264px default), border toward the canvas.
 */
export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Border side follows: left panel → border-right. @default 'left' */
  side?: 'left' | 'right';
  /** Header row (36px min): tabs, search, title + actions. */
  header?: React.ReactNode;
  /** Pinned footer (add buttons, totals). */
  footer?: React.ReactNode;
  /** Override --panel-width for this instance. */
  width?: number | string;
  children?: React.ReactNode;
}
