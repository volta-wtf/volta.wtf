import React from 'react';

const path = (c) => {
  const dx = Math.max(40, Math.abs(c.to.x - c.from.x) * 0.45);
  return `M ${c.from.x} ${c.from.y} C ${c.from.x + dx} ${c.from.y}, ${c.to.x - dx} ${c.to.y}, ${c.to.x} ${c.to.y}`;
};

/**
 * ConnectionLayer — prototype "noodles" between frames, in world
 * coordinates. Place INSIDE Canvas, after the Frames.
 */
export function ConnectionLayer({ connections = [], activeId, className = '', ...rest }) {
  const mid = React.useId ? React.useId().replace(/[:]/g, '') : 'dsr';
  return (
    <svg className={`dsr-connections ${className}`.trim()} width="1" height="1" aria-hidden="true" {...rest}>
      <defs>
        <marker id={`arrow-${mid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="var(--selection)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {connections.map((c) => (
        <g key={c.id}>
          <path
            className={`dsr-connections__path${activeId && activeId !== c.id ? ' is-dim' : ''}`}
            d={path(c)}
            markerEnd={`url(#arrow-${mid})`}
          />
          <circle className="dsr-connections__port" cx={c.from.x} cy={c.from.y} r="3.5" />
        </g>
      ))}
    </svg>
  );
}
