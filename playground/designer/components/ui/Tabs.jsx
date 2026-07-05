import React from 'react';

/** Tabs — segmented control. Controlled: pass `value` + `onChange`. */
export function Tabs({ items = [], value, onChange, full = false, className = '', ...rest }) {
  return (
    <div role="tablist" className={`dsr-tabs ${full ? 'dsr-tabs--full' : ''} ${className}`.trim()} {...rest}>
      {items.map((it) => {
        const v = typeof it === 'object' ? it.value : it;
        const l = typeof it === 'object' ? it.label : it;
        const selected = v === value;
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`dsr-tabs__tab${selected ? ' is-selected' : ''}`}
            onClick={() => onChange && onChange(v)}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
