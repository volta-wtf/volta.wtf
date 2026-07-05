/**
 * StatusBar — 28px bottom strip (save dot, selection summary, mono coords).
 */
export interface StatusBarProps extends React.HTMLAttributes<HTMLElement> {
  saving?: boolean;
  /** @default 'Saved' */
  savedText?: React.ReactNode;
  /** e.g. "4 layers selected". */
  selection?: React.ReactNode;
  /** Mono right side, e.g. "x 128 y 64 · 75%". */
  right?: React.ReactNode;
}
