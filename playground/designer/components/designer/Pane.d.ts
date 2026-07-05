/**
 * Pane — collapsible section inside a Panel (36px header, uppercase eyebrow).
 */
export interface PaneProps extends React.HTMLAttributes<HTMLElement> {
  /** Section name — terse noun: "Layout", "Fill", "Effects". */
  title: React.ReactNode;
  /** Header-right controls (IconButtons), click-isolated from collapse. */
  actions?: React.ReactNode;
  /** @default true */
  defaultOpen?: boolean;
  children?: React.ReactNode;
}
