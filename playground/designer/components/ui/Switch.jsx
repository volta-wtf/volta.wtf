import React from 'react';

/** Switch — instant on/off toggle. Pass `label` for the wrapping row. */
export function Switch({ label, className = '', ...rest }) {
  const sw = <input type="checkbox" role="switch" className={`dsr-switch ${className}`.trim()} {...rest} />;
  if (!label) return sw;
  return (
    <label className="dsr-check-row" style={{ justifyContent: 'space-between', width: '100%' }}>
      <span>{label}</span>
      {sw}
    </label>
  );
}
