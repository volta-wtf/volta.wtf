import React from 'react';
import { NumberField } from './NumberField.jsx';

/** PositionField — paired NumberFields: X/Y, W/H, etc. */
export function PositionField({
  labels = ['X', 'Y'], values = [0, 0], onChange,
  units, step = 1, min, max, className = '', style,
}) {
  const update = (idx, n) => {
    const next = [...values];
    next[idx] = n;
    if (onChange) onChange(next);
  };
  return (
    <div className={`dsr-posfield ${className}`.trim()} style={style}>
      <NumberField label={labels[0]} value={values[0]} unit={units && units[0]} step={step} min={min} max={max} onChange={(n) => update(0, n)} />
      <NumberField label={labels[1]} value={values[1]} unit={units && units[1]} step={step} min={min} max={max} onChange={(n) => update(1, n)} />
    </div>
  );
}
