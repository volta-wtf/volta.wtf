import Link from "next/link";
import type { Category } from "@/lib/catalog.runtime";

export default function ItemsList({ category, activeItem }: { category: Category; activeItem: string | null }) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">{category.items.length} items · {category.type} · view: {category.view}</div>
      <ul className="space-y-1">
        {category.items.map((i) => {
          const href = `/${category.name}/${i.slug}`;
          const isActive = activeItem === i.slug;
          const meta =
            category.type === "markdown" ? i.mdPath :
            category.type === "component" ? i.componentName :
            category.type === "css-classes" ? (i.cssClass ?? i.variableName) :
            category.type === "variables" ? i.variableName :
            /* presets */ i.presetName;

          return (
            <li key={i.slug}>
              <Link href={href} className={`block rounded px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${isActive ? "bg-accent text-accent-foreground" : ""}`}>
                <div className="font-medium">{i.title}</div>
                {meta ? <div className="text-xs text-muted-foreground truncate">{meta}</div> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
