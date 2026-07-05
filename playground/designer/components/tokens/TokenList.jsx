import React from 'react';
import { TokenRow } from './TokenRow.jsx';
import { Label } from '../ui/Label.jsx';

/**
 * TokenList — grouped token manager list. Feed it data/tokens.json
 * ({ groups: [{ id, name, tokens: [...] }] }) or a filtered subset.
 */
export function TokenList({ groups = [], filter = '', showType = true, onTokenClick, className = '', ...rest }) {
  const q = filter.trim().toLowerCase();
  const match = (t) =>
    !q ||
    t.name.toLowerCase().includes(q) ||
    (t.cssVar || '').toLowerCase().includes(q) ||
    t.$type.toLowerCase().includes(q);
  return (
    <div className={`dsr-tokenlist ${className}`.trim()} {...rest}>
      {groups.map((g) => {
        const tokens = (g.tokens || []).filter(match);
        if (!tokens.length) return null;
        return (
          <section key={g.id} className="dsr-tokenlist__group">
            <div className="dsr-tokenlist__head">
              <Label eyebrow>{g.name}</Label>
              <span style={{ fontSize: 'var(--text-ui-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                {tokens.length}
              </span>
            </div>
            {tokens.map((t) => (
              <TokenRow key={t.name} token={t} showType={showType} onClick={onTokenClick ? () => onTokenClick(t) : undefined} />
            ))}
          </section>
        );
      })}
    </div>
  );
}
