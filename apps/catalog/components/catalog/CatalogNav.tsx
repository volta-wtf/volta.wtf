"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category } from "@/lib/catalog.runtime";

const TYPES: Array<{ key: Category["type"]; label: string }> = [
  { key: "markdown", label: "Docs" },
  { key: "component", label: "Components" },
  { key: "css-classes", label: "Styles/Materials" },
  { key: "variables", label: "Variables" },
  { key: "presets", label: "Presets" },
];

export default function CatalogNav({ categories, active }: { categories: Category[]; active?: string }) {
  const [filter, setFilter] = useState<Category["type"] | "all">("all");
  const list = useMemo(
    () => (filter === "all" ? categories : categories.filter((c) => c.type === filter)),
    [categories, filter]
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button className="px-2 py-1 border rounded text-xs" onClick={() => setFilter("all")} data-active={filter === "all"}>All</button>
        {TYPES.map((t) => (
          <button key={t.key} className="px-2 py-1 border rounded text-xs" onClick={() => setFilter(t.key)} data-active={filter === t.key}>
            {t.label}
          </button>
        ))}
      </div>
      <nav className="space-y-1">
        {list.map((c) => (
          <Link
            key={c.name}
            href={`/${c.name}`}
            className={`block rounded px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${active === c.name ? "bg-accent text-accent-foreground" : ""}`}
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
