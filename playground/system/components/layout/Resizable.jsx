import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const ResizeCtx = React.createContext(null);

/** Resizable — alias for ResizablePanelGroup (matches the file/family name). */
export function Resizable(props) { return ResizablePanelGroup(props); }

/** ResizablePanelGroup — drag the handle to resize adjacent panels. */
export function ResizablePanelGroup({ direction = "horizontal", className = "", children, ...props }) {
  const kids = React.Children.toArray(children);
  const panels = kids.filter((c) => c.type === ResizablePanel);
  const [sizes, setSizes] = React.useState(() => {
    const def = panels.map((p) => p.props.defaultSize ?? 100 / panels.length);
    return def;
  });
  const ref = React.useRef(null);
  const drag = (handleIdx, clientPos) => {
    const rect = ref.current.getBoundingClientRect();
    const total = direction === "horizontal" ? rect.width : rect.height;
    const origin = direction === "horizontal" ? rect.left : rect.top;
    const pct = ((clientPos - origin) / total) * 100;
    setSizes((prev) => {
      const next = [...prev];
      const before = next.slice(0, handleIdx).reduce((a, b) => a + b, 0);
      const pair = next[handleIdx] + next[handleIdx + 1];
      let first = Math.max(8, Math.min(pair - 8, pct - before));
      next[handleIdx] = first;
      next[handleIdx + 1] = pair - first;
      return next;
    });
  };
  let panelI = -1;
  return (
    <ResizeCtx.Provider value={{ direction, sizes, drag }}>
      <div ref={ref} data-direction={direction} className={cn("ds-resizable-group", className)} {...props}>
        {kids.map((child) => {
          if (child.type === ResizablePanel) { panelI++; return React.cloneElement(child, { __size: sizes[panelI] }); }
          if (child.type === ResizableHandle) return React.cloneElement(child, { __index: panelI });
          return child;
        })}
      </div>
    </ResizeCtx.Provider>
  );
}
export function ResizablePanel({ __size, defaultSize, minSize, maxSize, className = "", style, children, ...props }) {
  return <div className={cn("ds-resizable-panel", className)} style={{ flexBasis: `${__size}%`, flexGrow: 0, flexShrink: 0, ...style }} {...props}>{children}</div>;
}
export function ResizableHandle({ __index, withHandle = false, className = "", ...props }) {
  const ctx = React.useContext(ResizeCtx);
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const move = (ev) => ctx.drag(__index, ctx.direction === "horizontal" ? ev.clientX : ev.clientY);
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
  };
  return (
    <div role="separator" className={cn("ds-resizable-handle", className)} onPointerDown={onPointerDown} {...props}>
      {withHandle && <div className="ds-resizable-handle-grip"><Icon name="grip-vertical" size={10} /></div>}
    </div>
  );
}
