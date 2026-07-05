import React from "react";
import { cn } from "../lib/cn.js";
import { Checkbox } from "../forms/Checkbox.jsx";
import { Skeleton } from "../display/Skeleton.jsx";

/**
 * Entity — a two-column row: a leading media/thumbnail + content (title and up
 * to a few lines of metadata) on the left, and controls/actions on the right.
 * It is the base row for data models — Contact, User, Account, etc. — that you
 * compose by filling the slots.
 *
 *   <Entity>
 *     <EntityThumbnail><Avatar …/></EntityThumbnail>
 *     <EntityContent>
 *       <EntityTitle>Evil Rabbit</EntityTitle>
 *       <EntityDescription>evil@rabbit.com</EntityDescription>
 *     </EntityContent>
 *     <EntityActions><Button size="sm" variant="outline">Manage</Button></EntityActions>
 *   </Entity>
 *
 * Props:
 *  - `variant` — "manage" (default; full row with an actions column) or "data"
 *    (compact, data-only — for selection lists and places that don't expose the
 *    model's full options).
 *  - `size` — density preset: xs · sm · default · lg.
 *  - `compact` — lay the title + description on a single line with a smaller
 *    thumbnail (for the densest selection lists).
 *  - `selectable` + `checked`/`defaultChecked`/`onCheckedChange` — leading checkbox.
 *  - `loading` — render a skeleton placeholder (thumbnail + two lines).
 *  - `interactive` — hover/press affordance (use when the whole row is clickable).
 */
export function Entity({
  variant = "manage",
  size = "default",
  compact = false,
  selectable = false,
  checked,
  defaultChecked,
  onCheckedChange,
  loading = false,
  interactive = false,
  className = "",
  children,
  ...props
}) {
  if (loading) {
    return (
      <div className={cn("ds-entity", "ds-entity--loading", compact && "ds-entity--compact", className)} data-variant={variant} data-size={size} aria-busy="true" {...props}>
        <Skeleton className="ds-entity-thumb-skeleton" />
        <div className="ds-entity-content">
          <Skeleton style={{ width: "42%", height: 12, borderRadius: 6 }} />
          <Skeleton style={{ width: "62%", height: 10, borderRadius: 6 }} />
        </div>
      </div>
    );
  }
  return (
    <div className={cn("ds-entity", interactive && "ds-entity--interactive", compact && "ds-entity--compact", className)} data-variant={variant} data-size={size} {...props}>
      {selectable && (
        <div className="ds-entity-check">
          <Checkbox checked={checked} defaultChecked={defaultChecked} onCheckedChange={onCheckedChange} aria-label="Select" />
        </div>
      )}
      {children}
    </div>
  );
}

/** EntityThumbnail — leading avatar / icon / logo cell. */
export function EntityThumbnail({ className = "", ...props }) {
  return <div className={cn("ds-entity-thumb", className)} {...props} />;
}

/** EntityContent — the stacked title + metadata column (grows to fill). */
export function EntityContent({ className = "", ...props }) {
  return <div className={cn("ds-entity-content", className)} {...props} />;
}

/** EntityTitle — primary label. */
export function EntityTitle({ className = "", ...props }) {
  return <div className={cn("ds-entity-title", className)} {...props} />;
}

/** EntityDescription — a line of secondary metadata (repeat for several lines). */
export function EntityDescription({ className = "", ...props }) {
  return <div className={cn("ds-entity-description", className)} {...props} />;
}

/** EntityActions — trailing controls, pinned to the right. */
export function EntityActions({ className = "", ...props }) {
  return <div className={cn("ds-entity-actions", className)} {...props} />;
}

/** EntityList — container for stacked Entity rows. `variant`: "list" (default;
 *  bordered card with hairline dividers) or "ghost" (no chrome — each row is a
 *  ghost item with 12px radius, spaced). */
export function EntityList({ variant = "list", className = "", ...props }) {
  return <div className={cn("ds-entity-list", className)} data-variant={variant} {...props} />;
}
