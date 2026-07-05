import React from 'react';

const dimPx = (v) => {
  const n = parseFloat(v);
  if (Number.isNaN(n)) return 8;
  const px = String(v).includes('rem') ? n * 16 : n;
  return Math.max(2, Math.min(20, px));
};

/** TokenSwatch — visual preview of a typed token ($type-aware). */
export function TokenSwatch({ token }) {
  const t = token.$type;
  const v = token.cssVar ? `var(${token.cssVar})` : token.$value;
  let inner = null;
  if (t === 'color') {
    inner = <span className="dsr-tokenswatch__color" style={{ background: v }} />;
  } else if (t === 'dimension') {
    inner = <span className="dsr-tokenswatch__dim" style={{ width: dimPx(token.$value) }} />;
  } else if (t === 'shadow') {
    inner = <span className="dsr-tokenswatch__shadow" style={{ boxShadow: v }} />;
  } else if (t === 'fontFamily') {
    inner = <span className="dsr-tokenswatch__text" style={{ fontFamily: Array.isArray(token.$value) ? token.$value.join(', ') : token.$value }}>Ag</span>;
  } else if (t === 'fontWeight') {
    inner = <span className="dsr-tokenswatch__text" style={{ fontFamily: 'var(--font-sans)', fontWeight: token.$value }}>Ag</span>;
  } else if (t === 'duration') {
    inner = <span className="dsr-tokenswatch__dim" style={{ width: Math.min(20, parseFloat(token.$value) / 16), background: 'var(--brand)' }} />;
  } else {
    inner = <span className="dsr-tokenswatch__text" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted-foreground)' }}>{'{}'}</span>;
  }
  return <span className="dsr-tokenswatch">{inner}</span>;
}
