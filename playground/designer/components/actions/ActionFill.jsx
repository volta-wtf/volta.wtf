import React from 'react';
import { ColorField } from '../fields/ColorField.jsx';

const SWATCHES = ['#1a1a1a', '#ffffff', '#d97757', '#4864c8', '#3d8a5f', '#c8b64a'];

/** ActionFill — fill property action: color + quick swatches. */
export function ActionFill({ value, defaultValue = '#1a1a1a', onChange, alpha, onAlphaChange, swatches = SWATCHES, className = '', style }) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const val = controlled ? value : inner;
  const set = (c) => {
    if (!controlled) setInner(c);
    if (onChange) onChange(c);
  };
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <ColorField value={val} onChange={set} alpha={alpha} onAlphaChange={onAlphaChange} />
      <div style={{ display: 'flex', gap: 4 }}>
        {swatches.map((c) => (
          <button
            key={c}
            type="button"
            title={c}
            onClick={() => set(c)}
            style={{
              width: 18, height: 18, padding: 0, cursor: 'pointer',
              borderRadius: 4, border: 'none', background: c,
              boxShadow: val === c
                ? '0 0 0 1.5px var(--background), 0 0 0 3px var(--selection)'
                : 'inset 0 0 0 1px oklch(0 0 0 / 0.12)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
