import * as React from "react";

export interface FloatingMenuAction {
  /** Icon name for the child action. */
  icon?: string;
  /** Label shown beside the child action. */
  label?: string;
  /** Stable key. */
  id?: string | number;
  onClick?: () => void;
}

/**
 * FloatingMenu — expandable floating action button (speed dial). Reveals
 * labelled child actions above the trigger while open.
 */
export interface FloatingMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Child actions revealed when open. */
  actions?: FloatingMenuAction[];
  /** Trigger icon when closed (default "add"). */
  icon?: string;
  /** Trigger icon when open (default "close"). */
  openIcon?: string;
  /** Trigger colour treatment. */
  variant?: "default" | "secondary" | "surface";
  /** Trigger size — sm · md (default) · lg. */
  size?: "sm" | "md" | "lg";
  /** Child-action colour treatment (default "surface"). */
  actionVariant?: "default" | "secondary" | "surface";
  /** Action background style: "label" (chip behind the label) or "icon" (circular backdrop behind the icon). */
  background?: "label" | "icon";
  /** Dim the page with a dismissable Overlay scrim while open. */
  overlay?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export function FloatingMenu(props: FloatingMenuProps): JSX.Element;
