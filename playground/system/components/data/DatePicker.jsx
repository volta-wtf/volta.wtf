import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";
import { Calendar } from "./Calendar.jsx";

/** DatePicker — a button that opens a Calendar in a popover. */
export function DatePicker({ value, defaultValue, onChange, placeholder = "Pick a date", width = 240, className = "", ...props }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue || null);
  const date = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const label = date ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : placeholder;
  const pick = (d) => { if (!isControlled) setInternal(d); onChange && onChange(d); setOpen(false); };
  return (
    <div ref={ref} className={className} style={{ position: "relative", width }} {...props}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="ds-btn ds-btn--default ds-btn--outline"
        style={{ width: "100%", justifyContent: "flex-start", gap: "var(--spacing-2)", color: date ? "var(--foreground)" : "var(--muted-foreground)" }}>
        <Icon name="calendar" size={16} /> {label}
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 50, border: "1px solid var(--border)", borderRadius: "var(--radius-md)", background: "var(--popover)", boxShadow: "var(--shadow-md)" }}>
          <Calendar defaultSelected={date} onSelect={pick} />
        </div>
      )}
    </div>
  );
}
