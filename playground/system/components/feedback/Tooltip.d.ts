import * as React from "react";
/** Tooltip — hover/focus label, faithful to shadcn/ui + Radix. */
export interface TooltipContentProps extends React.HTMLAttributes<HTMLSpanElement> {
  side?: "top" | "right" | "bottom" | "left";
  /** "default" (larger, with arrow) or "sm" (compact, no arrow). */
  size?: "default" | "sm";
  /** Keyboard shortcut shown trailing the label (e.g. "⌘+F"). */
  shortcut?: React.ReactNode;
  /** Muted second line below the label. */
  hint?: React.ReactNode;
  /** Feature-spotlight (promo) variant: an image-placeholder area above the label. Pass any node, or an empty placeholder. */
  media?: React.ReactNode;
  /** Show a close (✕) button and keep the tooltip open until dismissed (popover-like, but no input/action). Pair with `defaultOpen`. */
  dismissible?: boolean;
  /** Card variant: muted description paragraph below the title. */
  description?: React.ReactNode;
  /** Card variant: footer link (left). */
  footerLink?: React.ReactNode;
  /** Card variant: footer action (right, e.g. a Button). */
  action?: React.ReactNode;
  /** Colour treatment — "muted" (soft surface, e.g. for revealing truncated text). */
  variant?: "muted";
}
export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLSpanElement> { asChild?: boolean; }
export function TooltipProvider(props: { children?: React.ReactNode }): JSX.Element;
export interface TooltipProps { followCursor?: boolean; followAxis?: "both" | "x"; open?: boolean; defaultOpen?: boolean; children?: React.ReactNode; }
export function Tooltip(props: TooltipProps): JSX.Element;
export function TooltipTrigger(props: TooltipTriggerProps): JSX.Element;
export function TooltipContent(props: TooltipContentProps): JSX.Element;
