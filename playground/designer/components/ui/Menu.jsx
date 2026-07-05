import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Kbd } from './Kbd.jsx';

/**
 * Menu — dropdown/context menu surface. Items are data; position it
 * yourself (absolute, at the trigger or pointer).
 */
export function Menu({ items = [], onSelect, className = '', style, ...rest }) {
  return (
    <div className={`dsr-menu ${className}`.trim()} role="menu" style={style} {...rest}>
      {items.map((it, i) => {
        if (it === '-' || it.separator) return <div key={`s${i}`} className="dsr-menu__sep" role="separator"></div>;
        return (
          <div
            key={it.id || it.title}
            role="menuitem"
            className={`dsr-menu__item${it.danger ? ' is-danger' : ''}${it.disabled ? ' is-disabled' : ''}`}
            onClick={() => !it.disabled && onSelect && onSelect(it)}
          >
            <span className="dsr-menu__icon">{it.icon ? <Icon name={it.icon} size={14} /> : null}</span>
            <span className="dsr-menu__title">{it.title}</span>
            {it.keys && it.keys.length ? <Kbd keys={it.keys} /> : null}
          </div>
        );
      })}
    </div>
  );
}
