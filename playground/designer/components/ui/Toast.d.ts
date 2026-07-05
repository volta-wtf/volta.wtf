/**
 * Toast — inverse feedback capsule; terse, factual copy.
 */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon role. @default 'check' */
  icon?: string | null;
  /** @default 'default' */
  variant?: 'default' | 'destructive';
  /** Inline action label ("Undo"). */
  action?: React.ReactNode;
  onAction?: () => void;
  children: React.ReactNode;
}
