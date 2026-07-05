import React from 'react';

/** FloatingToolbar — blurred pill floating over the canvas, bottom-center. */
export function FloatingToolbar({ position = 'bottom', className = '', children, ...rest }) {
  return (
    <div
      role="toolbar"
      className={`dsr-floatbar ${position === 'top' ? 'dsr-floatbar--top' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
