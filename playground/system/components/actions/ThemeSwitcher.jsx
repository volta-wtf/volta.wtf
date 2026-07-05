import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const OPTIONS = [
  { value: "light", icon: "sun", label: "Light" },
  { value: "system", icon: "laptop", label: "System" },
  { value: "dark", icon: "moon", label: "Dark" },
];

/**
 * ThemeSwitcher — a segmented control for light / system / dark (Geist style).
 * Uncontrolled by default: it reads/writes localStorage `theme` and toggles the
 * `.dark` class on <html>, respecting the OS preference in "system" mode. Pass
 * `value` + `onValueChange` to control it. `showLabels` renders text beside the
 * icons; otherwise it's an icon-only segmented control.
 */
export function ThemeSwitcher({ value: valueProp, defaultValue = "system", onValueChange, showLabels = false, className = "", ...props }) {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const value = isControlled ? valueProp : internal;

  const apply = (v) => {
    if (typeof document === "undefined") return;
    const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = v === "dark" || (v === "system" && sysDark);
    document.documentElement.classList.toggle("dark", dark);
  };

  React.useEffect(() => {
    if (isControlled) { apply(valueProp); return; }
    let initial = defaultValue;
    try { initial = localStorage.getItem("theme") || defaultValue; } catch (e) {}
    setInternal(initial);
    apply(initial);
  }, []);

  React.useEffect(() => { if (isControlled) apply(valueProp); }, [valueProp]);

  const select = (v) => {
    if (!isControlled) { setInternal(v); apply(v); try { localStorage.setItem("theme", v); } catch (e) {} }
    onValueChange && onValueChange(v);
  };

  return (
    <div role="radiogroup" className={cn("ds-theme-switcher", showLabels && "ds-theme-switcher--labelled", className)} {...props}>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          aria-label={o.label}
          data-state={value === o.value ? "on" : "off"}
          className="ds-theme-switcher-btn"
          onClick={() => select(o.value)}
        >
          <Icon name={o.icon} size={16} />
          {showLabels && <span>{o.label}</span>}
        </button>
      ))}
    </div>
  );
}
