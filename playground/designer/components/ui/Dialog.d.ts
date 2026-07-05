/**
 * Dialog — modal: header (title/description), body, footer actions.
 */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Right-aligned actions (Buttons). */
  footer?: React.ReactNode;
  /** Enables ×, Esc and backdrop close. */
  onClose?: () => void;
  children?: React.ReactNode;
}
