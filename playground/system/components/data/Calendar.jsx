import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const iso = (d) => d.toISOString().slice(0, 10);

/** Calendar — month grid date picker. Controlled via `selected`+`onSelect` or uncontrolled. */
export function Calendar({ selected, defaultSelected, onSelect, month, defaultMonth, disabled, className = "", ...props }) {
  const isSelControlled = selected !== undefined;
  const [selInternal, setSelInternal] = React.useState(defaultSelected || null);
  const sel = isSelControlled ? selected : selInternal;

  const start = (defaultMonth || sel || new Date());
  const [view, setView] = React.useState(new Date(start.getFullYear(), start.getMonth(), 1));
  const cur = month || view;

  const today = new Date();
  const firstDay = new Date(cur.getFullYear(), cur.getMonth(), 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    const d = new Date(cur.getFullYear(), cur.getMonth(), i - startOffset + 1);
    cells.push({ date: d, outside: true });
  }
  for (let day = 1; day <= daysInMonth; day++) cells.push({ date: new Date(cur.getFullYear(), cur.getMonth(), day), outside: false });
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), outside: true });
  }

  const pick = (d) => { if (!isSelControlled) setSelInternal(d); onSelect && onSelect(d); };
  const shift = (n) => setView(new Date(cur.getFullYear(), cur.getMonth() + n, 1));

  return (
    <div className={cn("ds-calendar", className)} {...props}>
      <div className="ds-calendar-header">
        <div className="ds-calendar-caption">{MONTHS[cur.getMonth()]} {cur.getFullYear()}</div>
        <div className="ds-calendar-nav">
          <button type="button" className="ds-calendar-nav-btn" aria-label="Previous month" onClick={() => shift(-1)}><Icon name="chevron-left" size={16} /></button>
          <button type="button" className="ds-calendar-nav-btn" aria-label="Next month" onClick={() => shift(1)}><Icon name="chevron-right" size={16} /></button>
        </div>
      </div>
      <table className="ds-calendar-grid">
        <thead><tr>{WEEKDAYS.map((w) => <th key={w}>{w}</th>)}</tr></thead>
        <tbody>
          {Array.from({ length: cells.length / 7 }).map((_, r) => (
            <tr key={r}>
              {cells.slice(r * 7, r * 7 + 7).map(({ date, outside }) => {
                const isDisabled = disabled ? disabled(date) : false;
                return (
                  <td key={iso(date)} style={{ padding: 0 }}>
                    <button type="button" disabled={isDisabled} onClick={() => pick(date)}
                      data-outside={outside || undefined}
                      data-today={iso(date) === iso(today) || undefined}
                      data-selected={sel && iso(date) === iso(sel) || undefined}
                      className="ds-calendar-day">{date.getDate()}</button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
