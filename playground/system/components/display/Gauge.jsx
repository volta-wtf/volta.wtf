import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Gauge — a circular progress arc (Geist). `value` 0–100. `size` in px.
 * `colors` maps thresholds to arc color; default greens/ambers/reds by value.
 * `showValue` prints the percentage in the center.
 */
export function Gauge({ value = 0, size = 48, strokeWidth, showValue = true, color, secondaryColor, className = "", ...props }) {
  const v = Math.max(0, Math.min(100, value));
  const sw = strokeWidth ?? Math.max(3, Math.round(size / 10));
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const dash = (v / 100) * c;
  const arc = color || (v < 34 ? "var(--destructive)" : v < 67 ? "oklch(0.8 0.16 82)" : "oklch(0.7 0.16 162)");
  return (
    <span className={cn("ds-gauge", className)} style={{ width: size, height: size }} role="meter" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} {...props}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={secondaryColor || "var(--secondary)"} strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={arc} strokeWidth={sw} strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`} style={{ transition: "stroke-dasharray var(--duration-normal) var(--ease-out)" }} />
      </svg>
      {showValue && <span className="ds-gauge-value" style={{ fontSize: Math.max(10, size * 0.26) }}>{Math.round(v)}</span>}
    </span>
  );
}
