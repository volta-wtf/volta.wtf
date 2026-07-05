import React from 'react';
import { IconButton } from './IconButton.jsx';

/** Dialog — modal over the app shell (absolute overlay, Esc/backdrop close). */
export function Dialog({ open = false, title, description, footer, onClose, className = '', children, ...rest }) {
  React.useEffect(() => {
    if (!open || !onClose) return undefined;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="dsr-dialog-overlay" onPointerDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div className={`dsr-dialog ${className}`.trim()} role="dialog" aria-modal="true" {...rest}>
        <div className="dsr-dialog__header">
          <div>
            {title ? <h2 className="dsr-dialog__title">{title}</h2> : null}
            {description ? <p className="dsr-dialog__desc">{description}</p> : null}
          </div>
          {onClose ? <IconButton name="close" label="Close" size="sm" tooltip={false} onClick={onClose} /> : null}
        </div>
        <div className="dsr-dialog__body">{children}</div>
        {footer ? <div className="dsr-dialog__footer">{footer}</div> : null}
      </div>
    </div>
  );
}
