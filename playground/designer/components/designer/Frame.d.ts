/**
 * Frame — artboard on the Canvas: label, selection outline, move + resize.
 */
export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  /** Label above the frame (muted; selection-blue when selected). */
  name?: React.ReactNode;
  selected?: boolean;
  /** Current canvas zoom — keeps drag deltas accurate. @default 1 */
  zoom?: number;
  /** Clip children to bounds. @default true */
  clip?: boolean;
  /** Frame fill; defaults to --frame token. */
  fill?: string;
  onSelect?: (e: React.PointerEvent) => void;
  /** Enables dragging. Receives the next {x, y}. */
  onMove?: (next: { x: number; y: number }) => void;
  /** Enables corner handles. Receives the next box. */
  onResize?: (next: { x: number; y: number; width: number; height: number }) => void;
  children?: React.ReactNode;
}
