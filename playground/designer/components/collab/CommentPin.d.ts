/**
 * CommentPin — anchored comment marker with optional open thread bubble.
 */
export interface CommentPinProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Comment body (shown when open). */
  text?: React.ReactNode;
  /** e.g. "2h". */
  time?: string;
  x?: number;
  y?: number;
  open?: boolean;
  onClick?: () => void;
}
