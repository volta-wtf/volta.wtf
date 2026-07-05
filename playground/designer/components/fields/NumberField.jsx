import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * NumberField — the unit system in one control.
 * Affix (label/icon) is scrubbable (drag ←→); ↑/↓ steps, ⇧ steps ×10.
 */
export function NumberField({
  label, icon, unit, value, defaultValue = 0, onChange,
  min, max, step = 1, title, className = '', style,
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const [text, setText] = React.useState(null); // transient edit buffer
  const val = controlled ? value : inner;

  const set = (n) => {
    let next = n;
    if (min != null) next = Math.max(min, next);
    if (max != null) next = Math.min(max, next);
    next = round2(next);
    if (!controlled) setInner(next);
    if (onChange) onChange(next);
  };

  const commit = (t) => {
    const n = parseFloat(t);
    if (!Number.isNaN(n)) set(n);
    setText(null);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const d = (e.key === 'ArrowUp' ? 1 : -1) * (e.shiftKey ? step * 10 : step);
      const cur = text != null ? parseFloat(text) || 0 : Number(val) || 0;
      set(cur + d);
      setText(null);
    } else if (e.key === 'Enter') {
      commit(e.currentTarget.value);
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setText(null);
      e.currentTarget.blur();
    }
  };

  const onScrub = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const start = Number(val) || 0;
    const move = (ev) => set(start + Math.round((ev.clientX - startX) / 2) * step);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div className={`dsr-numfield ${className}`.trim()} style={style}>
      {(icon || label) ? (
        <span className="dsr-numfield__affix" onPointerDown={onScrub} title={title || 'Drag to adjust'}>
          {icon ? <Icon name={icon} size={12} /> : label}
        </span>
      ) : <span style={{ width: 6 }} />}
      <input
        className="dsr-numfield__input"
        type="text"
        inputMode="decimal"
        value={text != null ? text : String(val)}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label={title || (typeof label === 'string' ? label : 'Value')}
      />
      {unit ? <span className="dsr-numfield__unit">{unit}</span> : null}
    </div>
  );
}
