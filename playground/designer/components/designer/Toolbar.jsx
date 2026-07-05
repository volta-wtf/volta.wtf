import React from 'react';

/** Toolbar — docked strip of IconButtons; separate groups with <Separator>. */
export function Toolbar({ orientation = 'horizontal', className = '', children, ...rest }) {
  return (
    <div role="toolbar" aria-orientation={orientation} className={`dsr-toolbar dsr-toolbar--${orientation} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
