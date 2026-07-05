import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";
import { Window, WindowTopbar, WindowContent, WindowTabbar } from "./Window.jsx";

/**
 * Browser — a browser-window chrome frame built on top of Window: traffic-light
 * dots (Window's macOS controls), nav controls (back / forward / refresh), an
 * address bar with a copy affordance, and a content area for children. Tab
 * strips are rendered with WindowTabbar.
 *
 * `url` shows in the address bar (centered by default; set `align="left"`).
 * `variant="muted"` greys the traffic-light dots. `lights` toggles those dots.
 * `nav` picks the nav buttons ("full" = back/forward/refresh, "back" = back only,
 * "none" = hidden). `onBack`/`onForward`/`onRefresh`/`onCopy` are optional handlers.
 * `compact` uses Window's small topbar. `height` caps the content area.
 * With `tabs`, `onNewTab` appends a "+" button. Tab placement:
 *  - inline (default): tabs fill the topbar in place of the address bar.
 *  - `tabsRow`: a macOS-style tab row below the toolbar (address bar kept on top).
 *  - `tabsRow="square"`: a square (Safari-style) tab row below the toolbar.
 *  - `tabsRow="bottom"`: a square tab row below the content (Safari bottom bar).
 */
export function Browser({
  url = "",
  favicon,
  tabs,
  tabsRow = false,
  onNewTab,
  align = "center",
  variant = "default",
  compact = false,
  lights = true,
  controls = true,
  nav,
  onBack,
  onForward,
  onRefresh,
  onCopy,
  height,
  className = "",
  children,
  ...props
}) {
  const navMode = nav || (controls ? "full" : "none");
  const copy = () => {
    if (onCopy) return onCopy(url);
    if (url && typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(url);
  };
  const inlineTabs = tabs && !tabsRow;
  // Map Browser tab objects onto WindowTabbar's shape (favicon → icon).
  const wtabs = (tabs || []).map((t) => ({
    id: t.id, title: t.title, icon: t.favicon, active: t.active,
    closable: t.closable, onClick: t.onClick, onClose: t.onClose,
  }));

  const navEl = navMode !== "none" && (
    <span className="ds-browser-nav">
      <button type="button" className="ds-browser-btn" aria-label="Back" onClick={onBack}><Icon name="back" size={18} /></button>
      {navMode === "full" && <button type="button" className="ds-browser-btn" aria-label="Forward" onClick={onForward}><Icon name="forward" size={18} /></button>}
      {navMode === "full" && !inlineTabs && <button type="button" className="ds-browser-btn" aria-label="Refresh" onClick={onRefresh}><Icon name="refresh" size={16} /></button>}
    </span>
  );
  const addressEl = (
    <span className="ds-browser-address" data-align={align}>
      {align === "center" && <span className="ds-browser-copy" aria-hidden="true" style={{ visibility: "hidden" }} />}
      {favicon != null && <span className="ds-browser-favicon" aria-hidden="true">{favicon}</span>}
      <span className="ds-browser-url">{url}</span>
      <button type="button" className="ds-browser-copy" aria-label="Copy URL" onClick={copy}><Icon name="copy" size={15} /></button>
    </span>
  );

  const topTabbar = tabs && tabsRow && tabsRow !== "bottom" && (
    <WindowTabbar variant={tabsRow === "square" ? "block" : "tab"} tabs={wtabs} onNewTab={onNewTab} />
  );
  const bottomTabbar = tabs && tabsRow === "bottom" && (
    <WindowTabbar variant="block" tabs={wtabs} onNewTab={onNewTab} />
  );

  return (
    <Window
      variant={variant}
      size={compact ? "sm" : "md"}
      platform={lights ? "macos" : "none"}
      className={cn("ds-browser", className)}
      {...props}
    >
      <WindowTopbar className={inlineTabs ? "ds-browser-topbar--tabs" : undefined}>
        {navEl}
        {inlineTabs ? <WindowTabbar variant="tab" tabs={wtabs} onNewTab={onNewTab} /> : addressEl}
      </WindowTopbar>
      {topTabbar}
      {(children != null || height != null) && (
        <WindowContent style={height != null ? { height } : undefined}>{children}</WindowContent>
      )}
      {bottomTabbar}
    </Window>
  );
}
