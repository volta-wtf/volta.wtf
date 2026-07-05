/**
 * Canvas — infinite pan/zoom surface. Children live in world coordinates.
 */
export interface CanvasView { zoom: number; x: number; y: number; }

export interface CanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled view; omit to let Canvas own it. */
  view?: CanvasView;
  /** @default { zoom: 1, x: 0, y: 0 } */
  defaultView?: CanvasView;
  onViewChange?: (view: CanvasView) => void;
  /** Dot grid on/off. @default true */
  grid?: boolean;
  /** Grid pitch in world px. @default 16 */
  gridSize?: number;
  /** Drag empty canvas to pan. @default true */
  panOnDrag?: boolean;
  /** Fires on background pointerdown (deselect, marquee start). */
  onBackgroundPointerDown?: (e: React.PointerEvent) => void;
  /** HUD chrome (ZoomControls, FloatingToolbar) — rendered UNtransformed,
   *  anchored to the canvas box, not the panned/zoomed world. */
  hud?: React.ReactNode;
  /** Frames and other world-coordinate children. */
  children?: React.ReactNode;
}
