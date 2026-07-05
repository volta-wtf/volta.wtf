/**
 * GradientEditor — gradient micro-tool with presets and CSS output.
 */
export interface GradientStop { color: string; position: number; }
export interface GradientValue {
  type: 'linear' | 'radial' | 'conic';
  angle?: number;
  stops: GradientStop[];
}

export interface GradientEditorProps {
  value?: GradientValue;
  defaultValue?: GradientValue;
  onChange?: (value: GradientValue) => void;
  /** Preset chips — feed data/gradients.json `presets`. */
  presets?: Array<GradientValue & { id: string; name: string }>;
  className?: string;
  style?: React.CSSProperties;
}
