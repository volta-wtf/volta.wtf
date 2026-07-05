/**
 * CursorChip — multiplayer cursor with first-name tag.
 */
export interface CursorChipProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  x?: number;
  y?: number;
  /** Override the hashed presence color. */
  color?: string;
}
