import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * DataTable — sortable, filterable, selectable table with pagination.
 * columns: [{ key, header, sortable, cell?(row), align? }].
 */
export function DataTable({ columns = [], data = [], pageSize = 5, filterKey, filterPlaceholder = "Filter…", selectable = false, className = "", ...props }) {
  const [sort, setSort] = React.useState({ key: null, dir: "asc" });
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState(() => new Set());

  const filtered = React.useMemo(() => {
    if (!filterKey || !query.trim()) return data;
    const q = query.trim().toLowerCase();
    return data.filter((r) => String(r[filterKey] ?? "").toLowerCase().includes(q));
  }, [data, filterKey, query]);

  const sorted = React.useMemo(() => {
    if (!sort.key) return filtered;
    const arr = [...filtered].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (sort.dir === "asc" ? 1 : -1);
    });
    return arr;
  }, [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const clampedPage = Math.min(page, pageCount - 1);
  const rows = sorted.slice(clampedPage * pageSize, clampedPage * pageSize + pageSize);

  const toggleSort = (key) => setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  const allChecked = rows.length > 0 && rows.every((r, i) => selected.has(clampedPage * pageSize + i));
  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      rows.forEach((r, i) => { const id = clampedPage * pageSize + i; allChecked ? next.delete(id) : next.add(id); });
      return next;
    });
  };
  const toggleRow = (id) => setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className={className} {...props}>
      {filterKey && (
        <div style={{ marginBottom: "var(--spacing-3)" }}>
          <input className="ds-input" style={{ maxWidth: 260 }} placeholder={filterPlaceholder} value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} />
        </div>
      )}
      <div className="ds-table-wrap" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
        <table className="ds-table">
          <thead>
            <tr>
              {selectable && <th style={{ width: 40 }}><input type="checkbox" className="ds-checkbox" checked={allChecked} onChange={toggleAll} /></th>}
              {columns.map((c) => (
                <th key={c.key} style={{ textAlign: c.align || "left", cursor: c.sortable ? "pointer" : "default" }} onClick={() => c.sortable && toggleSort(c.key)}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {c.header}
                    {c.sortable && <Icon name={sort.key === c.key ? (sort.dir === "asc" ? "arrow-up" : "arrow-down") : "chevrons-up-down"} size={14} style={{ opacity: sort.key === c.key ? 1 : 0.5 }} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={columns.length + (selectable ? 1 : 0)} style={{ textAlign: "center", padding: "var(--spacing-8)", color: "var(--muted-foreground)" }}>No results.</td></tr>}
            {rows.map((row, i) => {
              const id = clampedPage * pageSize + i;
              return (
                <tr key={id} data-state={selected.has(id) ? "selected" : undefined}>
                  {selectable && <td><input type="checkbox" className="ds-checkbox" checked={selected.has(id)} onChange={() => toggleRow(id)} /></td>}
                  {columns.map((c) => <td key={c.key} style={{ textAlign: c.align || "left" }}>{c.cell ? c.cell(row) : row[c.key]}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "var(--spacing-3)" }}>
        <div style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
          {selectable ? `${selected.size} of ${sorted.length} row(s) selected.` : `${sorted.length} row(s).`}
        </div>
        <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
          <button type="button" className="ds-btn ds-btn--sm ds-btn--outline" disabled={clampedPage === 0} onClick={() => setPage(clampedPage - 1)}>Previous</button>
          <button type="button" className="ds-btn ds-btn--sm ds-btn--outline" disabled={clampedPage >= pageCount - 1} onClick={() => setPage(clampedPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}
