import * as React from "react";
/**
 * Overlay — a dimming scrim/backdrop, reusable behind menus, sheets and
 * custom popovers.
 */
export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the scrim is shown. */
  open?: boolean;
  /** Fixed full-viewport (default) or absolute-fill the positioned ancestor. */
  fixed?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export function Overlay(props: OverlayProps): JSX.Element;
