import * as React from "react";

export interface SearchInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled value. Omit for uncontrolled use with `defaultValue`. */
  value?: string;
  /** Initial value when uncontrolled. Default "". */
  defaultValue?: string;
  /** Fires with the new string on every keystroke and on clear. */
  onChange?: (value: string) => void;
  /** Fires on Enter, and on the debounced value when `debounce` > 0. Also fires with "" on clear. */
  onSearch?: (value: string) => void;
  /** Fires when the clear (✕) button is pressed. */
  onClear?: () => void;
  /** Placeholder text. Default "Search…". */
  placeholder?: string;
  /** Field height preset. sm 30 · default 34 · lg 40 (px). */
  size?: "sm" | "default" | "lg";
  /** Leading icon name. Default "search". */
  icon?: string;
  /** Debounce (ms) before `onSearch` fires while typing. 0 = only on Enter. */
  debounce?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

/** SearchInput — search field with leading icon and a clear (✕) button. */
export declare function SearchInput(props: SearchInputProps): JSX.Element;
