import React from "react";
import ReactDOM from "react-dom";
import { cn } from "../lib/cn.js";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip.jsx";

/**
 * Truncate — single-line text that clips to its container and reveals the full
 * string in a muted tooltip (above by default) when actually truncated.
 *
 * `position`:
 *   - "end" (default): trailing ellipsis (CSS text-overflow).
 *   - "middle": keeps the start and the tail, ellipsis (with breathing room on
 *     both sides) in between. The tail grows to show as much of the end as
 *     fits; `tail` is the minimum trailing characters kept (default 6).
 */
export function Truncate({ children, side = "top", position = "end", reveal = "cursor", tail = 11, className = "", style, ...props }) {
  const ref = React.useRef(null);
  const [clipped, setClipped] = React.useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const baseRef = React.useRef(null);

  const str = typeof children === "string" ? children : "";
  const middle = position === "middle" && str.length > tail + 1;

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // For middle, the container is flex (no overflow) — the head is what clips.
    const probe = middle ? el.querySelector(".ds-truncate-middle-head") : el;
    if (!probe) return;
    const recompute = () => setClipped(probe.scrollWidth > probe.clientWidth + 1);
    recompute();
    // The clamping width comes from the ancestor (e.g. a ResizablePanel that
    // sizes after mount), so observe it — and re-measure across a few frames
    // until layout settles, so end-mode detection reliably resolves.
    let n = 0, raf;
    const tick = () => { recompute(); if (++n < 5) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [children, middle, tail, str]);

  let text;
  if (middle) {
    // No JS measuring: the head shrinks and shows its own text-overflow ellipsis
    // when clipped; the tail (e.g. a filename extension) is always fully shown.
    // When everything fits, the head renders whole and no ellipsis appears.
    const head = str.slice(0, Math.max(0, str.length - tail));
    const end = str.slice(str.length - tail);
    text = (
      <span ref={ref} className={cn("ds-truncate-middle", className)} style={style} {...props}>
        <span className="ds-truncate-middle-head">{head}</span>
        <span className="ds-truncate-middle-tail">{end}</span>
      </span>
    );
  } else {
    text = (
      <span ref={ref} className={cn("ds-truncate", className)} style={style} {...props}>
        {children}
      </span>
    );
  }

  if (!clipped) return text;
  // reveal="cover": sits over the original text.
  if (reveal === "cover") {
    return (
      <Tooltip style={{ display: "block", minWidth: 0, maxWidth: "100%" }}>
        <TooltipTrigger asChild>{text}</TooltipTrigger>
        <TooltipContent side="cover" variant="muted">{children}</TooltipContent>
      </Tooltip>
    );
  }
  // Both "cursor" and "rail" reveal via a body portal (never clipped by an
  // overflow/resizable ancestor). "cursor" tracks both axes from the text's
  // top-left corner; "rail" stays locked to the text row and tracks X only.
  const rail = reveal === "rail";
  const show = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const base = rail
      ? { left: e.clientX + 14, top: r.top - 4 }
      : { left: r.left + 12, top: r.top - 32 };
    baseRef.current = { ...base, ex: e.clientX, ey: e.clientY };
    setAnchor(base);
  };
  const track = (e) => {
    const b = baseRef.current;
    if (!b) return;
    setAnchor(rail
      ? { left: b.left + (e.clientX - b.ex), top: b.top }
      : { left: b.left + (e.clientX - b.ex), top: b.top + (e.clientY - b.ey) });
  };
  const hide = () => { baseRef.current = null; setAnchor(null); };
  const reveal_node = anchor && typeof document !== "undefined"
    ? ReactDOM.createPortal(
        <span role="tooltip" className="ds-tooltip ds-tooltip--default ds-tooltip--muted"
          style={{ position: "fixed", left: anchor.left, top: anchor.top, whiteSpace: "nowrap", zIndex: 60, pointerEvents: "none" }}>
          {children}
        </span>, document.body)
    : null;
  return (
    <React.Fragment>
      {React.cloneElement(text, { onMouseEnter: show, onMouseMove: track, onMouseLeave: hide, onFocus: show, onBlur: hide })}
      {reveal_node}
    </React.Fragment>
  );
}
