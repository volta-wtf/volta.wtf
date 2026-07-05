/**
 * FilterStack — data-driven SVG filter plugins with live preview.
 */
export interface FilterPrimitive {
  tag: string;
  attrs: Record<string, string | number>;
  children?: FilterPrimitive[];
}
export interface FilterPreset {
  id: string;
  name: string;
  icon?: string;
  primitives: FilterPrimitive[];
}

export interface FilterStackProps {
  /** Feed data/filters.json `presets`. */
  presets: FilterPreset[];
  /** Controlled enabled set; omit for internal state. */
  enabledIds?: string[];
  onToggle?: (id: string) => void;
  /** Custom node to run the filters on. */
  preview?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
