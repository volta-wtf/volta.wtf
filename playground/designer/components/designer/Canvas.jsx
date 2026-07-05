import React from 'react';

const clampZoom = (z) => Math.min(8, Math.max(0.1, z));

/**
 * Canvas — infinite pan/zoom surface with dot grid.
 * Wheel = pan · ⌘/ctrl+wheel (or pinch) = zoom to cursor · drag background = pan.
 * Semi-controlled: pass `view` + `onViewChange`, or let it own its state.
 */
export function Canvas({
  view, defaultView = { zoom: 1, x: 0, y: 0 }, onViewChange,
  grid = true, gridSize = 16, panOnDrag = true,
  onBackgroundPointerDown, hud,
  className = '', style, children, ...rest
}) {
  const controlled = view !== undefined;
  const [inner, setInner] = React.useState(defaultView);
  const v = controlled ? view : inner;
  const vRef = React.useRef(v);
  vRef.current = v;
  const [panning, setPanning] = React.useState(false);
  const ref = React.useRef(null);

  const set = (next) => {
    if (!controlled) setInner(next);
    if (onViewChange) onViewChange(next);
  };
  const setRef = React.useRef(set);
  setRef.current = set;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const cur = vRef.current;
      if (e.ctrlKey || e.metaKey) {
        const rect = el.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const zoom = clampZoom(cur.zoom * Math.exp(-e.deltaY * 0.0018));
        const k = zoom / cur.zoom;
        setRef.current({ zoom, x: px - (px - cur.x) * k, y: py - (py - cur.y) * k });
      } else {
        setRef.current({ ...cur, x: cur.x - e.deltaX, y: cur.y - e.deltaY });
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const startPan = (e) => {
    if (onBackgroundPointerDown) onBackgroundPointerDown(e);
    if (!panOnDrag || (e.button !== 0 && e.button !== 1)) return;
    const start = vRef.current;
    const sx = e.clientX;
    const sy = e.clientY;
    setPanning(true);
    const move = (ev) => setRef.current({ ...vRef.current, x: start.x + ev.clientX - sx, y: start.y + ev.clientY - sy });
    const up = () => {
      setPanning(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const cls = [
    'dsr-canvas',
    grid ? '' : 'dsr-canvas--no-grid',
    panning ? 'dsr-canvas--panning' : '',
    className,
  ].filter(Boolean).join(' ');

  const gridStyle = grid ? {
    backgroundSize: `${gridSize * v.zoom}px ${gridSize * v.zoom}px`,
    backgroundPosition: `${v.x}px ${v.y}px`,
  } : null;

  return (
    <div ref={ref} className={cls} style={{ ...gridStyle, ...style }} onPointerDown={startPan} {...rest}>
      <div className="dsr-canvas__world" style={{ transform: `translate(${v.x}px, ${v.y}px) scale(${v.zoom})` }}>
        {children}
      </div>
      {hud}
    </div>
  );
}
