import React from 'react';
import { Switch } from '../ui/Switch.jsx';

/** BooleanField — labeled row: 84px label + switch (right-aligned). */
export function BooleanField({ label, className = '', style, ...switchProps }) {
  return (
    <div className={`dsr-field ${className}`.trim()} style={style}>
      <span className="dsr-field__label">{label}</span>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Switch {...switchProps} />
      </div>
    </div>
  );
}
