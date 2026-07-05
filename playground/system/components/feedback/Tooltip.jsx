import React from "react";
import ReactDOM from "react-dom";
import { cn } from "../lib/cn.js";
import { DismissButton } from "../actions/DismissButton.jsx";

const TooltipCtx = React.createContext(null);

/** TooltipProvider — optional wrapper (kept for API parity with shadcn). */
export function TooltipProvider({ children }) { return children; }

/**
 * Tooltip — hover/focus label. Compose TooltipTrigger + TooltipContent.
 * Set `followCursor` so the tooltip tracks the pointer while hovering the
 * trigger (uses the compact `sm` treatment by default). Pass `defaultOpen`
 * (or controlled `open`) to keep it shown without hover — handy for previews.
 * The content is portalled to document.body (top layer) so it is never clipped
 * by an ancestor's hidden/scrolling overflow.
 */
export function Tooltip({ followCursor = false, followAxis = "both", open: openProp, defaultOpen = false, className = "", style, children }) {
  const isControlled = openProp !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const open = isControlled ? openProp : internal;
  const setOpen = (v) => { if (!isControlled) setInternal(v); };
  const [pt, setPt] = React.useState({ x: 0, y: 0 });
  const anchorRef = React.useRef(null);
  return (
    <TooltipCtx.Provider value={{ open, setOpen, followCursor, followAxis, pt, setPt, anchorRef }}>
      <span ref={anchorRef} className={className} style={{ position: "relative", display: "inline-flex", ...style }}>{children}</span>
    </TooltipCtx.Provider>
  );
}
export function TooltipTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(TooltipCtx);
  const handlers = {
    onMouseEnter: () => ctx.setOpen(true),
    onMouseLeave: () => ctx.setOpen(false),
    onFocus: () => ctx.setOpen(true),
    onBlur: () => ctx.setOpen(false),
  };
  if (ctx.followCursor) {
    handlers.onMouseMove = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      ctx.setPt({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
  }
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { ...handlers, ...props });
  return <span {...handlers} {...props}>{children}</span>;
}

/**
 * TooltipContent — the floating label, rendered in a document.body portal
 * (position: fixed) so it can never be clipped by an ancestor overflow.
 * Beyond plain children it supports:
 *   - `shortcut`: a keyboard shortcut shown trailing the label (e.g. "⌘+F")
 *   - `hint`: a muted second line below the label
 * For richer layouts (icon + title + description) just pass children.
 */
export function TooltipContent({ side = "top", size, shortcut, hint, media, description, footerLink, action, dismissible = false, variant, tone, offset, className = "", children, ...props }) {
  const ctx = React.useContext(TooltipCtx);
  // Reposition on scroll/resize while open (fixed coords are viewport-relative).
  const [, force] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    if (!ctx.open) return undefined;
    const on = () => force();
    window.addEventListener("scroll", on, true);
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on, true); window.removeEventListener("resize", on); };
  }, [ctx.open]);

  if (!ctx.open || typeof document === "undefined") return null;
  const anchor = ctx.anchorRef && ctx.anchorRef.current;
  if (!anchor) return null;
  const r = anchor.getBoundingClientRect();

  // Follow-cursor defaults to the compact size; other modes default to "default".
  const sz = size || (ctx.followCursor ? "sm" : "default");
  const card = description != null || footerLink != null || action != null;
  const promo = media !== undefined || card;
  const cls = cn("ds-tooltip", `ds-tooltip--${promo ? "default" : sz}`, promo && "ds-tooltip--promo", card && "ds-tooltip--card", variant && `ds-tooltip--${variant}`, className);
  const closeBtn = dismissible ? (
    <DismissButton size="sm" className="ds-tooltip-close" onClick={() => ctx.setOpen(false)} />
  ) : null;
  // Promo mode: an image-placeholder area above the label (for feature spotlights).
  const inner = promo ? (
    <span className="ds-tooltip-promo">
      {media !== undefined && <span className="ds-tooltip-promo-media">{media}</span>}
      <span className="ds-tooltip-promo-body">
        <span className="ds-tooltip-promo-title">{children}</span>
        {description != null && <span className="ds-tooltip-desc">{description}</span>}
        {hint != null && <span className="ds-tooltip-hint">{hint}</span>}
      </span>
      {(footerLink != null || action != null) && (
        <span className="ds-tooltip-footer">
          <span className="ds-tooltip-footer-link">{footerLink}</span>
          {action != null && <span className="ds-tooltip-footer-action">{action}</span>}
        </span>
      )}
      {closeBtn}
    </span>
  ) : (shortcut != null || hint != null) ? (
    <React.Fragment>
      <span className="ds-tooltip-row">
        <span>{children}</span>
        {shortcut != null && <kbd className="ds-tooltip-kbd">{shortcut}</kbd>}
      </span>
      {hint != null && <span className="ds-tooltip-hint">{hint}</span>}
    </React.Fragment>
  ) : children;

  const GAP = 8;
  let style;
  if (ctx.followCursor) {
    const fx = props.followOffset ? props.followOffset.x : 14;
    const fy = props.followOffset ? props.followOffset.y : 14;
    const axisX = ctx.followAxis === "x";
    style = axisX
      ? { position: "fixed", whiteSpace: "nowrap", left: r.left + ctx.pt.x + fx, top: r.top + r.height / 2, transform: "translateY(-50%)", pointerEvents: "none", zIndex: 9999 }
      : { position: "fixed", whiteSpace: "nowrap", left: r.left + ctx.pt.x + fx, top: r.top + ctx.pt.y + fy, pointerEvents: "none", zIndex: 9999 };
  } else if (side === "cover") {
    const off = offset || { x: 0, y: 0 };
    style = offset
      ? { position: "fixed", whiteSpace: "nowrap", left: r.left + off.x, top: r.top + off.y, zIndex: 9999 }
      : { position: "fixed", whiteSpace: "normal", boxSizing: "border-box", left: r.left, top: r.top, width: r.width, zIndex: 9999 };
  } else {
    const base = { position: "fixed", whiteSpace: "nowrap", zIndex: 9999 };
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    style =
      side === "bottom" ? { ...base, left: cx, top: r.bottom + GAP, transform: "translateX(-50%)" }
      : side === "left" ? { ...base, left: r.left - GAP, top: cy, transform: "translate(-100%, -50%)" }
      : side === "right" ? { ...base, left: r.right + GAP, top: cy, transform: "translateY(-50%)" }
      : { ...base, left: cx, top: r.top - GAP, transform: "translate(-50%, -100%)" };
  }
  const { followOffset, ...rest } = props;
  return ReactDOM.createPortal(
    <span role="tooltip" data-side={side} className={cls} style={style} {...rest}>{inner}</span>,
    document.body
  );
}
