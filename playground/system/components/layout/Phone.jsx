import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * Phone — an iPhone-style device frame: rounded bezel, Dynamic-Island notch,
 * side buttons, a screen for children, and (optionally) an in-app browser bar
 * (back · url · more) with a home indicator. Presentational shell for mobile
 * mockups and screenshots.
 *
 * `url` (with `bottomBar`, default on when url is set) shows the in-app
 * browser bar. `notch` toggles the Dynamic Island. `width` scales the whole
 * device (default 320). `screen` styles the screen area.
 */
export function Phone({
  url,
  bottomBar,
  notch = true,
  width = 320,
  screen,
  onBack,
  onMore,
  className = "",
  children,
  ...props
}) {
  const showBar = bottomBar != null ? bottomBar : url != null;
  return (
    <div className={cn("ds-phone", className)} style={{ width }} {...props}>
      <span className="ds-phone-btn ds-phone-btn--silent" aria-hidden="true" />
      <span className="ds-phone-btn ds-phone-btn--up" aria-hidden="true" />
      <span className="ds-phone-btn ds-phone-btn--down" aria-hidden="true" />
      <span className="ds-phone-btn ds-phone-btn--power" aria-hidden="true" />
      <div className="ds-phone-screen" style={screen}>
        {notch && <span className="ds-phone-notch" aria-hidden="true" />}
        <div className="ds-phone-content">{children}</div>
        {showBar && (
          <div className="ds-phone-bar">
            <button type="button" className="ds-phone-bar-btn" aria-label="Back" onClick={onBack}><Icon name="chevron-left" size={20} /></button>
            <div className="ds-phone-bar-url">{url}</div>
            <button type="button" className="ds-phone-bar-btn" aria-label="More" onClick={onMore}><Icon name="more-horizontal" size={20} /></button>
          </div>
        )}
        <span className="ds-phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
