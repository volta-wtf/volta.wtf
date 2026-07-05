import * as React from "react";
/**
 * StatusDot — a small colored status indicator dot, optionally pulsing, with an
 * optional trailing label.
 */
export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** State color. */
  status?: "ready" | "error" | "warning" | "info" | "neutral";
  /** Add a soft radiating halo (for live/active states). */
  pulse?: boolean;
  /** Trailing text label. */
  label?: React.ReactNode;
  /** Dot diameter in px (default 8). */
  size?: number;
}
export function StatusDot(props: StatusDotProps): JSX.Element;
