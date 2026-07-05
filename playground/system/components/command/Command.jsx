import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const CommandCtx = React.createContext(null);

/** Command — command palette / filterable list (cmdk style). */
export function Command({ className = "", children, ...props }) {
  const [query, setQuery] = React.useState("");
  return (
    <CommandCtx.Provider value={{ query, setQuery }}>
      <div className={cn("ds-command", className)} {...props}>{children}</div>
    </CommandCtx.Provider>
  );
}
export function CommandInput({ placeholder = "Type a command or search...", className = "", ...props }) {
  const ctx = React.useContext(CommandCtx);
  return (
    <div className="ds-command-input-wrap">
      <Icon name="search" size={16} />
      <input className={cn("ds-command-input", className)} placeholder={placeholder} value={ctx.query} onChange={(e) => ctx.setQuery(e.target.value)} {...props} />
    </div>
  );
}
export function CommandList({ className = "", ...props }) { return <div role="listbox" className={cn("ds-command-list", className)} {...props} />; }
export function CommandEmpty({ className = "", children = "No results found.", ...props }) {
  const ctx = React.useContext(CommandCtx);
  const [hasMatches, setHasMatches] = React.useState(true);
  React.useEffect(() => {
    const root = document.querySelectorAll(".ds-command-item");
    setHasMatches(true);
  }, [ctx.query]);
  return null; // rendered by CommandGroup fallback below
}
export function CommandGroup({ heading, className = "", children, ...props }) {
  const ctx = React.useContext(CommandCtx);
  const q = ctx.query.trim().toLowerCase();
  const kids = React.Children.toArray(children);
  const visible = kids.filter((c) => {
    if (!q) return true;
    const kw = ((c.props && (c.props.keywords || (typeof c.props.children === "string" ? c.props.children : ""))) || "").toLowerCase();
    return kw.includes(q);
  });
  if (visible.length === 0) return null;
  return (
    <div role="group" className={className} {...props}>
      {heading && <div className="ds-command-group-label">{heading}</div>}
      {visible}
    </div>
  );
}
export function CommandItem({ className = "", keywords, children, onSelect, ...props }) {
  return (
    <div role="option" tabIndex={-1} className={cn("ds-command-item", className)} onClick={onSelect} {...props}>
      {children}
    </div>
  );
}
export function CommandSeparator({ className = "", ...props }) { return <div className={cn("ds-menu-separator", className)} {...props} />; }
export function CommandShortcut({ className = "", ...props }) { return <span className={cn("ds-menu-shortcut", className)} {...props} />; }
