import React from 'react';

/** Panel — docked side panel: optional header, scrollable body, optional footer. */
export function Panel({ side = 'left', header, footer, width, className = '', style, children, ...rest }) {
  const s = width ? { ...style, width, minWidth: width } : style;
  return (
    <aside className={`dsr-panel dsr-panel--${side} ${className}`.trim()} style={s} {...rest}>
      {header ? <div className="dsr-panel__header">{header}</div> : null}
      <div className="dsr-panel__body">{children}</div>
      {footer ? <div className="dsr-panel__footer">{footer}</div> : null}
    </aside>
  );
}
