import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const WindowCtx = React.createContext({ platform: "macos" });

/**
 * Window — a generalized window frame (a generalization of Browser): a fixed
 * topbar, an optional toolbar below it, an optional tab strip, and a flexible
 * viewport. Compose the parts:
 *
 *   <Window size="md">
 *     <WindowTopbar onClose={fn} lights>…controls…</WindowTopbar>
 *     <WindowToolbar>…controls…</WindowToolbar>
 *     <WindowTabbar variant="tab" tabs={[…]} onNewTab={fn} />
 *     <WindowContent>…</WindowContent>
 *   </Window>
 *
 * `size` ("sm" | "md" | "lg") scales the topbar/toolbar heights.
 * `platform` ("macos" | "windows") picks the window-control style: macOS traffic
 * lights on the left, or Windows minimize/maximize/close buttons on the right.
 * `variant="muted"` greys the macOS traffic lights.
 */
export function Window({ size = "md", platform = "macos", variant = "default", className = "", children, ...props }) {
  return (
    <WindowCtx.Provider value={{ platform }}>
      <div className={cn("ds-window", className)} data-size={size} data-platform={platform} data-variant={variant} {...props}>
        {children}
      </div>
    </WindowCtx.Provider>
  );
}

/**
 * WindowTopbar — the title/control bar. Window controls are placed by `platform`
 * (inherited from the parent Window, or overridden here): macOS shows traffic
 * lights on the left, Windows shows minimize/maximize/close buttons on the right.
 * Children fill the remaining space via an inner flex region that clips overflow
 * so the bar height never changes. Pass `onClose`/`onMinimize`/`onMaximize`.
 */
export function WindowTopbar({ platform, onClose, onMinimize, onMaximize, className = "", children, ...props }) {
  const ctx = React.useContext(WindowCtx);
  const plat = platform || ctx.platform;
  const isWindows = plat === "windows";
  const isMac = plat === "macos";
  return (
    <div className={cn("ds-window-topbar", className)} data-platform={plat} {...props}>
      {isMac && (
        <span className="ds-window-lights" aria-hidden={onClose ? undefined : "true"}>
          <button type="button" className="ds-window-light ds-window-light--red" aria-label="Close" onClick={onClose} tabIndex={onClose ? 0 : -1} />
          <button type="button" className="ds-window-light ds-window-light--amber" aria-label="Minimize" onClick={onMinimize} tabIndex={onMinimize ? 0 : -1} />
          <button type="button" className="ds-window-light ds-window-light--green" aria-label="Maximize" onClick={onMaximize} tabIndex={onMaximize ? 0 : -1} />
        </span>
      )}
      <div className="ds-window-space">{children}</div>
      {isWindows && (
        <span className="ds-window-controls">
          <button type="button" className="ds-window-ctrl" aria-label="Minimize" onClick={onMinimize}><Icon name="remove" size={15} /></button>
          <button type="button" className="ds-window-ctrl" aria-label="Maximize" onClick={onMaximize}><Icon name="expand" size={13} /></button>
          <button type="button" className="ds-window-ctrl ds-window-ctrl--close" aria-label="Close" onClick={onClose}><Icon name="close" size={15} /></button>
        </span>
      )}
    </div>
  );
}

/** WindowToolbar — a secondary control bar rendered below the topbar. Its
 *  children fill the available width without growing the bar height. */
export function WindowToolbar({ className = "", children, ...props }) {
  return (
    <div className={cn("ds-window-toolbar", className)} {...props}>
      <div className="ds-window-space">{children}</div>
    </div>
  );
}

/** WindowContent — the scrollable viewport that fills the remaining height. */
export function WindowContent({ className = "", children, ...props }) {
  return <div className={cn("ds-window-content", className)} {...props}>{children}</div>;
}

/**
 * WindowTabbar — a tab strip for a Window. `variant`:
 *  - "pill"  — rounded, detached pills (segmented-control feel).
 *  - "tab"   — browser tabs: the active tab has rounded top corners, flush to
 *              the bar's bottom edge.
 *  - "block" — square, edge-to-edge blocks separated by hairlines (Safari-style).
 * Each tab: { id?, title?, icon?, active?, closable?, onClick?, onClose? }.
 * `closePosition` ("left" | "right") places the per-tab close button; defaults to
 * "left" for the block (Safari) variant and "right" otherwise.
 * `onNewTab` appends a trailing "+" button.
 */
export function WindowTabbar({ variant = "tab", tabs = [], onNewTab, closePosition, className = "", ...props }) {
  const closePos = closePosition || (variant === "block" ? "left" : "right");
  const renderClose = (t) => (t.closable !== false && t.onClose) ? (
    <button type="button" className="ds-window-tab-close" aria-label="Close tab" onClick={t.onClose}><Icon name="close" size={14} /></button>
  ) : null;
  return (
    <div className={cn("ds-window-tabbar", className)} data-variant={variant} data-close={closePos} role="tablist" {...props}>
      {tabs.map((t, i) => (
        <span key={t.id != null ? t.id : i} className="ds-window-tab" data-active={t.active ? "" : undefined}>
          {closePos === "left" && renderClose(t)}
          <button type="button" role="tab" className="ds-window-tab-main" aria-selected={t.active ? "true" : "false"} onClick={t.onClick} title={t.title} aria-label={t.title || ("Tab " + (i + 1))}>
            {t.icon != null && <span className="ds-window-tab-icon" aria-hidden="true">{t.icon}</span>}
            {t.title != null && <span className="ds-window-tab-title">{t.title}</span>}
          </button>
          {closePos !== "left" && renderClose(t)}
        </span>
      ))}
      {onNewTab && (
        <button type="button" className="ds-window-tab-new" aria-label="New tab" onClick={onNewTab}><Icon name="add" size={16} /></button>
      )}
    </div>
  );
}
