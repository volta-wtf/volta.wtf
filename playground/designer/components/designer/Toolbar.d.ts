/**
 * Toolbar — docked tool strip.
 */
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** IconButtons + Separators. */
  children: React.ReactNode;
}
