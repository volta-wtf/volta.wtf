import React from 'react';

/** Input — single-line text input. `quiet` = borderless muted fill (panel-dense). */
export function Input({ size = 'md', mono = false, quiet = false, className = '', ...rest }) {
  const cls = [
    'dsr-input',
    size !== 'md' ? `dsr-input--${size}` : '',
    mono ? 'dsr-input--mono' : '',
    quiet ? 'dsr-input--quiet' : '',
    className,
  ].filter(Boolean).join(' ');
  return <input className={cls} {...rest} />;
}
