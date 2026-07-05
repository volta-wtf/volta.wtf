/**
 * Input — single-line text input.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** md = 28px, sm = 24px. @default 'md' */
  size?: 'sm' | 'md';
  /** Geist Mono + tabular numerals — for values, names, coordinates. @default false */
  mono?: boolean;
  /** Borderless muted-fill style for dense panels. @default false */
  quiet?: boolean;
}
