import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/** CollectionList — the collections index (data/collections.json entries). */
export function CollectionList({ collections = [], selectedId, onSelect, className = '', ...rest }) {
  return (
    <div className={`dsr-collections ${className}`.trim()} {...rest}>
      {collections.map((c) => (
        <div
          key={c.id}
          className={`dsr-collection-row${selectedId === c.id ? ' is-selected' : ''}`}
          onClick={() => onSelect && onSelect(c.id)}
        >
          <span className="dsr-collection-row__icon"><Icon name={c.icon || 'collection'} size={14} /></span>
          <span className="dsr-collection-row__name">{c.name}</span>
          <span className="dsr-collection-row__count">{c.count != null ? c.count : (c.records || []).length}</span>
        </div>
      ))}
    </div>
  );
}
