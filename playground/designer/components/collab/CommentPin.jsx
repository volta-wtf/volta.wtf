import React from 'react';
import { presenceColor } from '../ui/Avatar.jsx';

const initials = (name = '') =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();

/** CommentPin — comment marker at {x, y}; `open` shows the thread bubble. */
export function CommentPin({ name = '', text, time, x = 0, y = 0, open = false, onClick, className = '', style, ...rest }) {
  return (
    <div className={`dsr-commentpin ${className}`.trim()} style={{ left: x, top: y, '--presence': presenceColor(name), ...style }} {...rest}>
      <button type="button" className="dsr-commentpin__marker" aria-label={`Comment by ${name}`} onClick={onClick}>
        {initials(name)}
      </button>
      {open ? (
        <div className="dsr-commentpin__bubble">
          <div className="dsr-commentpin__meta">
            <span className="dsr-commentpin__name">{name}</span>
            {time ? <span className="dsr-commentpin__time">{time}</span> : null}
          </div>
          <p className="dsr-commentpin__text">{text}</p>
        </div>
      ) : null}
    </div>
  );
}
