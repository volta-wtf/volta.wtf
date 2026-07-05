import * as React from "react";

export interface ReactionItem { emoji: string; count?: number; active?: boolean; }

/** Reaction — a single applied-reaction chip (emoji + count). */
export interface ReactionProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onToggle"> {
  /** Emoji registry name (e.g. "thumbs-up"). */
  emoji: string;
  /** Reaction count. Default 1. */
  count?: number;
  /** Whether the current user has reacted (accent surface). */
  active?: boolean;
  /** Fires with the emoji name when the chip is clicked. */
  onToggle?: (emoji: string) => void;
}
export function Reaction(props: ReactionProps): JSX.Element;

/** ReactionToolbar — floating quick-react bar (common emoji + "more" → full picker). */
export interface ReactionToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Quick-react emoji names. Defaults to a common set. */
  quick?: string[];
  /** Fires with the chosen emoji name. */
  onReact?: (emoji: string) => void;
  /** Show the "more" button that opens the full EmojiPicker. Default true. */
  showMore?: boolean;
}
export function ReactionToolbar(props: ReactionToolbarProps): JSX.Element;

/** AddReactionButton — smiley-plus addon that opens the quick-react toolbar in a popover. */
export interface AddReactionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  quick?: string[];
  onReact?: (emoji: string) => void;
  size?: "sm" | "default";
}
export function AddReactionButton(props: AddReactionButtonProps): JSX.Element;

/** ReactionBar — applied reactions + an add-reaction button. */
export interface ReactionBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  reactions?: ReactionItem[];
  quick?: string[];
  /** Toggles an existing reaction. */
  onToggle?: (emoji: string) => void;
  /** Adds a new reaction from the add button (falls back to onToggle). */
  onReact?: (emoji: string) => void;
  /** Show the trailing add-reaction button. Default true. */
  showAdd?: boolean;
}
export function ReactionBar(props: ReactionBarProps): JSX.Element;
