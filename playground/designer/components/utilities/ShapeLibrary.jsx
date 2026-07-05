import React from 'react';
import { AssetGrid } from '../library/AssetGrid.jsx';
import { LibraryItem } from '../library/LibraryItem.jsx';

/** ShapeLibrary — insertable generic geometry (data/shapes.json). */
export function ShapeLibrary({ shapes = [], onInsert, title = 'Shapes', className = '', ...rest }) {
  return (
    <AssetGrid title={title} count={shapes.length} className={className} {...rest}>
      {shapes.map((s) => (
        <LibraryItem
          key={s.id}
          name={s.name}
          thumb={
            <svg viewBox="-4 -4 108 108" width="26" height="26" aria-hidden="true">
              <path d={s.path} fill="currentColor" />
            </svg>
          }
          onInsert={onInsert ? () => onInsert(s) : undefined}
        />
      ))}
    </AssetGrid>
  );
}
