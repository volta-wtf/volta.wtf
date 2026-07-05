/**
 * Menubar — 48px top app bar with identity/doc, center context, right actions.
 */
export interface MenubarProps extends React.HTMLAttributes<HTMLElement> {
  /** Plain-type brand text (no logo mark exists — do not invent one). @default 'Designer' */
  wordmark?: React.ReactNode;
  /** Document name shown as a dropdown button. */
  doc?: React.ReactNode;
  /** Muted meta next to the doc name, e.g. "Draft · saved 2m ago". */
  docMeta?: React.ReactNode;
  /** Extra left content after the doc chip. */
  left?: React.ReactNode;
  /** Centered context: mode tabs, breakpoint switcher. */
  center?: React.ReactNode;
  /** Right actions: share, present, export, avatars. */
  right?: React.ReactNode;
}
