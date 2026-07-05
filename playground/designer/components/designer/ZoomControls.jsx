import React from 'react';
import { IconButton } from '../ui/IconButton.jsx';

const clampZoom = (z) => Math.min(8, Math.max(0.1, z));

/** ZoomControls — floating zoom HUD. Click the % to reset to 100. */
export function ZoomControls({ view, onViewChange, onFit, className = '', ...rest }) {
  const zoomBy = (f) => onViewChange && onViewChange({ ...view, zoom: clampZoom(view.zoom * f) });
  return (
    <div className={`dsr-zoomhud ${className}`.trim()} {...rest}>
      <IconButton size="sm" name="zoom-out" label="Zoom out" onClick={() => zoomBy(1 / 1.25)} />
      <button
        type="button"
        className="dsr-zoomhud__value"
        title="Zoom to 100% — ⇧0"
        onClick={() => onViewChange && onViewChange({ ...view, zoom: 1 })}
      >
        {Math.round(view.zoom * 100)}%
      </button>
      <IconButton size="sm" name="zoom-in" label="Zoom in" onClick={() => zoomBy(1.25)} />
      {onFit ? <IconButton size="sm" name="zoom-fit" label="Zoom to fit — ⇧1" onClick={onFit} /> : null}
    </div>
  );
}
