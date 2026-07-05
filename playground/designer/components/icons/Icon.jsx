import React from 'react';
import { ICON_ROLES } from './roles.js';

const toPascal = (s) =>
  String(s).split(/[-_ ]+/).map((w) => (w ? w[0].toUpperCase() + w.slice(1) : '')).join('');

const renderNode = (node, i) => {
  const [tag, attrs, children] = node;
  return React.createElement(
    tag,
    { key: i, ...attrs },
    Array.isArray(children) ? children.map(renderNode) : undefined
  );
};

/**
 * Icon — the ONLY way glyphs enter the UI.
 * Resolves a semantic role (preferred: "visible", "field-number") or a raw
 * Lucide name via the role registry, and renders inline SVG from the
 * lucide UMD global (load lucide@0.525.0 before use).
 * Unknown names render a dashed placeholder + console.warn, never crash.
 */
export function Icon({ name, size = 16, strokeWidth, title, style, className }) {
  const lucide = typeof window !== 'undefined' ? window.lucide : null;
  const glyph = ICON_ROLES[name] || name;
  const icons = (lucide && lucide.icons) || lucide || {};
  const node = icons[glyph] || icons[toPascal(glyph)];
  const sw = strokeWidth != null ? strokeWidth : size <= 12 ? 2 : 1.5;

  if (!node || !Array.isArray(node)) {
    if (typeof console !== 'undefined' && !icons[glyph]) {
      console.warn(`[Icon] unresolved icon "${name}" (glyph "${glyph}") — is lucide loaded?`);
    }
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
    >
      {title ? <title>{title}</title> : null}
      {node.map(renderNode)}
    </svg>
  );
}
