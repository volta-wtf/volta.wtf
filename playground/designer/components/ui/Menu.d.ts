/**
 * Menu — dropdown/context menu. Items are data (like keybindings.json).
 */
export interface MenuItem {
  id?: string;
  title?: string;
  icon?: string;
  keys?: string[];
  danger?: boolean;
  disabled?: boolean;
  /** Or pass the string '-' for a separator. */
  separator?: boolean;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<MenuItem | '-'>;
  onSelect?: (item: MenuItem) => void;
}
