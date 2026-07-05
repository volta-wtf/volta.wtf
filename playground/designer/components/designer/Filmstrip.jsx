import React from 'react';

/** Filmstrip — numbered slide thumbnails; `renderThumb` draws the preview. */
export function Filmstrip({ slides = [], selectedId, onSelect, renderThumb, className = '', ...rest }) {
  return (
    <div className={`dsr-filmstrip ${className}`.trim()} {...rest}>
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`dsr-filmstrip__item${selectedId === s.id ? ' is-selected' : ''}`}
          onClick={() => onSelect && onSelect(s.id)}
        >
          <span className="dsr-filmstrip__num">{i + 1}</span>
          <div className="dsr-filmstrip__thumb">{renderThumb ? renderThumb(s, i) : null}</div>
          {s.name ? <span className="dsr-filmstrip__name">{s.name}</span> : null}
        </div>
      ))}
    </div>
  );
}
