import React from "react";
import { cn } from "../lib/cn.js";

/**
 * Chart — faithful to shadcn's Chart API surface: a ChartContainer driven by a
 * `config` map ({ key: { label, color } }) that exposes --color-<key> vars,
 * plus a lightweight SVG renderer (bar | line) so it works without recharts.
 */
const ChartCtx = React.createContext({ config: {} });

export function ChartContainer({ config = {}, className = "", style, children, ...props }) {
  const vars = {};
  Object.entries(config).forEach(([k, v]) => { if (v && v.color) vars[`--color-${k}`] = v.color; });
  return (
    <ChartCtx.Provider value={{ config }}>
      <div className={cn("ds-chart", className)} style={{ ...vars, ...style }} {...props}>{children}</div>
    </ChartCtx.Provider>
  );
}

export function ChartLegend({ className = "", ...props }) {
  const { config } = React.useContext(ChartCtx);
  return (
    <div className={cn("ds-chart-legend", className)} {...props}>
      {Object.entries(config).map(([k, v]) => (
        <span key={k} className="ds-chart-legend-item">
          <span className="ds-chart-legend-swatch" style={{ background: `var(--color-${k}, ${v.color})` }} />
          {v.label || k}
        </span>
      ))}
    </div>
  );
}

/** Chart — SVG bar or line chart. data: [{ label, <key>: number }]. */
export function Chart({ data = [], type = "bar", height = 240, className = "", ...props }) {
  const { config } = React.useContext(ChartCtx);
  const keys = Object.keys(config);
  const [hover, setHover] = React.useState(null);
  const max = Math.max(1, ...data.flatMap((d) => keys.map((k) => Number(d[k]) || 0)));
  const W = 640, H = height, padL = 32, padB = 28, padT = 12, padR = 12;
  const iw = W - padL - padR, ih = H - padB - padT;
  const groupW = iw / data.length;

  return (
    <div className={className} style={{ position: "relative" }} {...props}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={height} role="img" onMouseLeave={() => setHover(null)}>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={padL} x2={W - padR} y1={padT + ih * t} y2={padT + ih * t} stroke="var(--border)" strokeWidth="1" />
        ))}
        {data.map((d, i) => {
          const gx = padL + i * groupW;
          if (type === "bar") {
            const bw = (groupW * 0.7) / keys.length;
            const gpad = groupW * 0.15;
            return (
              <g key={i} onMouseEnter={() => setHover(i)}>
                {keys.map((k, ki) => {
                  const v = Number(d[k]) || 0; const bh = (v / max) * ih;
                  return <rect key={k} x={gx + gpad + ki * bw} y={padT + ih - bh} width={bw - 2} height={bh} rx="3" fill={`var(--color-${k})`} opacity={hover == null || hover === i ? 1 : 0.4} />;
                })}
              </g>
            );
          }
          return null;
        })}
        {type === "line" && keys.map((k) => {
          const pts = data.map((d, i) => `${padL + groupW * (i + 0.5)},${padT + ih - ((Number(d[k]) || 0) / max) * ih}`).join(" ");
          return <polyline key={k} points={pts} fill="none" stroke={`var(--color-${k})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
        })}
        {data.map((d, i) => (
          <text key={i} x={padL + groupW * (i + 0.5)} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">{d.label}</text>
        ))}
      </svg>
      {hover != null && (
        <div className="ds-chart-tooltip" style={{ position: "absolute", top: 8, left: `${(padL + groupW * (hover + 0.5)) / W * 100}%`, transform: "translateX(-50%)", pointerEvents: "none" }}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>{data[hover].label}</div>
          {keys.map((k) => (
            <div key={k} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="ds-chart-legend-swatch" style={{ background: `var(--color-${k})` }} />
              <span style={{ color: "var(--muted-foreground)" }}>{config[k].label || k}</span>
              <span style={{ marginLeft: "auto", fontWeight: 500 }}>{data[hover][k]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
