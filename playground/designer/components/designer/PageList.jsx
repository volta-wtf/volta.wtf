import React from 'react';

/** PageList — document pages (above the layer tree). */
export function PageList({ pages = [], selectedId, onSelect, className = '', ...rest }) {
  return (
    <div className={`dsr-pagelist ${className}`.trim()} {...rest}>
      {pages.map((p) => (
        <div
          key={p.id}
          className={`dsr-page-row${selectedId === p.id ? ' is-selected' : ''}`}
          onClick={() => onSelect && onSelect(p.id)}
        >
          <span className="dsr-page-row__dot"></span>
          <span>{p.name}</span>
        </div>
      ))}
    </div>
  );
}
