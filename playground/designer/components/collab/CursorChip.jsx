import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { presenceColor } from '../ui/Avatar.jsx';

/** CursorChip — a collaborator's cursor at {x, y} (world or screen coords). */
export function CursorChip({ name = '', x = 0, y = 0, color, className = '', style, ...rest }) {
  return (
    <div
      className={`dsr-cursor ${className}`.trim()}
      style={{ left: x, top: y, '--presence': color || presenceColor(name), ...style }}
      {...rest}
    >
      <span className="dsr-cursor__arrow"><Icon name="select" size={16} strokeWidth={2} /></span>
      {name ? <span className="dsr-cursor__tag">{name.split(' ')[0]}</span> : null}
    </div>
  );
}
