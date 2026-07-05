import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/** Select — styled native select. `options`: strings or {value, label}. */
export function Select({ options = [], size = 'md', quiet = false, className = '', ...rest }) {
  const cls = [
    'dsr-select',
    size !== 'md' ? `dsr-select--${size}` : '',
    quiet ? 'dsr-select--quiet' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <select className="dsr-select__native" {...rest}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
      <Icon name="chevrons-updown" size={12} className="dsr-select__chevron" />
    </span>
  );
}
