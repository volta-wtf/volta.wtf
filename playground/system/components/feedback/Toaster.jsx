import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * Toaster / toast — Sonner-style notifications. Mount <Toaster /> once, then
 * call toast(...) or the typed helpers toast.success/error/warning/info/loading.
 */
const listeners = new Set();
let counter = 0;

function push(opts) {
  const t = typeof opts === "string" ? { title: opts } : opts || {};
  const item = { id: ++counter, duration: 4000, type: "default", ...t };
  listeners.forEach((l) => l(item));
  return item.id;
}
export function toast(opts) { return push(opts); }
toast.success = (title, o = {}) => push({ ...normalize(title, o), type: "success" });
toast.error = (title, o = {}) => push({ ...normalize(title, o), type: "error" });
toast.warning = (title, o = {}) => push({ ...normalize(title, o), type: "warning" });
toast.info = (title, o = {}) => push({ ...normalize(title, o), type: "info" });
toast.loading = (title, o = {}) => push({ ...normalize(title, o), type: "loading", duration: 0 });
toast.message = (title, o = {}) => push({ ...normalize(title, o), type: "default" });
function normalize(title, o) { return typeof title === "object" ? title : { title, ...o }; }

const TYPE_META = {
  success: { icon: "check-circle", color: "oklch(0.55 0.14 150)" },
  error: { icon: "x-circle", color: "var(--destructive)" },
  warning: { icon: "alert-triangle", color: "oklch(0.68 0.16 60)" },
  info: { icon: "info", color: "oklch(0.55 0.13 250)" },
};

export function Toaster({ position = "bottom-right" }) {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    const add = (item) => {
      setItems((prev) => [...prev, item]);
      if (item.duration) setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== item.id)), item.duration);
    };
    listeners.add(add);
    return () => listeners.delete(add);
  }, []);
  const dismiss = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const anchor = position.includes("top") ? { top: 16 } : { bottom: 16 };
  const side = position.includes("left") ? { left: 16 } : { right: 16 };
  return (
    <div style={{ position: "fixed", zIndex: 70, display: "flex", flexDirection: "column", gap: 8, ...anchor, ...side }}>
      {items.map((i) => {
        const meta = TYPE_META[i.type];
        return (
          <div key={i.id} className={cn("ds-toast")}>
            {i.type === "loading" && <Icon name="loader" size={18} className="ds-spinner" />}
            {meta && <Icon name={meta.icon} size={18} style={{ color: meta.color }} />}
            <div className="ds-toast-body">
              {i.title && <div className="ds-toast-title">{i.title}</div>}
              {i.description && <div className="ds-toast-description">{i.description}</div>}
            </div>
            {i.action && (
              <button type="button" className="ds-btn ds-btn--sm ds-btn--outline ds-toast-action"
                onClick={() => { i.action.onClick && i.action.onClick(); dismiss(i.id); }}>{i.action.label}</button>
            )}
          </div>
        );
      })}
    </div>
  );
}
