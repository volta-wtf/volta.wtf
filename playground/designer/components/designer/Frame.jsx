import React from 'react';

/**
 * Frame — an artboard in canvas world coordinates.
 * Click selects · drag moves (if onMove) · corner handles resize (if onResize).
 * Pass `zoom` so move/resize deltas stay correct at any zoom level.
 */
export function Frame({
  x = 0, y = 0, width = 320, height = 240,
  name, selected = false, zoom = 1, clip = true, fill,
  onSelect, onMove, onResize,
  className = '', style, children, ...rest
}) {
  const startMove = (e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    if (onSelect) onSelect(e);
    if (!onMove) return;
    const sx = e.clientX;
    const sy = e.clientY;
    let moved = false;
    const move = (ev) => {
      const dx = (ev.clientX - sx) / zoom;
      const dy = (ev.clientY - sy) / zoom;
      if (!moved && Math.abs(dx) < 2 && Math.abs(dy) < 2) return;
      moved = true;
      onMove({ x: Math.round(x + dx), y: Math.round(y + dy) });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const startResize = (corner) => (e) => {
    if (e.button !== 0 || !onResize) return;
    e.stopPropagation();
    e.preventDefault();
    const sx = e.clientX;
    const sy = e.clientY;
    const move = (ev) => {
      const dx = (ev.clientX - sx) / zoom;
      const dy = (ev.clientY - sy) / zoom;
      let nx = x, ny = y, nw = width, nh = height;
      if (corner.includes('e')) nw = width + dx;
      if (corner.includes('s')) nh = height + dy;
      if (corner.includes('w')) { nw = width - dx; nx = x + dx; }
      if (corner.includes('n')) { nh = height - dy; ny = y + dy; }
      if (nw >= 8 && nh >= 8) onResize({ x: Math.round(nx), y: Math.round(ny), width: Math.round(nw), height: Math.round(nh) });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div
      data-canvas-item
      className={`dsr-frame ${selected ? 'is-selected' : ''} ${clip ? '' : 'dsr-frame--no-clip'} ${className}`.trim()}
      style={{ left: x, top: y, width, height, background: fill, ...style }}
      onPointerDown={startMove}
      {...rest}
    >
      {name ? <div className="dsr-frame__label">{name}</div> : null}
      <div className="dsr-frame__content">{children}</div>
      {selected ? (
        <React.Fragment>
          <span className="dsr-frame__handle dsr-frame__handle--nw" onPointerDown={startResize('nw')} />
          <span className="dsr-frame__handle dsr-frame__handle--ne" onPointerDown={startResize('ne')} />
          <span className="dsr-frame__handle dsr-frame__handle--sw" onPointerDown={startResize('sw')} />
          <span className="dsr-frame__handle dsr-frame__handle--se" onPointerDown={startResize('se')} />
        </React.Fragment>
      ) : null}
    </div>
  );
}
