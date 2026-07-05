/**
 * BoundField — chip showing "this property is data-bound".
 */
export interface BoundFieldProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Collection id, e.g. "products". */
  collection?: string;
  /** Field key, e.g. "title". */
  field: string;
  /** Renders the × affordance. */
  onUnbind?: () => void;
}
