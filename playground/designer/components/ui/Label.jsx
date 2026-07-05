import React from 'react';

/** Label — control caption. `eyebrow` = uppercase 11px section label. */
export function Label({ eyebrow = false, hint, className = '', children, ...rest }) {
  const cls = ['dsr-label', eyebrow ? 'dsr-label--eyebrow' : '', className].filter(Boolean).join(' ');
  return (
    <label className={cls} {...rest}>
      {children}
      {hint ? <span className="dsr-label__hint">{hint}</span> : null}
    </label>
  );
}
