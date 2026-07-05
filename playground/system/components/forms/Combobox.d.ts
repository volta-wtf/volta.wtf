import * as React from "react";
/**
 * Combobox — searchable select (Popover + Command), faithful to shadcn/ui,
 * covering single/multiple, clear, groups, custom items, invalid, disabled,
 * auto-highlight, popup trigger, leading addon and RTL.
 */
export interface ComboboxOption { value: string; label: string; }
export interface ComboboxGroup { label: string; items: (string | ComboboxOption)[]; }
export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Flat items — plain strings or `{ value, label }`. */
  options?: (string | ComboboxOption)[];
  /** Grouped items with labels + separators (alternative to `options`). */
  groups?: ComboboxGroup[] | null;
  /** Selected value(s) — a string, or an array in `multiple` mode. */
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  width?: number;
  /** Multi-select with chips shown in the control. */
  multiple?: boolean;
  /** Show a clear (✕) button when there is a value. */
  showClear?: boolean;
  disabled?: boolean;
  /** Invalid styling (`aria-invalid`). */
  invalid?: boolean;
  /** Highlight the first match while filtering; Enter selects it. */
  autoHighlight?: boolean;
  /** Leading addon (icon) inside the control. */
  icon?: React.ReactNode;
  /** Text direction — "rtl" for right-to-left. */
  dir?: "ltr" | "rtl";
  /** Custom item renderer. */
  renderItem?: (option: ComboboxOption) => React.ReactNode;
  /** Popup mode — supply a trigger element (e.g. a Button); search moves into the popover. */
  trigger?: React.ReactElement;
}
export function Combobox(props: ComboboxProps): JSX.Element;
