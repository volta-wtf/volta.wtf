import React from 'react';

/** StatusBar — bottom chrome strip: save state, selection info, coords/zoom. */
export function StatusBar({ saving = false, savedText = 'Saved', selection, right, className = '', ...rest }) {
  return (
    <footer className={`dsr-statusbar ${className}`.trim()} {...rest}>
      <span className="dsr-statusbar__side">
        <span className={`dsr-statusbar__dot${saving ? ' is-saving' : ''}`}></span>
        <span>{saving ? 'Saving…' : savedText}</span>
      </span>
      {selection ? <span className="dsr-statusbar__side">{selection}</span> : null}
      <span className="dsr-statusbar__side dsr-statusbar__mono">{right}</span>
    </footer>
  );
}
