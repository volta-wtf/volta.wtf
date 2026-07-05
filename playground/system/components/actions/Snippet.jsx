import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * Snippet — a copyable command/code line (Geist). Shows a monospace command
 * with a trailing copy button. `prompt` prefixes a shell "$". `text` is the
 * string copied (defaults to children). Multiple commands via array `commands`.
 */
export function Snippet({ text, prompt = false, commands, width, className = "", children, ...props }) {
  const [copied, setCopied] = React.useState(false);
  const value = text ?? (Array.isArray(commands) ? commands.join("\n") : (typeof children === "string" ? children : ""));
  const copy = () => {
    try {
      navigator.clipboard && navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {}
  };
  const lines = commands || [children];
  return (
    <div className={cn("ds-snippet", className)} style={width ? { width } : undefined} {...props}>
      <div className="ds-snippet-body">
        {lines.map((line, i) => (
          <code key={i} className="ds-snippet-line">
            {prompt && <span className="ds-snippet-prompt">$</span>}
            {line}
          </code>
        ))}
      </div>
      <button type="button" className="ds-snippet-copy" aria-label={copied ? "Copied" : "Copy"} onClick={copy} data-copied={copied || undefined}>
        <Icon name={copied ? "check" : "copy"} size={15} />
      </button>
    </div>
  );
}
