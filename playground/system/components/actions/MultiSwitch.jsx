import React from "react";
import { cn } from "../lib/cn.js";

/**
 * MultiSwitch — a segmented control that selects one of several options
 * (Geist). Distinct from Switch (a boolean). Options are `[{label, value}]`
 * or plain strings. A sliding highlight tracks the active segment — its size
 * and position are measured from the active button, so segments may be uneven.
 * Controlled via `value`+`onValueChange`, or uncontrolled via `defaultValue`.
 */
export function MultiSwitch({ options = [], value, defaultValue, onValueChange, size = "md", className = "", ...props }) {
  const opts = options.map((o) => (typeof o === "string" ? { label: o, value: o } : o));
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (opts[0] && opts[0].value));
  const current = isControlled ? value : internal;

  const rootRef = React.useRef(null);
  const [thumb, setThumb] = React.useState(null);

  const measure = React.useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const active = root.querySelector('[data-active="true"]');
    if (!active) return;
    setThumb({ left: active.offsetLeft, width: active.offsetWidth });
  }, []);

  React.useLayoutEffect(() => { measure(); }, [current, measure, options]);
  React.useEffect(() => {
    if (!rootRef.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const select = (v) => {
    if (!isControlled) setInternal(v);
    onValueChange && onValueChange(v);
  };

  return (
    <div ref={rootRef} className={cn("ds-multiswitch", `ds-multiswitch--${size}`, className)} role="tablist" {...props}>
      {thumb && <span className="ds-multiswitch-thumb" style={{ left: thumb.left, width: thumb.width }} aria-hidden="true" />}
      {opts.map((o) => (
        <button key={o.value} type="button" role="tab" aria-selected={o.value === current} data-active={o.value === current}
          className={cn("ds-multiswitch-option", o.value === current && "ds-multiswitch-option--active")}
          onClick={() => select(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
