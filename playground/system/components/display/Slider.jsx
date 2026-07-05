import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Slider — range input. Single-thumb by default; pass a two-element array as
 * `value`/`defaultValue` (or `range`) for a two-thumb range selection.
 * Controlled via `value`+`onValueChange` or uncontrolled via `defaultValue`.
 * Supports keyboard (arrows/Home/End) on each thumb.
 */
export function Slider({
  value,
  defaultValue,
  range = false,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = "",
  onValueChange,
  ...props
}) {
  const isRange = range || Array.isArray(value) || Array.isArray(defaultValue);
  const initial = defaultValue !== undefined ? defaultValue : isRange ? [min, max] : 50;
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(initial);
  const val = isControlled ? value : internal;
  const trackRef = React.useRef(null);
  const activeThumb = React.useRef(0);

  const pctOf = (v) => ((v - min) / (max - min)) * 100;
  const clamp = (v) => Math.max(min, Math.min(max, Math.round(v / step) * step));

  const commit = (next) => {
    if (!isControlled) setInternal(next);
    onValueChange && onValueChange(next);
  };
  const setSingle = (v) => commit(clamp(v));
  const setRangeAt = (i, v) => {
    const arr = Array.isArray(val) ? [...val] : [min, max];
    arr[i] = clamp(v);
    if (arr[0] > arr[1]) { // swap so lo<=hi and keep dragging the right one
      arr.reverse();
      activeThumb.current = i === 0 ? 1 : 0;
    }
    commit(arr);
  };
  const fromClientX = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    return min + ((clientX - r.left) / r.width) * (max - min);
  };
  const nearestThumb = (v) => {
    if (!Array.isArray(val)) return 0;
    return Math.abs(v - val[0]) <= Math.abs(v - val[1]) ? 0 : 1;
  };

  const onPointerDown = (e) => {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const v = fromClientX(e.clientX);
    if (isRange) { activeThumb.current = nearestThumb(v); setRangeAt(activeThumb.current, v); }
    else setSingle(v);
  };
  const onPointerMove = (e) => {
    if (disabled || !(e.buttons & 1)) return;
    const v = fromClientX(e.clientX);
    if (isRange) setRangeAt(activeThumb.current, v);
    else setSingle(v);
  };
  const keyDelta = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") return step;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") return -step;
    if (e.key === "Home") return "min";
    if (e.key === "End") return "max";
    return null;
  };
  const onKeyDownThumb = (i) => (e) => {
    if (disabled) return;
    const d = keyDelta(e);
    if (d == null) return;
    e.preventDefault();
    const cur = Array.isArray(val) ? val[i] : val;
    const nv = d === "min" ? min : d === "max" ? max : cur + d;
    if (isRange) setRangeAt(i, nv); else setSingle(nv);
  };

  const thumbs = isRange ? [0, 1] : [0];
  const lo = isRange ? pctOf(val[0]) : 0;
  const hi = isRange ? pctOf(val[1]) : pctOf(val);

  return (
    <span
      className={cn("ds-slider", className)}
      data-disabled={disabled || undefined}
      style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : undefined }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      {...props}
    >
      <span ref={trackRef} className="ds-slider-track">
        <span className="ds-slider-range" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
      </span>
      {thumbs.map((i) => {
        const v = Array.isArray(val) ? val[i] : val;
        return (
          <span
            key={i}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={v}
            aria-disabled={disabled || undefined}
            onKeyDown={onKeyDownThumb(i)}
            className="ds-slider-thumb"
            style={{ position: "absolute", left: `calc(${pctOf(v)}% - 8px)` }}
          />
        );
      })}
    </span>
  );
}
