/**
 * ZoomControls — floating zoom HUD (bottom-right inside Canvas).
 */
import type { CanvasView } from './Canvas';

export interface ZoomControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  view: CanvasView;
  onViewChange: (view: CanvasView) => void;
  /** Renders the fit button when provided. */
  onFit?: () => void;
}
