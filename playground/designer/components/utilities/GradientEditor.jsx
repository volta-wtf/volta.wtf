import React from 'react';
import { ColorField } from '../fields/ColorField.jsx';
import { NumberField } from '../fields/NumberField.jsx';
import { SelectField } from '../fields/SelectField.jsx';
import { IconButton } from '../ui/IconButton.jsx';
import { Button } from '../ui/Button.jsx';

/** Serialize a gradient value ({type, angle, stops}) to CSS. */
export function GradientCss(g) {
  const stops = g.stops.map((s) => `${s.color} ${s.position}%`).join(', ');
  if (g.type === 'radial') return `radial-gradient(circle, ${stops})`;
  if (g.type === 'conic') return `conic-gradient(from ${g.angle || 0}deg, ${stops})`;
  return `linear-gradient(${g.angle != null ? g.angle : 135}deg, ${stops})`;
}

/** GradientEditor — micro-tool: type, angle, stops, presets, CSS out. */
export function GradientEditor({ value, defaultValue, onChange, presets = [], className = '', style }) {
  const [inner, setInner] = React.useState(defaultValue || {
    type: 'linear', angle: 135,
    stops: [{ color: '#d97757', position: 0 }, { color: '#4864c8', position: 100 }],
  });
  const g = value !== undefined ? value : inner;
  const set = (next) => {
    if (value === undefined) setInner(next);
    if (onChange) onChange(next);
  };
  const patchStop = (i, patch) => {
    const stops = g.stops.map((s, j) => (j === i ? { ...s, ...patch } : s));
    set({ ...g, stops });
  };
  const css = GradientCss(g);
  return (
    <div className={`dsr-gradient ${className}`.trim()} style={style}>
      <div className="dsr-gradient__preview" style={{ background: css }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        <SelectField label="Type" options={['linear', 'radial', 'conic']} value={g.type} onChange={(e) => set({ ...g, type: e.target.value })} />
        <NumberField icon="rotate" unit="deg" value={g.angle || 0} min={0} max={360} step={5} onChange={(angle) => set({ ...g, angle })} title="Angle" />
      </div>
      <div className="dsr-gradient__stops">
        {g.stops.map((s, i) => (
          <div key={i} className="dsr-gradient__stop">
            <ColorField value={s.color} onChange={(color) => patchStop(i, { color })} />
            <NumberField unit="%" value={s.position} min={0} max={100} onChange={(position) => patchStop(i, { position })} title="Stop position" />
            <IconButton
              size="sm" name="remove" label="Remove stop" tooltip={false}
              disabled={g.stops.length <= 2}
              onClick={() => set({ ...g, stops: g.stops.filter((_, j) => j !== i) })}
            />
          </div>
        ))}
        <Button size="sm" variant="ghost" style={{ alignSelf: 'flex-start' }}
          onClick={() => set({ ...g, stops: [...g.stops, { color: '#888888', position: 50 }] })}>
          Add stop
        </Button>
      </div>
      <div className="dsr-gradient__css" title="Click to copy" onClick={() => { try { navigator.clipboard.writeText(css); } catch (e) { /* noop */ } }}>
        {css}
      </div>
      {presets.length ? (
        <div className="dsr-gradient__presets">
          {presets.map((p) => (
            <button key={p.id} type="button" className="dsr-gradient__preset" title={p.name}
              style={{ background: GradientCss(p) }} onClick={() => set({ type: p.type, angle: p.angle, stops: p.stops })} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
