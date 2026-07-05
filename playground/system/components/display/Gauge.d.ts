import * as React from "react";
/** Gauge — circular progress arc (Geist). */
export interface GaugeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 0–100. */
  value?: number;
  /** Diameter in px. */
  size?: number;
  strokeWidth?: number;
  /** Show the numeric value in the center. */
  showValue?: boolean;
  /** Arc color (defaults to a red→amber→green scale by value). */
  color?: string;
  /** Track color. */
  secondaryColor?: string;
}
export function Gauge(props: GaugeProps): JSX.Element;
