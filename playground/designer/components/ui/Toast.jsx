import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/** Toast — one feedback capsule. Stack them inside <div className="dsr-toaststack">. */
export function Toast({ icon = 'check', variant = 'default', action, onAction, className = '', children, ...rest }) {
  return (
    <div className={`dsr-toast${variant !== 'default' ? ` dsr-toast--${variant}` : ''} ${className}`.trim()} role="status" {...rest}>
      {icon ? <span className="dsr-toast__icon"><Icon name={icon} size={14} /></span> : null}
      <span>{children}</span>
      {action ? (
        <button type="button" className="dsr-toast__action" onClick={onAction}>{action}</button>
      ) : null}
    </div>
  );
}
