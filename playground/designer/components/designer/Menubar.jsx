import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/**
 * Menubar — the 48px top app bar. Three slots: left (identity + doc),
 * center (mode tabs / breakpoints), right (share, present, avatars).
 */
export function Menubar({ wordmark = 'Designer', doc, docMeta, left, center, right, className = '', ...rest }) {
  return (
    <header className={`dsr-menubar ${className}`.trim()} {...rest}>
      <div className="dsr-menubar__side">
        <span className="dsr-menubar__wordmark">{wordmark}</span>
        {doc ? (
          <button type="button" className="dsr-menubar__doc">
            <span className="dsr-menubar__doc-name">{doc}</span>
            {docMeta ? <span className="dsr-menubar__doc-meta">{docMeta}</span> : null}
            <Icon name="chevron-down" size={12} />
          </button>
        ) : null}
        {left}
      </div>
      {center ? <div className="dsr-menubar__center">{center}</div> : null}
      <div className="dsr-menubar__side" style={{ justifyContent: 'flex-end' }}>{right}</div>
    </header>
  );
}
