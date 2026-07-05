import React from 'react';
import { Input } from '../ui/Input.jsx';

/** TextField — labeled row: 84px label + quiet input. */
export function TextField({ label, mono = false, className = '', style, ...inputProps }) {
  return (
    <div className={`dsr-field ${className}`.trim()} style={style}>
      <span className="dsr-field__label">{label}</span>
      <Input quiet size="sm" mono={mono} {...inputProps} />
    </div>
  );
}
