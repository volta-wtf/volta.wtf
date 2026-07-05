import React from 'react';

/** Separator — 1px hairline, horizontal or vertical. */
export function Separator({ orientation = 'horizontal', className = '', ...rest }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`dsr-separator dsr-separator--${orientation} ${className}`.trim()}
      {...rest}
    />
  );
}
