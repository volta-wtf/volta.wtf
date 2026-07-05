import * as React from "react";
/**
 * Browser — browser-window chrome built on Window (traffic lights, nav controls,
 * address bar) wrapping arbitrary content. Tab strips use WindowTabbar.
 */
export interface BrowserProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL shown in the address bar. */
  url?: string;
  /** Address text alignment — "center" (default) or "left". */
  align?: "center" | "left";
  /** Optional leading favicon node shown before the URL. */
  favicon?: React.ReactNode;
  /** Show browser tabs (favicon + optional title) in the bar instead of the address input. */
  tabs?: Array<{ id?: string; title?: string; favicon?: React.ReactNode; active?: boolean; closable?: boolean; onClick?: () => void; onClose?: () => void }>;
  /** With `tabs`: handler for a trailing "+" new-tab button (whole-block hover, add icon). Omit to hide it. */
  onNewTab?: () => void;
  /** With `tabs`: render them in a macOS-style second-level bar below the toolbar (keeps the address bar on top). `"bottom"` places that bar below the content (Safari-style bottom tabbar); `"square"` puts the square Safari-style bar directly below the toolbar (above content). */
  tabsRow?: boolean | "bottom" | "square";
  /** Traffic-light dot style — "default" (colored) or "muted" (grey). */
  variant?: "default" | "muted";
  /** Slimmer bar for space-tight embeds (pairs with lights=false / nav="none" for a bar-only frame). */
  compact?: boolean;
  /** Show the traffic-light dots (Window's macOS controls). Default true. */
  lights?: boolean;
  /** Nav buttons: "full" = back/forward/refresh, "back" = back only, "none" = hidden. Overrides `controls`. */
  nav?: "full" | "back" | "none";
  /** Show the back/forward/refresh controls (default true). Equivalent to nav "full"/"none". */
  controls?: boolean;
  onBack?: () => void;
  onForward?: () => void;
  onRefresh?: () => void;
  /** Copy handler; defaults to writing `url` to the clipboard. */
  onCopy?: (url: string) => void;
  /** Fixed content-area height (px or CSS length). */
  height?: number | string;
}
export function Browser(props: BrowserProps): JSX.Element;
