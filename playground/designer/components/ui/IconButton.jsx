import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/** IconButton — square icon-only control. `label` is mandatory (a11y + tooltip). */
export function IconButton({ name, label, size = 'md', inverse = false, active = false, tooltip = true, className = '', ...rest }) {
  const cls = [
    'dsr-iconbtn',
    size !== 'md' ? `dsr-iconbtn--${size}` : '',
    inverse ? 'dsr-iconbtn--inverse' : '',
    active ? 'is-active' : '',
    tooltip && label ? 'dsr-tooltip-host' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button
      type="button"
      className={cls}
      aria-label={label}
      aria-pressed={active || undefined}
      data-tooltip={tooltip && label ? label : undefined}
      {...rest}
    >
      <Icon name={name} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
    </button>
  );
}
