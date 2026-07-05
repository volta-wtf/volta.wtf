import React from 'react';

/** Checkbox — 16px square. Pass `label` to get the wrapping row for free. */
export function Checkbox({ label, className = '', ...rest }) {
  const box = <input type="checkbox" className={`dsr-checkbox ${className}`.trim()} {...rest} />;
  if (!label) return box;
  return (
    <label className="dsr-check-row">
      {box}
      <span>{label}</span>
    </label>
  );
}
