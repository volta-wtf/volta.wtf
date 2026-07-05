import React from "react";
import { GridPicker } from "./GridPicker.jsx";
import { Icon } from "../icons/Icon.jsx";

/**
 * ColorPicker — a GridPicker specialized for picking a single color from a
 * swatch grid. Each swatch is a circle; the selected one shows an accent ring
 * and a contrast-aware check.
 *
 * `colors` accepts hex strings or `{ value, label }` objects. Pass `groups`
 * (GridPicker shape, each item a color) instead for categorized palettes.
 * Controlled via `value` + `onChange`, or uncontrolled via `defaultValue`.
 */

// A pleasant 15-swatch default palette (warm → cool → magenta).
export const DEFAULT_SWATCHES = [
  "#6d4322", "#d2601a", "#f5921b", "#f5c518", "#a3c626",
  "#2fa84f", "#12a594", "#17b0e8", "#1f6fd6", "#4d5ae5",
  "#9b32d4", "#d81fd8", "#e0347f", "#e42222", "#8b93a6",
];

/* Relative luminance of a #rrggbb hex → 0..1. Used to pick a readable check. */
function luminance(hex) {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || "");
  if (!m) return 0.5;
  const [r, g, b] = [1, 2, 3].map((i) => {
    const c = parseInt(m[i], 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function Swatch({ color, selected, size }) {
  const check = luminance(color) > 0.55 ? "#111418" : "#ffffff";
  return (
    <span
      className="ds-color-swatch"
      data-selected={selected ? "" : undefined}
      style={{ width: size, height: size, background: color }}
    >
      {selected && <Icon name="check" size={Math.round(size * 0.5)} style={{ color: check }} strokeWidth={3} />}
    </span>
  );
}

export function ColorPicker({
  colors = DEFAULT_SWATCHES,
  groups,
  value,
  defaultValue,
  onChange,
  columns = 5,
  swatchSize = 34,
  variant = "clear",
  ...props
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const val = controlled ? value : inner;

  const toItem = (c) => {
    const hex = typeof c === "string" ? c : c.value;
    const label = typeof c === "string" ? c : (c.label || c.value);
    return { value: hex, label, node: <Swatch color={hex} selected={val === hex} size={swatchSize} /> };
  };

  const select = (v) => {
    if (!controlled) setInner(v);
    onChange && onChange(v);
  };

  const gridProps = groups
    ? { groups: groups.map((g) => ({ ...g, items: g.items.map(toItem) })) }
    : { items: colors.map(toItem), categories: "none" };

  return (
    <GridPicker
      className="ds-colorpicker"
      value={val}
      onSelect={select}
      columns={columns}
      itemSize={swatchSize + 8}
      variant={variant}
      {...gridProps}
      {...props}
    />
  );
}
