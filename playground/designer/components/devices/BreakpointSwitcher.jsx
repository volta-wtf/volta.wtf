import React from 'react';
import { IconButton } from '../ui/IconButton.jsx';

const DEFAULT_BPS = [
  { id: 'desktop', icon: 'device-desktop', label: 'Desktop — 1920' },
  { id: 'laptop', icon: 'device-laptop', label: 'Laptop — 1280' },
  { id: 'tablet', icon: 'device-tablet', label: 'Tablet — 768' },
  { id: 'phone', icon: 'device-phone', label: 'Phone — 390' },
];

/** BreakpointSwitcher — the sites-builder viewport toggle (menubar center). */
export function BreakpointSwitcher({ breakpoints = DEFAULT_BPS, value, onChange, className = '', ...rest }) {
  return (
    <div className={className} style={{ display: 'inline-flex', gap: 2 }} role="radiogroup" aria-label="Breakpoint" {...rest}>
      {breakpoints.map((bp) => (
        <IconButton
          key={bp.id}
          name={bp.icon || 'device-desktop'}
          label={bp.label || bp.id}
          active={value === bp.id}
          onClick={() => onChange && onChange(bp.id)}
        />
      ))}
    </div>
  );
}
