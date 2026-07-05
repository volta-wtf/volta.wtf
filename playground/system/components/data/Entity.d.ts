import * as React from "react";

/** Entity — two-column data row (media + content · actions); the base for
 *  Contact / User / Account models. Compose with the slot sub-components. */
export interface EntityProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "manage" (default; full row with an actions column) or "data" (compact,
   *  data-only — for selection lists / places that don't expose all model options). */
  variant?: "manage" | "data";
  /** Density preset: xs · sm · default · lg. */
  size?: "xs" | "sm" | "default" | "lg";
  /** Lay title + description on one line with a smaller thumbnail. */
  compact?: boolean;
  /** Show a leading selection checkbox. */
  selectable?: boolean;
  /** Controlled checked state of the leading checkbox. */
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Render a skeleton placeholder (thumbnail + two lines) instead of content. */
  loading?: boolean;
  /** Hover/press affordance for a fully-clickable row. */
  interactive?: boolean;
}
export function Entity(props: EntityProps): JSX.Element;

export function EntityThumbnail(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function EntityContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function EntityTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function EntityDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function EntityActions(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
/** EntityList — container stacking Entity rows. "list" = bordered card with
 *  dividers (default); "ghost" = chrome-less, each row a ghost item (12px radius). */
export function EntityList(props: React.HTMLAttributes<HTMLDivElement> & { variant?: "list" | "ghost" }): JSX.Element;
