import React from "react";
import ReactDOM from "react-dom";
import { cn } from "../lib/cn.js";

const PopoverCtx = React.createContext(null);

/** Popover — floating content anchored to a trigger. The content is portalled
 *  to document.body (position: fixed) so it is never clipped by an ancestor's
 *  hidden/scrolling overflow. */
export function Popover({ open, defaultOpen = false, onOpenChange, children }) {
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internal;
  const setOpen = (v) => { if (!isControlled) setInternal(v); onOpenChange && onOpenChange(v); };
  const anchorRef = React.useRef(null);
  const contentRef = React.useRef(null);
  React.useEffect(() => {
    if (!isOpen) return;
    const onDoc = (e) => {
      if (anchorRef.current && anchorRef.current.contains(e.target)) return;
      if (contentRef.current && contentRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [isOpen]);
  return (
    <PopoverCtx.Provider value={{ isOpen, setOpen, anchorRef, contentRef }}>
      <span ref={anchorRef} style={{ position: "relative", display: "inline-flex" }}>{children}</span>
    </PopoverCtx.Provider>
  );
}
export function PopoverTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(PopoverCtx);
  const onClick = () => ctx.setOpen(!ctx.isOpen);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick, ...props });
  return <button type="button" onClick={onClick} {...props}>{children}</button>;
}
export function PopoverContent({ align = "center", side = "bottom", className = "", style, children, ...props }) {
  const ctx = React.useContext(PopoverCtx);
  const [pos, setPos] = React.useState(null);

  React.useLayoutEffect(() => {
    if (!ctx.isOpen) { setPos(null); return; }
    const anchor = ctx.anchorRef.current;
    if (!anchor) return;
    const update = () => {
      const r = anchor.getBoundingClientRect();
      const gap = 6;
      const next = {};
      if (side === "top") next.bottom = window.innerHeight - r.top + gap;
      else next.top = r.bottom + gap;
      if (align === "start") next.left = r.left;
      else if (align === "end") next.left = r.right;
      else next.left = r.left + r.width / 2;
      setPos(next);
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [ctx.isOpen, align, side]);

  if (!ctx.isOpen || !pos || typeof document === "undefined") return null;
  const transform = align === "end" ? "translateX(-100%)" : align === "center" ? "translateX(-50%)" : undefined;
  return ReactDOM.createPortal(
    <div
      role="dialog"
      ref={(n) => { ctx.contentRef.current = n; }}
      className={cn("ds-popover", className)}
      style={{ position: "fixed", top: pos.top, bottom: pos.bottom, left: pos.left, transform, zIndex: 60, ...style }}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
}
