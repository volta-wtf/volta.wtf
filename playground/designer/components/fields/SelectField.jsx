import React from 'react';
import { Select } from '../ui/Select.jsx';

/** SelectField — labeled row: 84px label + quiet select. */
export function SelectField({ label, options = [], className = '', style, ...selectProps }) {
  return (
    <div className={`dsr-field ${className}`.trim()} style={style}>
      <span className="dsr-field__label">{label}</span>
      <Select quiet size="sm" options={options} {...selectProps} />
    </div>
  );
}
