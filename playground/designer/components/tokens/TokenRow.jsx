import React from 'react';
import { TokenSwatch } from './TokenSwatch.jsx';
import { Badge } from '../ui/Badge.jsx';

/** TokenRow — one token: swatch · name · value · type. */
export function TokenRow({ token, showType = true, onClick }) {
  const value = Array.isArray(token.$value)
    ? (typeof token.$value[0] === 'object' ? 'composite' : token.$value.join(', '))
    : String(token.$value);
  return (
    <div className="dsr-token-row" onClick={onClick} title={token.$description || token.name}>
      <TokenSwatch token={token} />
      <span className="dsr-token-row__name">{token.cssVar || token.name}</span>
      <span className="dsr-token-row__value">{value}</span>
      {showType ? <Badge variant="outline">{token.$type}</Badge> : <span />}
    </div>
  );
}
