import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/** BoundField — selection-blue chip marking a property bound to data. */
export function BoundField({ collection, field, onUnbind, className = '', ...rest }) {
  return (
    <span className={`dsr-bound ${className}`.trim()} title={`Bound to ${collection}.${field}`} {...rest}>
      <Icon name="bind" size={11} />
      {collection ? `${collection}.` : ''}{field}
      {onUnbind ? (
        <button type="button" className="dsr-bound__unbind" aria-label="Unbind" onClick={onUnbind}>
          <Icon name="close" size={11} />
        </button>
      ) : null}
    </span>
  );
}
