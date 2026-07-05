import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * Combobox — searchable select (shadcn Popover + Command pattern), covering the
 * full range of variants:
 *   - single or `multiple` selection (chips shown in the control)
 *   - `showClear` clear button · `disabled` · `invalid`
 *   - `autoHighlight` (first match highlighted, Enter selects)
 *   - `groups` (array of { label, items }) with labels + separators
 *   - `renderItem(opt)` for custom item content
 *   - leading `icon` addon · `dir="rtl"` support
 *   - `trigger` node → popup mode (search moves inside the popover)
 *
 * Items accept plain strings or `{ value, label }`. In multiple mode `value`
 * is an array. Keyboard: ↑/↓ move, Enter selects, Esc closes.
 */
export function Combobox({
  options = [],
  groups = null,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results found.",
  width = 240,
  multiple = false,
  showClear = false,
  disabled = false,
  invalid = false,
  autoHighlight = false,
  icon = null,
  dir,
  renderItem,
  trigger = null,
  className = "",
  ...props
}) {
  // Normalize items (strings or {value,label}); groups flatten for lookup.
  const norm = (it) => (typeof it === "string" ? { value: it, label: it } : it);
  const flat = groups ? groups.flatMap((g) => g.items.map(norm)) : options.map(norm);

  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (multiple ? [] : ""));
  const current = isControlled ? value : internal;
  const currentArr = multiple ? (Array.isArray(current) ? current : []) : current;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) close(); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const q = query.trim().toLowerCase();
  const match = (o) => o.label.toLowerCase().includes(q);
  const isSel = (v) => (multiple ? currentArr.includes(v) : current === v);
  const filteredFlat = flat.filter(match);

  const commit = (next) => { if (!isControlled) setInternal(next); onValueChange && onValueChange(next); };
  const close = () => { setOpen(false); setQuery(""); setActive(0); };

  const choose = (v) => {
    if (multiple) {
      const next = currentArr.includes(v) ? currentArr.filter((x) => x !== v) : [...currentArr, v];
      commit(next);
      setQuery("");
    } else {
      commit(v === current ? "" : v);
      close();
    }
  };
  const clear = (e) => { e.stopPropagation(); commit(multiple ? [] : ""); };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) { setOpen(true); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filteredFlat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); const o = filteredFlat[active]; if (o) choose(o.value); }
    else if (e.key === "Escape") close();
  };

  const selectedItems = flat.filter((o) => isSel(o.value));
  const hasValue = multiple ? currentArr.length > 0 : !!current;
  const singleLabel = !multiple && selectedItems[0] ? selectedItems[0].label : "";

  // ----- item + list rendering (shared by input & popup modes) -----
  const renderOpt = (o) => {
    const activeMatch = filteredFlat[active] && filteredFlat[active].value === o.value;
    return (
      <div key={o.value} role="option" aria-selected={isSel(o.value)} data-active={activeMatch ? "" : undefined}
        className="ds-command-item" onMouseEnter={() => setActive(filteredFlat.findIndex((x) => x.value === o.value))} onClick={() => choose(o.value)}>
        {renderItem ? renderItem(o) : o.label}
        <Icon name="check" size={16} style={{ marginLeft: "auto", opacity: isSel(o.value) ? 1 : 0 }} />
      </div>
    );
  };

  const list = (
    <div className="ds-command-list">
      {filteredFlat.length === 0 && <div className="ds-command-empty">{emptyText}</div>}
      {groups
        ? groups.map((g, gi) => {
            const items = g.items.map(norm).filter(match);
            if (items.length === 0) return null;
            return (
              <div key={g.label || gi} role="group">
                <div className="ds-command-group-label">{g.label}</div>
                {items.map(renderOpt)}
                {gi < groups.length - 1 && <div className="ds-command-separator" />}
              </div>
            );
          })
        : filteredFlat.map(renderOpt)}
    </div>
  );

  const searchInput = (
    <div className="ds-command-input-wrap">
      <Icon name="search" size={16} />
      <input autoFocus className="ds-command-input" placeholder={searchPlaceholder} value={query}
        onChange={(e) => { setQuery(e.target.value); setActive(0); }} onKeyDown={onKeyDown} />
    </div>
  );

  const popover = open && (
    <div className="ds-command" dir={dir}
      style={{ position: "absolute", top: "calc(100% + 4px)", insetInlineStart: 0, width: "100%", zIndex: 50, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
      {searchInput}
      {list}
    </div>
  );

  // ----- POPUP MODE: caller supplies a trigger; search lives in the popover ----
  if (trigger) {
    return (
      <div ref={ref} className={className} dir={dir} style={{ position: "relative", width }} {...props}>
        {React.cloneElement(trigger, {
          onClick: () => !disabled && setOpen((o) => !o),
          "aria-expanded": open, "data-state": open ? "open" : "closed", disabled,
          children: trigger.props.children ?? (
            <React.Fragment>
              <span style={{ color: hasValue ? "var(--foreground)" : "var(--muted-foreground)" }}>{singleLabel || placeholder}</span>
              <Icon name="chevrons-up-down" size={16} style={{ marginInlineStart: "auto", opacity: 0.6 }} />
            </React.Fragment>
          ),
        })}
        {popover}
      </div>
    );
  }

  // ----- INPUT MODE (default) -----
  return (
    <div ref={ref} className={className} dir={dir} style={{ position: "relative", width }} {...props}>
      <div role="combobox" aria-expanded={open} aria-invalid={invalid || undefined}
        data-state={open ? "open" : "closed"} tabIndex={disabled ? -1 : 0} onKeyDown={onKeyDown}
        onClick={() => !disabled && setOpen(true)}
        className={cn("ds-select ds-combobox-control", multiple && hasValue && "ds-combobox-control--chips")}
        aria-disabled={disabled || undefined}
        style={{ width: "100%", height: "auto", minHeight: "var(--control-h, 36px)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? "var(--opacity-disabled)" : 1 }}>
        {icon && <span className="ds-combobox-addon">{icon}</span>}
        <div className="ds-combobox-value">
          {multiple && selectedItems.map((o) => (
            <span key={o.value} className="ds-combobox-chip">
              {o.label}
              <button type="button" aria-label={"Remove " + o.label} className="ds-combobox-chip-x"
                onClick={(e) => { e.stopPropagation(); choose(o.value); }}><Icon name="close" /></button>
            </span>
          ))}
          {!multiple && (
            <span style={{ color: hasValue ? "var(--foreground)" : "var(--muted-foreground)" }}>{singleLabel || placeholder}</span>
          )}
          {multiple && !hasValue && <span style={{ color: "var(--muted-foreground)" }}>{placeholder}</span>}
        </div>
        {showClear && hasValue && (
          <button type="button" aria-label="Clear" className="ds-combobox-clear" onClick={clear}><Icon name="close" size={14} /></button>
        )}
        <Icon name="chevrons-up-down" size={16} style={{ flexShrink: 0, opacity: 0.6 }} />
      </div>
      {popover}
    </div>
  );
}
