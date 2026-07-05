import React from "react";
import { cn } from "../lib/cn.js";

/** MessageScroller — scroll container for a message list that auto-sticks to the bottom. */
export function MessageScroller({ className = "", children, ...props }) {
  const ref = React.useRef(null);
  const stick = React.useRef(true);
  const onScroll = () => {
    const el = ref.current; if (!el) return;
    stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
  };
  React.useEffect(() => {
    const el = ref.current; if (el && stick.current) el.scrollTop = el.scrollHeight;
  });
  return <div ref={ref} onScroll={onScroll} className={cn("ds-message-scroller", className)} {...props}>{children}</div>;
}
