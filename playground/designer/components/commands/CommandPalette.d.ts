/**
 * CommandPalette — ⌘K command runner over data/keybindings.json.
 */
import type { CommandGroup } from './ShortcutsOverlay';

export interface Command { id: string; title: string; icon?: string; keys?: string[]; group?: string; }

export interface CommandPaletteProps {
  groups: CommandGroup[];
  open: boolean;
  onClose?: () => void;
  onRun?: (command: Command) => void;
  /** @default 'Type a command…' */
  placeholder?: string;
}
