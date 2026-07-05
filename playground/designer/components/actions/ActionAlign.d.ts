/**
 * ActionAlign — alignment/distribution row (6 aligns + 2 distributes).
 */
export type AlignType =
  | 'align-left' | 'align-center-h' | 'align-right'
  | 'align-top' | 'align-center-v' | 'align-bottom'
  | 'distribute-h' | 'distribute-v';

export interface ActionAlignProps {
  onAlign?: (type: AlignType) => void;
  /** Show the distribute pair. @default true */
  distribute?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
