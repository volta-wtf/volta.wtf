import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";
import { DismissButton } from "../actions/DismissButton.jsx";

/**
 * SearchInput — a search field with a leading search icon and a trailing
 * dismiss (✕) button that clears the field. The clear button only appears
 * while there is text. Works controlled (`value` + `onChange`) or uncontrolled
 * (`defaultValue`). `onChange` receives the string value; `onSearch` fires on
 * Enter / on the debounced value if `debounce` is set.
 *
 * Sizes match InputGroup: sm 30 · default 34 · lg 40 (px).
 */
export function SearchInput({
  value,
  defaultValue = "",
  onChange,
  onSearch,
  onClear,
  placeholder = "Search…",
  size = "default",
  icon = "search",
  debounce = 0,
  disabled = false,
  autoFocus = false,
  className = "",
  ...props
}) {
  const controlled = value != null;
  const [inner, setInner] = React.useState(defaultValue);
  const q = controlled ? value : inner;
  const inputRef = React.useRef(null);
  const timer = React.useRef(null);

  const height = size === "sm" ? 30 : size === "lg" ? 40 : 34;
  const iconSize = size === "sm" ? 14 : size === "lg" ? 17 : 15;

  const emit = (next) => {
    if (!controlled) setInner(next);
    onChange && onChange(next);
    if (onSearch && debounce > 0) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => onSearch(next), debounce);
    }
  };

  const clear = () => {
    if (!controlled) setInner("");
    onChange && onChange("");
    onClear && onClear();
    if (onSearch) onSearch("");
    inputRef.current && inputRef.current.focus();
  };

  React.useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className={cn("ds-input-group", "ds-search-input", className)} data-size={size} style={{ height }} {...props}>
      <div className="ds-input-group-addon ds-input-group-addon--inline-start">
        <Icon name={icon} size={iconSize} />
      </div>
      <input
        ref={inputRef}
        type="search"
        className="ds-input-group-input"
        placeholder={placeholder}
        value={q}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={(e) => emit(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && onSearch) onSearch(q); }}
      />
      {q && !disabled && (
        <div className="ds-input-group-addon ds-input-group-addon--inline-end">
          <DismissButton size="xs" aria-label="Clear search" onClick={clear} />
        </div>
      )}
    </div>
  );
}
