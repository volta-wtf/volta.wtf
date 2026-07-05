/**
 * LibraryItem — draggable/clickable insertable asset tile.
 */
export interface LibraryItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  /** Icon role fallback when no thumb. @default 'component' */
  icon?: string;
  /** Custom thumbnail node (shape path, gradient swatch, mini render). */
  thumb?: React.ReactNode;
  onInsert?: () => void;
}
