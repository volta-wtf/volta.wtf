import React from 'react';

const KEY_MAP = {
  mod: '⌘', cmd: '⌘', shift: '⇧', alt: '⌥', ctrl: '⌃',
  enter: '↵', backspace: '⌫', esc: 'esc', tab: '⇥',
  up: '↑', down: '↓', left: '←', right: '→',
};

/** Kbd — keyboard shortcut caps. Accepts `keys={['mod','K']}` or children. */
export function Kbd({ keys, className = '', children, ...rest }) {
  const list = keys || (children != null ? [children] : []);
  return (
    <span className={`dsr-kbd-group ${className}`.trim()} {...rest}>
      {list.map((k, i) => (
        <kbd key={i} className="dsr-kbd">{KEY_MAP[String(k).toLowerCase()] || k}</kbd>
      ))}
    </span>
  );
}
