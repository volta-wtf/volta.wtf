import React from 'react';

/** Button — the standard action control. Variants map 1:1 to .dsr-btn--* classes. */
export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const sizeCls = size === 'md' ? '' : ` dsr-btn--${size}`;
  return (
    <button type="button" className={`dsr-btn dsr-btn--${variant}${sizeCls} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
