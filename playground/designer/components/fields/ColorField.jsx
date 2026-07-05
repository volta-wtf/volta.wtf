import React from 'react';

const isHex = (s) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s);

/** ColorField — swatch (native picker) + hex text + optional alpha %. */
export function ColorField({
  value, defaultValue = '#1a1a1a', onChange,
  alpha, onAlphaChange, className = '', style,
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const [text, setText] = React.useState(null);
  const val = controlled ? value : inner;

  const set = (c) => {
    if (!controlled) setInner(c);
    if (onChange) onChange(c);
  };
  const commit = (t) => {
    let c = t.trim().toLowerCase();
    if (c && c[0] !== '#') c = '#' + c;
    if (isHex(c)) set(c);
    setText(null);
  };

  return (
    <div className={`dsr-colorfield ${className}`.trim()} style={style}>
      <span className="dsr-colorfield__swatch" style={{ background: val }}>
        <input
          type="color"
          value={isHex(val) ? val : '#000000'}
          onChange={(e) => set(e.target.value)}
          aria-label="Pick color"
        />
      </span>
      <input
        className="dsr-colorfield__hex"
        type="text"
        spellCheck={false}
        value={text != null ? text : val}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { commit(e.currentTarget.value); e.currentTarget.blur(); } }}
        aria-label="Hex color"
      />
      {alpha !== undefined ? (
        <input
          className="dsr-colorfield__alpha"
          type="text"
          inputMode="numeric"
          value={`${alpha}%`}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (!Number.isNaN(n) && onAlphaChange) onAlphaChange(Math.max(0, Math.min(100, n)));
          }}
          aria-label="Opacity"
        />
      ) : null}
    </div>
  );
}
