import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";
import { SearchInput } from "../forms/SearchInput.jsx";

/**
 * GridPicker — a primitive that lays out selectable items in a grid, with an
 * optional search field in the header and optional category tabs in a toolbar
 * (top) or bottombar. The building block for EmojiPicker/PictoPicker/IconPicker
 * and any "pick one from many" surface.
 *
 * Pass either a flat `items` list or category `groups`:
 *   items:  [{ value, label?, node }]
 *   groups: [{ id, label, icon?, items: [{ value, label?, node }] }]
 * `node` is what renders inside each cell (an <Emoji>, <Picto>, <Icon>, image…).
 */
export function GridPicker({
  groups,
  items,
  value,
  onSelect,
  search = false,
  onSearch,
  searchPlaceholder = "Search…",
  headerEnd,
  headerTop,
  recents,
  recentsLabel = "Recents",
  recentsIcon = "clock",
  favorites,
  favoritesLabel = "Favorites",
  favoritesIcon = "star",
  categories = "bottombar", // "toolbar" | "bottombar" | "none"
  variant = "solid", // "solid" (bordered card) | "clear" (no border/background/padding)
  columns,
  itemSize = 40,
  emptyText = "No results.",
  className = "",
  ...props
}) {
  const baseList = groups || (items ? [{ id: "__all", label: "All", items }] : []);
  // `recents` / `favorites` item lists are surfaced by the primitive as leading
  // categories (clock / star) with a single trailing separator after the last.
  const leading = [];
  if (recents && recents.length) leading.push({ id: "__recents", label: recentsLabel, icon: recentsIcon, items: recents });
  if (favorites && favorites.length) leading.push({ id: "__favorites", label: favoritesLabel, icon: favoritesIcon, items: favorites });
  if (leading.length) leading[leading.length - 1] = { ...leading[leading.length - 1], separatorAfter: true };
  const groupList = [...leading, ...baseList];
  const [query, setQuery] = React.useState("");
  const [cat, setCat] = React.useState(groupList[0] ? groupList[0].id : null);
  // With `onSearch`, filtering is delegated to the caller (server-driven): the
  // items passed in are already the results, so we don't client-filter.
  const serverSearch = typeof onSearch === "function";
  const q = serverSearch ? "" : query.trim().toLowerCase();
  const showCats = categories !== "none" && groupList.length > 1 && !q;

  const matches = (it) => (String(it.label || it.value || "")).toLowerCase().includes(q);
  const visible = q
    ? groupList.map((g) => ({ ...g, items: g.items.filter(matches) })).filter((g) => g.items.length)
    : showCats
    ? groupList.filter((g) => g.id === cat)
    : groupList;
  const showLabels = q || (categories === "none" && groupList.length > 1) || (!showCats && groupList.length > 1);
  const total = visible.reduce((n, g) => n + g.items.length, 0);

  const cats = showCats && (
    <div className="ds-gridpicker-cats scroll-fade-x" data-pos={categories}>
      {groupList.map((g) => (
        <React.Fragment key={g.id}>
          <button type="button" data-active={g.id === cat ? "" : undefined} onClick={() => setCat(g.id)} className="ds-gridpicker-cat" aria-label={g.label} title={g.label}>
            {g.icon ? <Icon name={g.icon} size={16} /> : g.label}
          </button>
          {g.separatorAfter && <span className="ds-gridpicker-cat-sep" aria-hidden="true" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={cn("ds-gridpicker", className)} data-variant={variant} {...props}>
      {(search || serverSearch || headerEnd || headerTop) && (
        <div className="ds-gridpicker-header">
          {headerTop && <div className="ds-gridpicker-header-top">{headerTop}</div>}
          {(search || serverSearch || headerEnd) && (
            <div className="ds-gridpicker-header-row">
              {(search || serverSearch) && (
                <SearchInput
                  value={query}
                  placeholder={searchPlaceholder}
                  onChange={(v) => { setQuery(v); if (serverSearch) onSearch(v); }}
                  style={{ flex: 1, minWidth: 0 }}
                />
              )}
              {headerEnd}
            </div>
          )}
        </div>
      )}
      {categories === "toolbar" && cats}
      <div className="ds-gridpicker-scroll">
        {total === 0 && <div className="ds-gridpicker-empty">{emptyText}</div>}
        {visible.map((g) => (
          <div key={g.id}>
            {showLabels && <div className="ds-gridpicker-group-label">{g.label}</div>}
            <div className="ds-gridpicker-grid" style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}>
              {g.items.map((it) => (
                <button
                  key={it.value}
                  type="button"
                  data-active={value === it.value ? "" : undefined}
                  onClick={() => onSelect && onSelect(it.value, it)}
                  className="ds-gridpicker-item"
                  style={columns ? { minWidth: 0 } : { minWidth: itemSize, minHeight: itemSize }}
                  title={it.label || it.value}
                  aria-label={it.label || it.value}
                >
                  {it.node}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {categories === "bottombar" && cats}
    </div>
  );
}
