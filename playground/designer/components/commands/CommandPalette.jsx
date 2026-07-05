import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Kbd } from '../ui/Kbd.jsx';

/**
 * CommandPalette — ⌘K. Renders data/keybindings.json groups; filters,
 * arrows navigate, Enter runs, Esc closes. Position: absolute within
 * the nearest positioned ancestor (the app shell).
 */
export function CommandPalette({ groups = [], open = false, onClose, onRun, placeholder = 'Type a command…' }) {
  const [q, setQ] = React.useState('');
  const [idx, setIdx] = React.useState(0);
  const inputRef = React.useRef(null);

  const flat = React.useMemo(() => {
    const ql = q.trim().toLowerCase();
    const out = [];
    groups.forEach((g) => {
      (g.commands || []).forEach((c) => {
        if (!ql || c.title.toLowerCase().includes(ql) || g.name.toLowerCase().includes(ql)) {
          out.push({ ...c, group: g.name });
        }
      });
    });
    return out;
  }, [groups, q]);

  React.useEffect(() => { setIdx(0); }, [q, open]);
  React.useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (open) setQ('');
  }, [open]);

  if (!open) return null;

  const run = (cmd) => {
    if (onRun) onRun(cmd);
    if (onClose) onClose();
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, flat.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && flat[idx]) { e.preventDefault(); run(flat[idx]); }
    else if (e.key === 'Escape' && onClose) onClose();
  };

  let lastGroup = null;
  return (
    <div className="dsr-cmdk-overlay" onPointerDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div className="dsr-cmdk" role="dialog" aria-label="Command palette">
        <input
          ref={inputRef}
          className="dsr-cmdk__input"
          placeholder={placeholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className="dsr-cmdk__list">
          {flat.length === 0 ? <div className="dsr-cmdk__empty">No commands match “{q}”.</div> : null}
          {flat.map((c, i) => {
            const head = c.group !== lastGroup ? (
              <div key={`h-${c.group}`} className="dsr-cmdk__group-label">
                <span className="dsr-label dsr-label--eyebrow">{c.group}</span>
              </div>
            ) : null;
            lastGroup = c.group;
            return (
              <React.Fragment key={c.id}>
                {head}
                <div
                  className={`dsr-cmdk__row${i === idx ? ' is-active' : ''}`}
                  onPointerEnter={() => setIdx(i)}
                  onClick={() => run(c)}
                >
                  <span className="dsr-cmdk__row-icon"><Icon name={c.icon || 'chevron-right'} size={14} /></span>
                  <span className="dsr-cmdk__row-title">{c.title}</span>
                  {c.keys && c.keys.length ? <Kbd keys={c.keys} /> : null}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
