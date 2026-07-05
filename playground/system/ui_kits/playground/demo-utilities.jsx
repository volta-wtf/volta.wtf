/* Playground demo-only utilities — NOT part of the design system.
   Composed bits used to dress up component demos (empty states, filler).
   Exposes window.PG_DEMO_UTILS. */
(function () {
  const S = window.TestDesignSystem_be7089;
  const { Icon, BoardCard } = S;

  // Inject demo-only CSS once (kept out of the design-system stylesheet).
  const CSS = `
    .pg-empty-aside { position: relative; flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 8px; min-height: 160px;
      min-height: initial; margin-block: 8px;
      background-image: var(--pg-placeholder-border); border-radius: var(--radius-md); color: var(--muted-foreground); }
    .pg-empty-aside-inner { display: flex; flex-direction: column; align-items: center; gap: 8px;
      transition: opacity var(--duration-moderate) var(--ease-in-out); }
    .ds-sidebar[data-collapsible="icon"][data-state="collapsed"] .pg-empty-aside-inner { opacity: 0; }
    .pg-empty-aside-hint { display: none; }
    .ds-sidebar[data-collapsible="icon"][data-state="collapsed"] .pg-empty-aside-hint {
      display: block; position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      writing-mode: vertical-rl; white-space: nowrap;
      font-size: var(--text-xs); letter-spacing: 0.1em; color: var(--muted-foreground); pointer-events: none; }
    /* Close control overlays the corner so the empty block fills top-to-bottom;
       on the rail it stays but swaps to an expand affordance. Muted in every
       state (this is the in-aside control, not the header trigger). */
    .pg-empty-aside-close { position: absolute; top: 8px; z-index: 1; color: var(--muted-foreground); }
    .pg-empty-aside-close:hover, .pg-empty-aside-close:focus-visible, .pg-empty-aside-close:active { color: var(--muted-foreground); }
    .pg-empty-aside-close--left { right: 8px; }
    .pg-empty-aside-close--right { left: 8px; }
    /* Sidebar & inset variants sit flush to the container, so give the close
       control extra breathing room; floating already floats with its own gap. */
    .ds-sidebar[data-variant="sidebar"][data-state="expanded"] .pg-empty-aside-close,
    .ds-sidebar[data-variant="inset"][data-state="expanded"] .pg-empty-aside-close { margin: 0.5rem; }
    .ds-sidebar[data-collapsible="icon"][data-state="collapsed"] .pg-empty-aside-close { margin-inline: -2px; }
    .ds-sidebar[data-state="expanded"] .pg-close-icon--collapsed { display: none; }
    .ds-sidebar[data-state="collapsed"] .pg-close-icon--open { display: none; }
    /* Header trigger forced to outline look (ghost bg would otherwise win the cascade) */
    .ds-sidebar-inset-trigger.ds-btn--outline { background-color: var(--background); box-shadow: var(--shadow-xs); }
    .ds-sidebar-inset-trigger.ds-btn--outline:hover { background-color: var(--accent); color: var(--accent-foreground); }
  `;
  if (!document.getElementById("pg-demo-utils-css")) {
    const s = document.createElement("style");
    s.id = "pg-demo-utils-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Placeholder — a reusable dashed empty-box (icon + label). Used for the
     empty aside rail and any demo panel that needs a "nothing here" stand-in. */
  function Placeholder({ label = "Empty", icon = "square-dashed", size = 28, children, ...rest }) {
    return (
      <div className="pg-empty-aside" {...rest}>
        <div className="pg-empty-aside-inner">
          {icon && <Icon name={icon} size={size} />}
          {label && <span style={{ fontSize: 12 }}>{label}</span>}
        </div>
        {children}
      </div>
    );
  }

  /* PlaceholderCard — a stand-in kanban card for the Board demos. Keeps the
     solid Board card surface with skeleton content blocks, and shows its id
     (e.g. #14) top-right in muted text so a card is easy to track as it moves. */
  const pgBlk = (w, h) => ({ width: w, height: h, borderRadius: 999, background: "color-mix(in oklch, var(--muted-foreground) 22%, transparent)" });
  function PlaceholderCard({ id, ...rest }) {
    const n = "#" + parseInt(String(id).replace(/\D/g, ""), 10);
    return (
      <BoardCard {...rest} style={{ position: "relative" }}>
        <span style={{ position: "absolute", top: "var(--spacing-3)", right: "var(--spacing-3)", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}>{n}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={pgBlk("55%", 10)} />
          <div style={pgBlk("80%", 10)} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
            <div style={pgBlk(40, 14)} />
            <div style={pgBlk(18, 18)} />
          </div>
        </div>
      </BoardCard>
    );
  }

  window.PG_DEMO_UTILS = { PlaceholderCard, Placeholder };
})();
