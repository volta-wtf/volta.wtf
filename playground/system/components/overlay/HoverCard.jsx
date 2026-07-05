import React from "react";
import { cn } from "../lib/cn.js";

const HoverCtx = React.createContext(null);

/** HoverCard — preview card shown on hover of a link/trigger. */
export function HoverCard({ openDelay = 300, closeDelay = 150, children }) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef(null);
  const schedule = (v, delay) => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(v), delay); };
  return <HoverCtx.Provider value={{ open, enter: () => schedule(true, openDelay), leave: () => schedule(false, closeDelay) }}>
    <span style={{ position: "relative", display: "inline-flex" }}>{children}</span>
  </HoverCtx.Provider>;
}
export function HoverCardTrigger({ asChild = false, children, ...props }) {
  const ctx = React.useContext(HoverCtx);
  const handlers = { onMouseEnter: ctx.enter, onMouseLeave: ctx.leave, onFocus: ctx.enter, onBlur: ctx.leave };
  if (asChild && React.isValidElement(children)) return React.cloneElement(children, { ...handlers, ...props });
  return <span {...handlers} {...props}>{children}</span>;
}
export function HoverCardContent({ align = "center", className = "", style, children, ...props }) {
  const ctx = React.useContext(HoverCtx);
  if (!ctx.open) return null;
  const alignStyle = align === "start" ? { left: 0 } : align === "end" ? { right: 0 } : { left: "50%", transform: "translateX(-50%)" };
  return (
    <div className={cn("ds-popover ds-hovercard", className)} onMouseEnter={ctx.enter} onMouseLeave={ctx.leave}
      style={{ position: "absolute", top: "calc(100% + 6px)", ...alignStyle, ...style }} {...props}>
      {children}
    </div>
  );
}
