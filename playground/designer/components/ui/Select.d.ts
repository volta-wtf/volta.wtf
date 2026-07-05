/**
 * Select — styled native select with chevron.
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Option list: plain strings or {value, label}. */
  options?: Array<string | { value: string; label: string }>;
  /** md = 28px, sm = 24px. @default 'md' */
  size?: 'sm' | 'md';
  /** Borderless muted-fill style for dense panels. @default false */
  quiet?: boolean;
}
