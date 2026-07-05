import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * PanelPicker — a shell with a master header that hosts several pickers and
 * switches between them (MediaPicker, FillPicker, …). Each entry supplies an
 * `id`, a header `label`/`icon`, and the `node` to show when active.
 *
 *   <PanelPicker pickers={[{ id, label, icon, node }, …]} onClose={fn} />
 */
export function PanelPicker({ pickers = [], value, defaultValue, onValueChange, onClose, placeholder, className = "", ...props }) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue != null ? defaultValue : (pickers[0] && pickers[0].id));
  const cur = controlled ? value : internal;
  const active = pickers.find((p) => p.id === cur) || pickers[0];
  const set = (v) => { if (!controlled) setInternal(v); onValueChange && onValueChange(v); };
  return (
    <div className={cn("ds-panelpicker", className)} {...props}>
      <div className="ds-panelpicker-header" role="tablist">
        <div className="ds-panelpicker-tabs">
          {pickers.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={!!active && p.id === active.id}
              data-active={!!active && p.id === active.id ? "" : undefined}
              onClick={() => set(p.id)}
              className="ds-panelpicker-tab"
              title={p.label}
              aria-label={p.label}
            >
              {p.icon && <Icon name={p.icon} size={16} />}
              {p.label && <span className="ds-panelpicker-tab-label">{p.label}</span>}
            </button>
          ))}
        </div>
        {(( active && active.action) || onClose) && (
          <div className="ds-panelpicker-header-end">
            {active && active.action}
            {onClose && (
              <button type="button" className="ds-panelpicker-close" aria-label="Close" onClick={onClose}><Icon name="close" size={16} /></button>
            )}
          </div>
        )}
      </div>
      <div className="ds-panelpicker-body">
        {active && active.node
          ? active.node
          : <div className="ds-panelpicker-empty">{placeholder != null ? placeholder : "Nothing to show here yet."}</div>}
      </div>
    </div>
  );
}
