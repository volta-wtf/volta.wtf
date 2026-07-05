import React from 'react';

/** Badge — small status/count chip. */
export function Badge({ variant = 'secondary', className = '', children, ...rest }) {
  return (
    <span className={`dsr-badge dsr-badge--${variant} ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
}
