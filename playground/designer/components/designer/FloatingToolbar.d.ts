/**
 * FloatingToolbar — blurred floating pill over the canvas (whiteboard/slides).
 * Parent must be position:relative (Canvas already is).
 */
export interface FloatingToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 'bottom' */
  position?: 'bottom' | 'top';
  children: React.ReactNode;
}
