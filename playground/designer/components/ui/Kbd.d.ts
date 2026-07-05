/**
 * Kbd — keyboard shortcut key caps.
 */
export interface KbdProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Key tokens; "mod"→⌘, "shift"→⇧, "alt"→⌥, "ctrl"→⌃, arrows, enter, backspace. */
  keys?: Array<string>;
  /** Single key as child if `keys` omitted. */
  children?: React.ReactNode;
}
