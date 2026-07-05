/**
 * Tabs — segmented control (muted track, raised selected pill).
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tab list: strings or {value, label}. */
  items: Array<string | { value: string; label: React.ReactNode }>;
  /** Selected value (controlled). */
  value: string;
  onChange?: (value: string) => void;
  /** Stretch across the container (panel headers). @default false */
  full?: boolean;
}
