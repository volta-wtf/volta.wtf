/**
 * Badge — 18px status/count chip.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** brand = terracotta (editorial); selection = canvas-blue (bindings). @default 'secondary' */
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'brand' | 'selection';
  children?: React.ReactNode;
}
