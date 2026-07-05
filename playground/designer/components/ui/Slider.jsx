import React from 'react';

/** Slider — native range input, quiet 2px track. */
export function Slider({ className = '', ...rest }) {
  return <input type="range" className={`dsr-slider ${className}`.trim()} {...rest} />;
}
