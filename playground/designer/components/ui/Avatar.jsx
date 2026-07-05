import React from 'react';

export const PRESENCE_COLORS = [
  'oklch(0.62 0.19 256)', // ultramarine
  'oklch(0.66 0.13 43)',  // terracotta
  'oklch(0.60 0.12 160)', // green
  'oklch(0.65 0.13 300)', // violet
  'oklch(0.70 0.12 85)',  // amber
];

export const presenceColor = (name = '') => {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) % 997;
  return PRESENCE_COLORS[h % PRESENCE_COLORS.length];
};

const initials = (name = '') =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();

/** Avatar — initials or image; `presence` shows the colored ring. */
export function Avatar({ name = '', src, size = 'md', presence = false, className = '', style, ...rest }) {
  const ring = presence ? { '--presence': presenceColor(name) } : null;
  return (
    <span
      className={`dsr-avatar${size !== 'md' ? ` dsr-avatar--${size}` : ''}${presence ? ' has-ring' : ''} ${className}`.trim()}
      style={{ ...ring, ...style }}
      title={name}
      {...rest}
    >
      {src ? <img src={src} alt={name} onError={(e) => { e.target.style.display = 'none'; }} /> : initials(name)}
    </span>
  );
}
