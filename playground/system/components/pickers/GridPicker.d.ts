import * as React from "react";

export interface GridPickerItem { value: string; label?: string; node?: React.ReactNode; }
export interface GridPickerGroup { id: string; label: string; icon?: string; items: GridPickerItem[]; separatorAfter?: boolean; }

/** GridPicker — searchable, categorizable grid of selectable items. */
export interface GridPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Category groups (mutually exclusive with `items`). */
  groups?: GridPickerGroup[];
  /** Flat item list (mutually exclusive with `groups`). */
  items?: GridPickerItem[];
  /** Recent items — surfaced by the primitive as a leading "Recents" category (clock icon). */
  recents?: GridPickerItem[];
  /** Label for the built-in recents category. Default "Recents". */
  recentsLabel?: string;
  /** Icon for the built-in recents category. Default "clock". */
  recentsIcon?: string;
  /** Favorite items — a leading "Favorites" category (star icon) after recents; the last leading category gets a trailing separator. */
  favorites?: GridPickerItem[];
  /** Label for the built-in favorites category. Default "Favorites". */
  favoritesLabel?: string;
  /** Icon for the built-in favorites category. Default "star". */
  favoritesIcon?: string;
  /** Selected value. */
  value?: string;
  onSelect?: (value: string, item: GridPickerItem) => void;
  /** Show a search field in the header. */
  search?: boolean;
  /** Server-driven search: called with the query on each keystroke; the `items` you pass are shown as-is (no client filtering). Also shows the search field. */
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  /** Node rendered on its own row above the search field (e.g. a color swatch). */
  headerTop?: React.ReactNode;
  /** Node rendered inline at the end of the search row. */
  headerEnd?: React.ReactNode;
  /** Where category tabs render. Default "bottombar". */
  categories?: "toolbar" | "bottombar" | "none";
  /** "solid" (bordered card, default) or "clear" (no border/background/padding). */
  variant?: "solid" | "clear";
  /** Fixed column count (defaults to responsive auto-fill). */
  columns?: number;
  /** Minimum cell size in px. */
  itemSize?: number;
  emptyText?: string;
}
export function GridPicker(props: GridPickerProps): JSX.Element;
