import React from 'react';
import { Label } from '../ui/Label.jsx';

/** AssetGrid — sectioned grid of LibraryItems. */
export function AssetGrid({ title, count, children, className = '', ...rest }) {
  return (
    <section className={className} {...rest}>
      {title ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2) var(--space-3) 0' }}>
          <Label eyebrow>{title}</Label>
          {count != null ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-ui-xs)', color: 'var(--muted-foreground)' }}>{count}</span>
          ) : null}
        </div>
      ) : null}
      <div className="dsr-assetgrid">{children}</div>
    </section>
  );
}
