import React from 'react';
import { Switch } from '../ui/Switch.jsx';
import { Icon } from '../icons/Icon.jsx';

let uid = 0;

const renderPrimitive = (p, i) =>
  React.createElement(
    p.tag,
    { key: i, ...p.attrs },
    Array.isArray(p.children) ? p.children.map(renderPrimitive) : undefined
  );

/**
 * FilterStack — the SVG-filter plugin pattern: presets are DATA
 * (data/filters.json primitives), rendered into real <filter> defs and
 * applied to the preview (and to anything you point `target` CSS at).
 */
export function FilterStack({ presets = [], enabledIds, onToggle, preview, className = '', style }) {
  const idBase = React.useMemo(() => `dsrfx-${++uid}`, []);
  const [innerOn, setInnerOn] = React.useState(() => new Set(presets.slice(0, 1).map((p) => p.id)));
  const on = enabledIds ? new Set(enabledIds) : innerOn;
  const toggle = (id) => {
    if (onToggle) { onToggle(id); return; }
    setInnerOn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const active = presets.filter((p) => on.has(p.id));
  const filterCss = active.map((p) => `url(#${idBase}-${p.id})`).join(' ') || 'none';

  return (
    <div className={`dsr-filterstack ${className}`.trim()} style={style}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          {presets.map((p) => (
            <filter key={p.id} id={`${idBase}-${p.id}`} x="-30%" y="-30%" width="160%" height="160%">
              {p.primitives.map(renderPrimitive)}
            </filter>
          ))}
        </defs>
      </svg>
      <div className="dsr-filterstack__preview">
        <div style={{ filter: filterCss, display: 'flex', alignItems: 'center', gap: 12 }}>
          {preview || (
            <React.Fragment>
              <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--brand)' }}></span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 34, color: 'var(--foreground)' }}>Ag</span>
              <span style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--selection)' }}></span>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="dsr-filterstack__rows">
        {presets.map((p) => (
          <div key={p.id} className={`dsr-filterstack__row${on.has(p.id) ? '' : ' is-off'}`}>
            <span className="dsr-filterstack__icon"><Icon name={on.has(p.id) ? 'effects' : 'adjust'} size={14} /></span>
            <span className="dsr-filterstack__name">{p.name}</span>
            <Switch checked={on.has(p.id)} onChange={() => toggle(p.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
