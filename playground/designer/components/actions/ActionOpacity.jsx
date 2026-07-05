import React from 'react';
import { Slider } from '../ui/Slider.jsx';
import { NumberField } from '../fields/NumberField.jsx';

/** ActionOpacity — opacity action: slider + exact %. */
export function ActionOpacity({ value, defaultValue = 100, onChange, className = '', style }) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const op = controlled ? value : inner;
  const set = (n) => {
    const c = Math.max(0, Math.min(100, n));
    if (!controlled) setInner(c);
    if (onChange) onChange(c);
  };
  return (
    <div className={className} style={{ display: 'grid', gridTemplateColumns: '1fr 76px', gap: 8, alignItems: 'center', ...style }}>
      <Slider min={0} max={100} value={op} onChange={(e) => set(Number(e.target.value))} aria-label="Opacity" />
      <NumberField icon="opacity" unit="%" value={op} min={0} max={100} onChange={set} title="Opacity" />
    </div>
  );
}
