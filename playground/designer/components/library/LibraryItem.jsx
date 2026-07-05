import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/** LibraryItem — one insertable asset (component, shape, block). */
export function LibraryItem({ name, icon, thumb, onInsert, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`dsr-libitem ${className}`.trim()}
      draggable
      title={`Insert ${name}`}
      onClick={onInsert}
      onDragStart={(e) => { try { e.dataTransfer.setData('text/plain', String(name)); } catch (err) { /* noop */ } }}
      {...rest}
    >
      <span className="dsr-libitem__thumb">
        {thumb || <Icon name={icon || 'component'} size={18} />}
      </span>
      <span className="dsr-libitem__name">{name}</span>
    </button>
  );
}
