import React from 'react';
import { NumberField } from '../fields/NumberField.jsx';
import { IconButton } from '../ui/IconButton.jsx';

/** ActionRotate — rotation action: scrubbable degrees + quick turns/flips. */
export function ActionRotate({ value, defaultValue = 0, onChange, onFlipH, onFlipV, className = '', style }) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const deg = controlled ? value : inner;
  const set = (n) => {
    const norm = ((n % 360) + 540) % 360 - 180; // wrap to −180…180
    if (!controlled) setInner(norm);
    if (onChange) onChange(norm);
  };
  return (
    <div className={className} style={{ display: 'flex', gap: 4, alignItems: 'center', ...style }}>
      <NumberField icon="rotate" unit="deg" value={deg} min={-180} max={180} onChange={set} title="Rotation" style={{ flex: 1 }} />
      <IconButton size="sm" name="redo" label="Rotate 90° cw" onClick={() => set(deg + 90)} />
      <IconButton size="sm" name="flip-h" label="Flip horizontal" onClick={onFlipH} disabled={!onFlipH} />
      <IconButton size="sm" name="flip-v" label="Flip vertical" onClick={onFlipV} disabled={!onFlipV} />
    </div>
  );
}
