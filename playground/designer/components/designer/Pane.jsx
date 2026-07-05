import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/** Pane — collapsible inspector section: eyebrow title + actions + fields. */
export function Pane({ title, actions, defaultOpen = true, className = '', children, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <section className={`dsr-pane ${open ? 'is-open' : ''} ${className}`.trim()} {...rest}>
      <div
        className="dsr-pane__header"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}
      >
        <span className="dsr-pane__title">
          <Icon name="collapse" size={12} className="dsr-pane__chevron" />
          {title}
        </span>
        {actions ? (
          <span className="dsr-pane__actions" onClick={(e) => e.stopPropagation()}>{actions}</span>
        ) : null}
      </div>
      {open ? <div className="dsr-pane__body">{children}</div> : null}
    </section>
  );
}
