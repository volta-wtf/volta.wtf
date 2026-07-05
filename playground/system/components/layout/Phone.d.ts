import * as React from "react";
/**
 * Phone — iPhone-style device frame (bezel, Dynamic Island, side buttons,
 * screen) with an optional in-app browser bar. Presentational shell.
 */
export interface PhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL shown in the in-app browser bar (enables the bar unless overridden). */
  url?: string;
  /** Force the bottom browser bar on/off. */
  bottomBar?: boolean;
  /** Show the Dynamic Island notch (default true). */
  notch?: boolean;
  /** Device width in px (the frame scales to it). Default 320. */
  width?: number;
  /** Inline styles for the screen area (e.g. background). */
  screen?: React.CSSProperties;
  onBack?: () => void;
  onMore?: () => void;
}
export function Phone(props: PhoneProps): JSX.Element;
