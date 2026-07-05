import React from "react";
import { cn } from "../lib/cn.js";
import { Emoji } from "../icons/Emoji.jsx";
import { Icon } from "../icons/Icon.jsx";
import { Popover, PopoverTrigger, PopoverContent } from "../overlay/Popover.jsx";
import { EmojiPicker } from "../pickers/MediaPicker.jsx";

/* Common quick reactions (emoji registry names). */
const DEFAULT_QUICK = ["thumbs-up", "heart-eyes", "joy", "cry", "clap", "eyes"];

/**
 * Reaction — a single applied-reaction chip: emoji + count. `active` marks the
 * reactions the current user has added (accent surface). Click toggles it.
 */
export function Reaction({ emoji, count = 1, active = false, onToggle, className = "", ...props }) {
  return (
    <button
      type="button"
      className={cn("ds-reaction", active && "ds-reaction--active", className)}
      data-active={active ? "" : undefined}
      aria-pressed={active}
      onClick={() => onToggle && onToggle(emoji)}
      {...props}
    >
      <Emoji name={emoji} size={15} />
      {count > 0 && <span className="ds-reaction-count">{count}</span>}
    </button>
  );
}

/**
 * ReactionToolbar — the floating quick-react bar: a row of common emoji plus a
 * "more" button that opens the full EmojiPicker in a popover. Drop it in a
 * Popover/HoverCard to float it over a message, or use it inline.
 */
export function ReactionToolbar({ quick = DEFAULT_QUICK, onReact, showMore = true, className = "", ...props }) {
  return (
    <div className={cn("ds-reaction-toolbar", className)} role="toolbar" aria-label="React" {...props}>
      {quick.map((name) => (
        <button
          key={name}
          type="button"
          className="ds-reaction-toolbar-btn"
          title={name}
          aria-label={name}
          onClick={() => onReact && onReact(name)}
        >
          <Emoji name={name} size={20} />
        </button>
      ))}
      {showMore && (
        <React.Fragment>
          <span className="ds-reaction-toolbar-sep" aria-hidden="true" />
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="ds-reaction-toolbar-more" aria-label="More reactions">
                <Icon name="plus" size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent align="center" style={{ padding: 0 }}>
              <EmojiPicker onSelect={(v) => onReact && onReact(v)} />
            </PopoverContent>
          </Popover>
        </React.Fragment>
      )}
    </div>
  );
}

/**
 * AddReactionButton — the "add reaction" addon: a smiley-plus button that opens
 * the quick-react toolbar (with "more" → full picker) in a popover.
 */
export function AddReactionButton({ quick, onReact, size = "default", className = "", ...props }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn("ds-reaction-add", size === "sm" && "ds-reaction-add--sm", className)}
          aria-label="Add reaction"
          {...props}
        >
          <Icon name="smile-plus" size={size === "sm" ? 15 : 17} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ padding: 0, border: 0, background: "transparent", boxShadow: "none" }}>
        <ReactionToolbar quick={quick} onReact={(v) => { onReact && onReact(v); setOpen(false); }} />
      </PopoverContent>
    </Popover>
  );
}

/**
 * ReactionBar — the row of applied reactions with an "add reaction" button at
 * the end. `reactions`: [{ emoji, count, active }]. `onToggle(emoji)` toggles an
 * existing reaction; `onReact(emoji)` adds a new one from the add button.
 */
export function ReactionBar({ reactions = [], quick, onToggle, onReact, showAdd = true, className = "", ...props }) {
  return (
    <div className={cn("ds-reaction-bar", className)} {...props}>
      {reactions.map((r) => (
        <Reaction key={r.emoji} emoji={r.emoji} count={r.count} active={r.active} onToggle={onToggle} />
      ))}
      {showAdd && <AddReactionButton quick={quick} onReact={onReact || onToggle} size="sm" />}
    </div>
  );
}
