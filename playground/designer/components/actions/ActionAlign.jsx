import React from 'react';
import { IconButton } from '../ui/IconButton.jsx';

const ALIGNS = [
  ['align-left', 'Align left'], ['align-center-h', 'Align horizontal centers'], ['align-right', 'Align right'],
  ['align-top', 'Align top'], ['align-center-v', 'Align vertical centers'], ['align-bottom', 'Align bottom'],
];
const DISTS = [['distribute-h', 'Distribute horizontally'], ['distribute-v', 'Distribute vertically']];

/** ActionAlign — the inspector's alignment row; fires the align type. */
export function ActionAlign({ onAlign, distribute = true, disabled = false, className = '', style }) {
  return (
    <div className={className} role="toolbar" aria-label="Align" style={{ display: 'flex', gap: 2, justifyContent: 'space-between', ...style }}>
      <span style={{ display: 'inline-flex', gap: 2 }}>
        {ALIGNS.map(([role, label]) => (
          <IconButton key={role} size="sm" name={role} label={label} disabled={disabled} onClick={() => onAlign && onAlign(role)} />
        ))}
      </span>
      {distribute ? (
        <span style={{ display: 'inline-flex', gap: 2 }}>
          {DISTS.map(([role, label]) => (
            <IconButton key={role} size="sm" name={role} label={label} disabled={disabled} onClick={() => onAlign && onAlign(role)} />
          ))}
        </span>
      ) : null}
    </div>
  );
}
