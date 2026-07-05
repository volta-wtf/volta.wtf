import React from 'react';
import { Kbd } from '../ui/Kbd.jsx';
import { Label } from '../ui/Label.jsx';

/** ShortcutsOverlay — the keyboard map, grouped (data/keybindings.json). */
export function ShortcutsOverlay({ groups = [], className = '', ...rest }) {
  return (
    <div className={`dsr-shortcuts ${className}`.trim()} {...rest}>
      {groups.map((g) => (
        <section key={g.id}>
          <Label eyebrow style={{ display: 'block', marginBottom: 6 }}>{g.name}</Label>
          {(g.commands || []).filter((c) => c.keys && c.keys.length).map((c) => (
            <div key={c.id} className="dsr-shortcuts__row">
              <span>{c.title}</span>
              <Kbd keys={c.keys} />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
