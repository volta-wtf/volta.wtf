import React from 'react';

/** Tooltip — CSS-only label on hover/focus (350ms delay). Wraps its child. */
export function Tooltip({ label, side = 'top', className = '', children, ...rest }) {
  return (
    <span
      className={`dsr-tooltip-host ${className}`.trim()}
      data-tooltip={label}
      data-side={side === 'bottom' ? 'bottom' : undefined}
      style={{ display: 'inline-flex' }}
      {...rest}
    >
      {children}
    </span>
  );
}
