/**
 * ShortcutsOverlay — grouped keyboard-shortcut reference grid.
 */
export interface CommandGroup {
  id: string;
  name: string;
  commands: Array<{ id: string; title: string; icon?: string; keys?: string[] }>;
}

export interface ShortcutsOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Feed data/keybindings.json `groups`. */
  groups: CommandGroup[];
}
