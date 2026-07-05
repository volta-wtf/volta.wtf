/* Playground shell: DS sidebar + header (breadcrumb, theme toggle) + live demo panel.
   Reads window.PLAYGROUND (demos.jsx). Mounts to #root. */
(function () {
  const S = window.TestDesignSystem_be7089;
  const { Icon, Input, Badge, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Switch, Label, MultiSwitch, Tabs, TabsList, TabsTrigger, TabsContent, Tooltip, TooltipTrigger, TooltipContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, Item, ItemMedia, ItemContent, ItemTitle, ItemDescription } = S;
  const DEMOS = window.PLAYGROUND || [];
  const RECENT = window.PLAYGROUND_RECENT || [];
  // Static playground chrome copy lives in playground-text.js (window.PG_TEXT).
  const TEXT_DEFAULTS = (window.PG_TEXT && window.PG_TEXT.defaults) || {};
  const TEXT_FIELDS = (window.PG_TEXT && window.PG_TEXT.fields) || [];
  const recencyCmp = (a, b) => {
    const ia = RECENT.indexOf(a.id), ib = RECENT.indexOf(b.id);
    const ra = ia < 0 ? Infinity : ia, rb = ib < 0 ? Infinity : ib;
    return ra !== rb ? ra - rb : a.name.localeCompare(b.name);
  };
  const PAGES = window.PG_PAGES || {};

  const GROUP_ORDER = ["Forms", "Actions", "Layout", "Display", "Disclosure", "Feedback", "Overlays", "Data", "Navigation", "Primitives", "Chat", "Utilities"];
  const GROUP_ICON = {
    "Forms": "edit", "Actions": "add", "Layout": "workspace", "Display": "image", "Disclosure": "chevrons-up-down",
    "Feedback": "notification", "Overlays": "copy", "Data": "chart-bar", "Navigation": "route",
    "Command": "search", "Primitives": "settings", "Chat": "chat", "Utilities": "settings",
  };

  // Settings → Utils: demo-only utility components, with a live preview on hover.
  function UtilsTab() {
    const U = window.PG_DEMO_UTILS || {};
    const Placeholder = U.Placeholder, PlaceholderCard = U.PlaceholderCard;
    const utils = [
      { name: "Placeholder", icon: "square-dashed", desc: "Dashed empty-box with icon + label for “nothing here” states.", preview: () => Placeholder ? <Placeholder label="Empty" style={{ minHeight: 120, width: "100%" }} /> : null },
      { name: "PlaceholderCard", icon: "columns-2", desc: "Kanban stand-in card with skeleton blocks and a tracking id.", preview: () => PlaceholderCard ? <div style={{ width: 240, margin: "0 auto" }}><PlaceholderCard id="14" /></div> : null },
    ];
    const [hover, setHover] = React.useState(null);
    const active = utils.find((u) => u.name === hover);
    return (
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 168, padding: 20, marginBottom: 16, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", background: "var(--muted)" }}>
          {active ? active.preview() : <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Hover a component below to preview it.</span>}
        </div>
        <p style={{ marginBottom: 12, fontSize: 13, color: "var(--muted-foreground)" }}>Demo-only utility components used to dress up the playground (not part of the design system).</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {utils.map((u) => (
            <Item key={u.name} variant="outline" onMouseEnter={() => setHover(u.name)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <ItemMedia variant="icon"><Icon name={u.icon} size={18} /></ItemMedia>
              <ItemContent>
                <ItemTitle>{u.name}</ItemTitle>
                <ItemDescription>{u.desc}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </div>
    );
  }

  // Settings → Order: read-mode collapsed listing per category; edit-mode drag to reorder within a category.
  function OrderEditor({ onEditing, api }) {
    const nameOf = React.useMemo(() => { const m = {}; DEMOS.forEach((d) => { m[d.id] = d.name; }); return m; }, []);
    const defGroup = React.useMemo(() => { const m = {}; DEMOS.forEach((d) => { m[d.id] = d.group; }); return m; }, []);
    const initial = React.useMemo(() => {
      const names = window.PG_ORDER.groupOrder(GROUP_ORDER);
      const items = {};
      names.forEach((g) => { items[g] = window.PG_ORDER.sortItems(g, DEMOS.filter((d) => window.PG_ORDER.groupOf(d) === g)).map((d) => d.id); });
      return { names, items, labels: { ...window.PG_ORDER.loadNames() } };
    }, []);
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(initial);
    const [saved, setSaved] = React.useState(null);
    const [newName, setNewName] = React.useState("");
    const dragRef = React.useRef(null);
    const [over, setOver] = React.useState(null);
    const [overGroup, setOverGroup] = React.useState(null);
    const [dragging, setDragging] = React.useState(null);
    const [openMap, setOpenMap] = React.useState({});
    const [adding, setAdding] = React.useState(false);
    const [glabels, setGlabels] = React.useState({});
    const [delTarget, setDelTarget] = React.useState(null);
    const startEdit = () => { setDraft(initial); setSaved(null); setGlabels({}); setEditing(true); setOpenMap(Object.fromEntries(initial.names.map((n) => [n, true]))); onEditing && onEditing(true); };
    const cancel = () => { setEditing(false); onEditing && onEditing(false); };
    const addGroup = () => {
      const n = newName.trim();
      setDraft((d) => (!n || d.names.indexOf(n) > -1) ? d : { names: [n, ...d.names], items: { ...d.items, [n]: [] } });
      if (n) setOpenMap((m) => ({ ...m, [n]: true }));
      setNewName("");
    };
    // Move the dragged component to `group`, before `targetId` (or append when null).
    const drop = (group, targetId) => setDraft((d) => {
      const src = dragRef.current; if (!src || src.kind !== "item") return d;
      const items = {};
      d.names.forEach((g) => { items[g] = (d.items[g] || []).filter((x) => x !== src.id); });
      const arr = items[group];
      const to = targetId ? arr.indexOf(targetId) : arr.length;
      arr.splice(to < 0 ? arr.length : to, 0, src.id);
      return { names: d.names, items };
    });
    const moveGroup = (target) => setDraft((d) => {
      const src = dragRef.current; if (!src || src.kind !== "group") return d;
      const names = d.names.filter((n) => n !== src.g);
      const to = names.indexOf(target);
      names.splice(to < 0 ? names.length : to, 0, src.g);
      return { names, items: d.items };
    });
    const moveGroupBy = (g, dir) => setDraft((d) => {
      const names = [...d.names]; const i = names.indexOf(g); const k = i + dir;
      if (i < 0 || k < 0 || k >= names.length) return d;
      names.splice(i, 1); names.splice(k, 0, g);
      return { ...d, names };
    });
    const deleteGroup = (g) => {
      if ((draft.items[g] || []).length) return;
      setDraft((d) => { const names = d.names.filter((n) => n !== g); const items = { ...d.items }; delete items[g]; return { ...d, names, items }; });
    };
    const moveWithin = (g, id, dir) => setDraft((d) => {
      const arr = [...(d.items[g] || [])]; const i = arr.indexOf(id); const k = i + dir;
      if (i < 0 || k < 0 || k >= arr.length) return d;
      arr.splice(i, 1); arr.splice(k, 0, id);
      return { names: d.names, items: { ...d.items, [g]: arr } };
    });
    const sendTo = (id, fromG, toG) => setDraft((d) => {
      if (fromG === toG) return d;
      const items = { ...d.items };
      items[fromG] = (items[fromG] || []).filter((x) => x !== id);
      items[toG] = [...(items[toG] || []), id];
      return { names: d.names, items };
    });
    const rename = (id, v) => setDraft((d) => ({ ...d, labels: { ...(d.labels || {}), [id]: v } }));
    const save = () => {
      const nm = (g) => ((glabels[g] || "").trim() || g);
      const seen = [], order = {}, assign = {};
      // Merge any groups that resolve to the same name (e.g. a rename colliding with
      // an existing group) instead of emitting duplicates — union their items.
      draft.names.forEach((g) => {
        const gn = nm(g);
        if (seen.indexOf(gn) < 0) seen.push(gn);
        const ids = draft.items[g] || [];
        const cur = order[gn] || (order[gn] = []);
        ids.forEach((id) => { if (cur.indexOf(id) < 0) cur.push(id); if (defGroup[id] !== gn) assign[id] = gn; });
      });
      const names2 = seen;
      const groups = names2.filter((g) => GROUP_ORDER.indexOf(g) < 0);
      const labels = {};
      Object.keys(draft.labels || {}).forEach((id) => { const v = (draft.labels[id] || "").trim(); if (v && v !== nameOf[id]) labels[id] = v; });
      window.PG_ORDER.commit({ order, groups, assign, groupOrder: names2, names: labels });
      setSaved(JSON.stringify({ order, groups, assign }, null, 2));
      setEditing(false);
      onEditing && onEditing(false);
    };
    if (api) api.current = { save, cancel };
    const data = editing ? draft : initial;
    const allOpen = data.names.length > 0 && data.names.every((g) => openMap[g]);
    const toggleAll = () => { const n = !allOpen; setOpenMap(Object.fromEntries(data.names.map((g) => [g, n]))); };
    return (
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Drag to reorder within a category.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {!editing && <button type="button" onClick={startEdit} style={{ all: "unset", cursor: "pointer", fontSize: 12, color: "var(--muted-foreground)", textDecoration: "underline", textUnderlineOffset: 3, marginRight: 8 }}>Editar</button>}
            {editing && <Tooltip followCursor><TooltipTrigger asChild><button type="button" className="ds-btn ds-btn--ghost ds-btn--icon-sm" style={{ color: adding ? "var(--foreground)" : "var(--muted-foreground)" }} onClick={() => setAdding((a) => !a)} aria-pressed={adding} aria-label="Add group"><Icon name="plus" size={16} /></button></TooltipTrigger><TooltipContent>Add group</TooltipContent></Tooltip>}
            <Tooltip followCursor><TooltipTrigger asChild><button type="button" className="ds-btn ds-btn--ghost ds-btn--icon-sm" style={{ color: "var(--muted-foreground)" }} onClick={toggleAll} aria-label={allOpen ? "Collapse all groups" : "Expand all groups"}><Icon name={allOpen ? "chevrons-down-up" : "chevrons-up-down"} size={16} /></button></TooltipTrigger><TooltipContent>{allOpen ? "Collapse all" : "Expand all"}</TooltipContent></Tooltip>
          </div>
        </div>
        {editing && adding && (
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New group name…" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGroup(); } }} />
            <button type="button" className="ds-btn ds-btn--outline ds-btn--sm" style={{ flexShrink: 0 }} onClick={addGroup}><Icon name="plus" size={14} /> Add group</button>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {data.names.map((g) => (
            <React.Fragment key={g}>
            {editing && overGroup === g && <div style={{ height: 2, borderRadius: 2, background: "var(--primary)", margin: "-1px 0" }} />}
            <details open={!!openMap[g]} onToggle={(e) => { const isOpen = e.target.open; setOpenMap((m) => ({ ...m, [g]: isOpen })); }}
              onDragOver={(e) => { if (editing && dragRef.current && dragRef.current.kind === "group") { e.preventDefault(); setOverGroup(g); } }}
              onDrop={(e) => { if (editing && dragRef.current && dragRef.current.kind === "group") { e.preventDefault(); moveGroup(g); setOverGroup(null); } }}
              style={{ border: "1px solid var(--border)", borderRadius: 8, opacity: dragging === ("__g__" + g) ? 0.4 : 1, transition: "opacity .12s ease" }}>
              <summary draggable={editing}
                onDragStart={(e) => { e.stopPropagation(); dragRef.current = { kind: "group", g }; setDragging("__g__" + g); }}
                onDragEnd={() => { dragRef.current = null; setOverGroup(null); setDragging(null); }}
                style={{ cursor: editing ? "grab" : "pointer", listStyle: "none", padding: "8px 10px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                {editing && <Icon name="grip-vertical" size={13} style={{ color: "var(--muted-foreground)" }} />}
                <Icon name={GROUP_ICON[g] || "folder"} size={13} /> {glabels[g] || g}
                {GROUP_ORDER.indexOf(g) < 0 && <span style={{ fontSize: 10, color: "var(--muted-foreground)", fontWeight: 400, border: "1px solid var(--border)", borderRadius: 4, padding: "0 4px" }}>custom</span>}
                <span style={{ color: "var(--muted-foreground)", fontWeight: 400, marginLeft: "auto" }}>{(data.items[g] || []).length}</span>
                {editing && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button type="button" draggable={false} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="ds-btn ds-btn--ghost ds-btn--icon-xs" style={{ marginLeft: 4, color: "var(--muted-foreground)" }} aria-label="Group actions"><Icon name="more-horizontal" size={14} /></button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <div style={{ padding: "4px 6px 6px" }} onClick={(e) => e.stopPropagation()}>
                        <Input autoFocus value={glabels[g] != null ? glabels[g] : g} onChange={(e) => setGlabels((m) => ({ ...m, [g]: e.target.value }))} onFocus={(e) => e.target.select()} onKeyDown={(e) => e.stopPropagation()} placeholder="Rename group…" style={{ height: 30 }} />
                      </div>
                      <div className="ds-menu-separator" />
                      <DropdownMenuItem onClick={() => moveGroupBy(g, -1)}><Icon name="arrow-up" size={14} /> Mover grupo arriba</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => moveGroupBy(g, 1)}><Icon name="arrow-down" size={14} /> Mover grupo abajo</DropdownMenuItem>
                      {(data.items[g] || []).length === 0 && <div className="ds-menu-separator" />}
                      {(data.items[g] || []).length === 0 && <DropdownMenuItem variant="destructive" onClick={() => setDelTarget(g)}><Icon name="delete" size={14} /> Eliminar grupo</DropdownMenuItem>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </summary>
              <div onDragOver={(e) => { if (editing && dragRef.current && dragRef.current.kind === "item") { e.preventDefault(); setOver({ g, id: null }); } }} onDrop={(e) => { if (editing && dragRef.current && dragRef.current.kind === "item") { e.preventDefault(); drop(g, null); setOver(null); } }}
                style={{ display: "flex", flexDirection: "column", padding: "0 8px 8px", minHeight: editing ? 14 : 0 }}>
                {(data.items[g] || []).map((id) => (
                  <React.Fragment key={id}>
                    {editing && over && over.g === g && over.id === id && <div style={{ height: 2, borderRadius: 2, background: "var(--ring)", margin: "-1px 8px" }} />}
                    <div draggable={editing}
                            onDragStart={() => { dragRef.current = { kind: "item", id }; setDragging(id); }}
                      onDragOver={(e) => { if (editing && dragRef.current && dragRef.current.kind === "item") { e.preventDefault(); e.stopPropagation(); setOver({ g, id }); } }}
                      onDrop={(e) => { if (editing) { e.preventDefault(); e.stopPropagation(); drop(g, id); setOver(null); } }}
                      onDragEnd={() => { dragRef.current = null; setOver(null); setDragging(null); }}
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, fontSize: 13, cursor: editing ? "grab" : "default", opacity: dragging === id ? 0.4 : 1, transition: "opacity .12s ease" }}>
                      {editing && <Icon name="grip-vertical" size={14} style={{ color: "var(--muted-foreground)" }} />}
                      <Icon name={"c-" + id} size={15} style={{ color: "var(--muted-foreground)" }} /> {(data.labels && data.labels[id]) || nameOf[id] || id}
                      {editing && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button type="button" draggable={false} onMouseDown={(e) => e.stopPropagation()} className="ds-btn ds-btn--ghost ds-btn--icon-xs" style={{ marginLeft: "auto", color: "var(--muted-foreground)" }} aria-label="Row actions"><Icon name="more-horizontal" size={14} /></button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <div style={{ padding: "4px 6px 6px" }} onClick={(e) => e.stopPropagation()}>
                              <Input autoFocus value={(data.labels && data.labels[id] != null) ? data.labels[id] : (nameOf[id] || id)} onChange={(e) => rename(id, e.target.value)} onFocus={(e) => e.target.select()} onKeyDown={(e) => e.stopPropagation()} placeholder="Rename…" style={{ height: 30 }} />
                            </div>
                            <div className="ds-menu-separator" />
                            <DropdownMenuItem onClick={() => moveWithin(g, id, -1)}><Icon name="arrow-up" size={14} /> Mover hacia arriba</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => moveWithin(g, id, 1)}><Icon name="arrow-down" size={14} /> Mover hacia abajo</DropdownMenuItem>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger><Icon name="forward" size={14} /> Enviar al grupo…</DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                {data.names.filter((x) => x !== g).map((x) => <DropdownMenuItem key={x} onClick={() => sendTo(id, g, x)}>{x}</DropdownMenuItem>)}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </React.Fragment>
                ))}
                {editing && over && over.g === g && over.id === null && <div style={{ height: 2, borderRadius: 2, background: "var(--ring)", margin: "-1px 8px" }} />}
              </div>
            </details>
            </React.Fragment>
          ))}
        </div>
        <AlertDialog open={!!delTarget} onOpenChange={(o) => { if (!o) setDelTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>¿Eliminar el grupo “{delTarget}”?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => { deleteGroup(delTarget); setDelTarget(null); }}>Eliminar</AlertDialogAction></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {saved && (
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Saved. Paste this into <code>component-order.js</code> (or hand it to your agent to bake it in):</span>
            <textarea readOnly value={saved} onFocus={(e) => e.target.select()} style={{ height: 120, fontFamily: "var(--font-mono)", fontSize: 11, padding: 8, borderRadius: 8, border: "1px solid var(--border)", background: "var(--muted)", color: "var(--foreground)", resize: "vertical" }} />
            <button type="button" className="ds-btn ds-btn--outline ds-btn--sm" onClick={() => { try { navigator.clipboard.writeText(saved); } catch (e) {} }}>Copy JSON</button>
          </div>
        )}
      </div>
    );
  }

  function useTheme() {
    const TE = window.ThemeEngine;
    const [dark, setDark] = React.useState(() => {
      try { return TE ? /dark/.test(TE.get().mode) : localStorage.getItem("pg-theme") === "dark"; } catch (e) { return false; }
    });
    // Icon follows whatever the engine reports — never writes the mode back.
    React.useEffect(() => {
      if (!TE) return;
      const onChange = (e) => setDark(/dark/.test(e.detail.mode));
      window.addEventListener("theme:change", onChange);
      return () => window.removeEventListener("theme:change", onChange);
    }, []);
    // The header button only flips the light/dark pair; dim/hc live in the dock.
    const toggle = React.useCallback(() => {
      if (TE) {
        const cur = TE.get().mode;
        TE.set({ mode: /dark/.test(cur) ? "light" : "dark" });
      } else {
        setDark((d) => {
          const nd = !d;
          document.documentElement.classList.toggle("dark", nd);
          try { localStorage.setItem("pg-theme", nd ? "dark" : "light"); } catch (e) {}
          return nd;
        });
      }
    }, []);
    return [dark, toggle];
  }

  function Playground() {
    const [activeId, setActiveId] = React.useState(() => {
      try { return localStorage.getItem("pg-active") || DEMOS[0].id; } catch (e) { return DEMOS[0].id; }
    });
    const [query, setQuery] = React.useState("");
    const [dark, toggleTheme] = useTheme();
    const [open, setOpen] = React.useState(true);
    const [page, setPage] = React.useState(() => { try { return localStorage.getItem("pg-page") || "overview"; } catch (e) { return "overview"; } });
    const [fluid, setFluid] = React.useState(() => { try { return localStorage.getItem("pg-fluid") === "1"; } catch (e) { return false; } });
    React.useEffect(() => { try { localStorage.setItem("pg-fluid", fluid ? "1" : "0"); } catch (e) {} }, [fluid]);
    // Meta-setting: whether collapse/grouping state is remembered across reloads.
    const [persistLayout, setPersistLayout] = React.useState(() => { try { return localStorage.getItem("pg-persist-layout") !== "0"; } catch (e) { return true; } });
    React.useEffect(() => { try { localStorage.setItem("pg-persist-layout", persistLayout ? "1" : "0"); } catch (e) {} }, [persistLayout]);
    const [sortMode, setSortMode] = React.useState(() => { try { return localStorage.getItem("pg-sort") || "alpha"; } catch (e) { return "alpha"; } });
    React.useEffect(() => { try { localStorage.setItem("pg-sort", sortMode); } catch (e) {} }, [sortMode]);
    // Default layout variant the Sidebar & Aside demos start on.
    const [layoutVariant, setLayoutVariant] = React.useState(() => { try { return localStorage.getItem("pg-layout-variant") || "sidebar"; } catch (e) { return "sidebar"; } });
    React.useEffect(() => { try { localStorage.setItem("pg-layout-variant", layoutVariant); } catch (e) {} }, [layoutVariant]);
    // Editable playground chrome copy.
    const [text, setText] = React.useState(() => { try { return { ...TEXT_DEFAULTS, ...JSON.parse(localStorage.getItem("pg-text") || "{}") }; } catch (e) { return { ...TEXT_DEFAULTS }; } });
    React.useEffect(() => { try { localStorage.setItem("pg-text", JSON.stringify(text)); } catch (e) {} }, [text]);
    const setT = (k, v) => setText((t) => ({ ...t, [k]: v }));
    // Bridge current copy to demos rendered outside this component (Browser/Phone URL, etc.).
    if (window.PG_TEXT) window.PG_TEXT._live = text;
    const [orderEditing, setOrderEditing] = React.useState(false);
    const orderApi = React.useRef({});
    // Re-render sidebar when the component order changes (Settings → Order).
    const [, forceOrder] = React.useReducer((x) => x + 1, 0);
    React.useEffect(() => { const on = () => forceOrder(); window.addEventListener("pg-order:change", on); return () => window.removeEventListener("pg-order:change", on); }, []);

    React.useEffect(() => { try { localStorage.setItem("pg-active", activeId); } catch (e) {} }, [activeId]);
    React.useEffect(() => { try { localStorage.setItem("pg-page", page); } catch (e) {} }, [page]);

    const openDemo = (id) => { setActiveId(id); setPage("detail"); };
    const NAV = [["overview", text.navOverview, "workspace"], ["typography", text.navTypography, "file"], ["components", text.navComponents, "chart-bar"]];
    const [sbGrouped, setSbGrouped] = React.useState(() => { try { return localStorage.getItem("pg-persist-layout") !== "0" && localStorage.getItem("pg-sb-grouped") === "1"; } catch (e) { return false; } });
    React.useEffect(() => { if (!persistLayout) return; try { localStorage.setItem("pg-sb-grouped", sbGrouped ? "1" : "0"); } catch (e) {} }, [sbGrouped, persistLayout]);
    const [showCompIcons, setShowCompIcons] = React.useState(() => { try { return localStorage.getItem("pg-comp-icons") !== "0"; } catch (e) { return true; } });
    const [showCatIcons, setShowCatIcons] = React.useState(() => { try { return localStorage.getItem("pg-cat-icons") !== "0"; } catch (e) { return true; } });
    React.useEffect(() => { try { localStorage.setItem("pg-comp-icons", showCompIcons ? "1" : "0"); } catch (e) {} }, [showCompIcons]);
    React.useEffect(() => { try { localStorage.setItem("pg-cat-icons", showCatIcons ? "1" : "0"); } catch (e) {} }, [showCatIcons]);
    const [sbCollapsed, setSbCollapsed] = React.useState(() => { try { return localStorage.getItem("pg-persist-layout") !== "0" ? JSON.parse(localStorage.getItem("pg-sb-collapsed") || "{}") : {}; } catch (e) { return {}; } });
    React.useEffect(() => { if (!persistLayout) return; try { localStorage.setItem("pg-sb-collapsed", JSON.stringify(sbCollapsed)); } catch (e) {} }, [sbCollapsed, persistLayout]);
    const toggleSbGroup = (g) => setSbCollapsed((c) => ({ ...c, [g]: !c[g] }));

    const active = DEMOS.find((d) => d.id === activeId) || DEMOS[0];
    const filtered = DEMOS.filter((d) => d.name.toLowerCase().includes(query.trim().toLowerCase()));
    const flatSorted = sortMode === "recent"
      ? [...filtered].sort(recencyCmp)
      : sortMode === "manual"
      ? window.PG_ORDER.flatSort(filtered, GROUP_ORDER)
      : [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    const groupedSorted = window.PG_ORDER.groupOrder(GROUP_ORDER)
      .map((g) => ({ group: g, items: window.PG_ORDER.sortItems(g, filtered.filter((d) => window.PG_ORDER.groupOf(d) === g)) }))
      .filter((g) => g.items.length);

    const navItem = (d) => {
      const isActive = page === "detail" && d.id === active.id;
      return (
        <button key={d.id} type="button" onClick={() => openDemo(d.id)}
          style={{
            display: "flex", alignItems: "center", width: "100%", height: 32, padding: "0 8px",
            borderRadius: 8, border: 0, cursor: "pointer", textAlign: "left", fontSize: 14,
            fontWeight: isActive ? 500 : 400, fontFamily: "var(--font-sans)",
            background: isActive ? "var(--sidebar-accent)" : "transparent",
            color: isActive ? "var(--sidebar-accent-foreground)" : "inherit",
          }}
          onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "color-mix(in oklch, var(--sidebar-accent) 60%, transparent)"; }}
          onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
          {showCompIcons && <Icon name={"c-" + d.id} size={15} style={{ marginRight: 8, flexShrink: 0, color: "var(--muted-foreground)" }} />}
          {d.name != null && (window.PG_ORDER ? window.PG_ORDER.nameOf(d) : d.name)}
        </button>
      );
    };

    // Layout variant applies to the playground's OWN shell (and only it).
    const PAD = 8;
    const SHELL = {
      sidebar: { outer: {}, aside: { background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }, main: { background: "var(--background)" } },
      floating: { outer: { padding: PAD, gap: PAD, boxSizing: "border-box" }, aside: { background: "var(--sidebar)", border: "1px solid var(--sidebar-border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }, main: { background: "var(--background)" } },
      inset: { outer: { padding: PAD, gap: PAD, boxSizing: "border-box", background: "var(--sidebar)" }, aside: { background: "transparent", borderRight: 0 }, main: { background: "var(--background)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" } },
      inverse: { outer: { padding: PAD, gap: PAD, boxSizing: "border-box", background: "var(--background)" }, aside: { background: "transparent", borderRight: 0 }, main: { background: "var(--sidebar)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" } },
    };
    const shell = SHELL[layoutVariant] || SHELL.sidebar;

    return (
      <div style={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden", background: "var(--background)", color: "var(--foreground)", ...shell.outer }}>
        {/* Sidebar */}
        <aside style={{
          display: "flex", flexDirection: "column", flexShrink: 0,
          width: open ? 264 : 0, overflow: "hidden",
          background: "var(--sidebar)", color: "var(--sidebar-foreground)",
          borderRight: "1px solid var(--sidebar-border)", transition: "width .2s ease",
          ...shell.aside,
        }}>
          <div style={{ width: 264, display: "flex", flexDirection: "column", height: "100%" }}>
            {/* brand */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 700, fontFamily: "var(--font-mono)" }}>ui</div>
                <div style={{ lineHeight: 1.1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{text.brandTitle}</div>
                  <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{text.brandSubtitle}</div>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" title="Sidebar settings" className="ds-btn ds-btn--ghost ds-btn--icon-sm" style={{ color: "var(--muted-foreground)", flexShrink: 0 }}><Icon name="settings" size={16} /></button>
                </DialogTrigger>
                <DialogContent style={{ display: "flex", flexDirection: "column", maxHeight: "85vh" }}>
                  <DialogHeader><DialogTitle>Settings</DialogTitle></DialogHeader>
                  <Tabs defaultValue="prefs" style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
                  <div className="ds-toolbar ds-toolbar--inset" style={{ margin: "0 calc(var(--spacing-6) * -1) 16px" }}><TabsList><TabsTrigger value="prefs">Preferences</TabsTrigger><TabsTrigger value="text">Text</TabsTrigger><TabsTrigger value="order">Order</TabsTrigger><TabsTrigger value="utils">Utils</TabsTrigger></TabsList></div>
                  <div className="ds-dialog-body" style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                  <TabsContent value="prefs">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div><Label htmlFor="set-comp">Component icons</Label><div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Show an icon next to each component.</div></div>
                      <Switch id="set-comp" checked={showCompIcons} onCheckedChange={setShowCompIcons} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div><Label htmlFor="set-cat">Category icons</Label><div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Show an icon on each group heading when grouped.</div></div>
                      <Switch id="set-cat" checked={showCatIcons} onCheckedChange={setShowCatIcons} />
                    </div>
                    <div style={{ height: 1, background: "var(--border)" }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div><Label htmlFor="set-persist">Remember layout</Label><div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Persist collapse & grouping in the sidebar and Components page across reloads.</div></div>
                      <Switch id="set-persist" checked={persistLayout} onCheckedChange={setPersistLayout} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div><Label htmlFor="set-sort">Sort ungrouped by</Label><div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Order the ungrouped list alphabetically, by last edited, or your manual arrangement.</div></div>
                      <MultiSwitch size="xs" options={[{ label: "A–Z", value: "alpha" }, { label: "Recent", value: "recent" }, { label: "Manual", value: "manual" }]} value={sortMode} onValueChange={setSortMode} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div><Label>Default layout variant</Label><div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Which layout the playground shell uses.</div></div>
                      <Tabs value={layoutVariant} onValueChange={(v) => v && setLayoutVariant(v)}>
                        <TabsList>
                          {[["sidebar", "panel-left", "Sidebar"], ["floating", "square", "Floating"], ["inset", "square-dashed", "Inset"], ["inverse", "columns-2", "Inverse"]].map(([val, icon, lbl]) => (
                            <Tooltip key={val}>
                              <TooltipTrigger asChild>
                                <TabsTrigger value={val} aria-label={lbl}><Icon name={icon} size={15} /></TabsTrigger>
                              </TooltipTrigger>
                              <TooltipContent side="top">{lbl}</TooltipContent>
                            </Tooltip>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  </TabsContent>
                  <TabsContent value="text">
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                      {TEXT_FIELDS.map(([k, lbl]) => (
                        <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <Label htmlFor={"txt-" + k} style={{ flex: "0 0 42%" }}>{lbl}</Label>
                          <Input id={"txt-" + k} value={text[k] || ""} onChange={(e) => setT(k, e.target.value)} style={{ flex: 1, minWidth: 0 }} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="order">
                    <OrderEditor onEditing={setOrderEditing} api={orderApi} />
                  </TabsContent>
                  <TabsContent value="utils">
                    <UtilsTab />
                  </TabsContent>
                  </div>
                  </Tabs>
                  {orderEditing && (
                    <DialogFooter style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                      <button type="button" className="ds-btn ds-btn--ghost" onClick={() => orderApi.current.cancel && orderApi.current.cancel()}>Cancel</button>
                      <button type="button" className="ds-btn" onClick={() => orderApi.current.save && orderApi.current.save()}>Save</button>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            {/* search */}
            <div style={{ padding: "4px 12px 12px" }}>
              <div className="ds-input-group" style={{ height: 34 }}>
                <div className="ds-input-group-addon"><Icon name="search" size={15} /></div>
                <input className="ds-input-group-input" placeholder="Search components…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
            </div>
            {/* pages nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 8px 8px" }}>
              {NAV.map(([id, label, icon]) => {
                const on = page === id;
                return (
                  <button key={id} type="button" onClick={() => setPage(id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8, width: "100%", height: 34, padding: "0 8px",
                      borderRadius: 8, border: 0, cursor: "pointer", textAlign: "left", fontSize: 14,
                      fontWeight: on ? 500 : 400, fontFamily: "var(--font-sans)",
                      background: on ? "var(--sidebar-accent)" : "transparent",
                      color: on ? "var(--sidebar-accent-foreground)" : "inherit",
                    }}
                    onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "color-mix(in oklch, var(--sidebar-accent) 60%, transparent)"; }}
                    onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}>
                    <Icon name={icon} size={15} /> {label}
                  </button>
                );
              })}
            </div>
            <div style={{ height: 1, background: "var(--sidebar-border)", margin: "0 12px 4px" }} />
            {/* group toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "4px 12px 8px" }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in oklch, var(--sidebar-foreground) 55%, transparent)", paddingLeft: 8, paddingRight: 8 }}>Components</span>
              <Tooltip followCursor>
                <TooltipTrigger asChild>
                  <button type="button" onClick={() => setSbGrouped((v) => !v)} aria-pressed={sbGrouped}
                    aria-label={sbGrouped ? "Desagrupar componentes" : "Agrupar por categoría"}
                    className="ds-btn ds-btn--ghost ds-btn--icon-sm" style={{ color: "var(--muted-foreground)" }}>
                    <Icon name={sbGrouped ? "list-chevrons-up-down" : "list-chevrons-down-up"} size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{sbGrouped ? "Desagrupar componentes" : "Agrupar por categoría"}</TooltipContent>
              </Tooltip>
            </div>
            {/* nav */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 16px" }}>
              {filtered.length === 0 && <div style={{ padding: 16, fontSize: 13, color: "var(--muted-foreground)" }}>No components found.</div>}
              {!sbGrouped && (
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {flatSorted.map(navItem)}
                </div>
              )}
              {sbGrouped && groupedSorted.map(({ group, items }) => {
                // While searching, force-open any group that has matches (ignore persisted collapse).
                const isCol = !query.trim() && !!sbCollapsed[group];
                return (
                  <div key={group} style={{ padding: "2px 0" }}>
                    <button type="button" onClick={() => toggleSbGroup(group)}
                      style={{ all: "unset", boxSizing: "border-box", display: "flex", alignItems: "center", gap: 6, width: "100%", height: 28, padding: "0 8px", cursor: "pointer", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "color-mix(in oklch, var(--sidebar-foreground) 55%, transparent)" }}>
                      {showCatIcons && <Icon name={GROUP_ICON[group] || "folder"} size={13} />} {group}
                      <Icon name="chevron-right" size={12} style={{ marginLeft: "auto", transform: isCol ? "none" : "rotate(90deg)", transition: "transform .15s ease" }} />
                    </button>
                    {!isCol && <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>{items.map(navItem)}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, ...shell.main }}>
          {/* header */}
          <header style={{ display: "flex", alignItems: "center", gap: 12, height: 56, padding: "0 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
            <button type="button" aria-label="Toggle sidebar" onClick={() => setOpen((o) => !o)} className="ds-btn ds-btn--ghost ds-btn--icon">
              <Icon name="menu" size={18} />
            </button>
            <div style={{ width: 1, height: 24, background: "var(--border)" }} />
            <nav className="ds-breadcrumb"><ol className="ds-breadcrumb-list">
              {page === "overview" && <li className="ds-breadcrumb-page" style={{ fontWeight: 500 }}>Overview</li>}
              {page === "typography" && <li className="ds-breadcrumb-page" style={{ fontWeight: 500 }}>Typography</li>}
              {page === "components" && <li className="ds-breadcrumb-page" style={{ fontWeight: 500 }}>Components</li>}
              {page === "detail" && (
                <React.Fragment>
                  <li style={{ color: "var(--muted-foreground)", cursor: "pointer" }} onClick={() => setPage("components")}>Components</li>
                  <li className="ds-breadcrumb-separator"><Icon name="chevron-right" size={14} /></li>
                  <li style={{ color: "var(--muted-foreground)" }}>{active.group}</li>
                  <li className="ds-breadcrumb-separator"><Icon name="chevron-right" size={14} /></li>
                  <li className="ds-breadcrumb-page" style={{ fontWeight: 500 }}>{active.name}</li>
                </React.Fragment>
              )}
            </ol></nav>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="ds-btn ds-btn--ghost ds-btn--sm" style={{ textDecoration: "none" }}>Docs</a>
              {page !== "detail" && (
                <button type="button" onClick={() => setFluid((v) => !v)} aria-pressed={fluid}
                  aria-label="Toggle container width"
                  title={fluid ? "Fluid width — switch to fixed" : "Fixed width — switch to fluid"}
                  className="ds-btn ds-btn--outline ds-btn--icon">
                  <Icon name={fluid ? "collapse" : "expand"} size={16} />
                </button>
              )}
              <button type="button" aria-label="Toggle theme" onClick={toggleTheme} className="ds-btn ds-btn--outline ds-btn--icon">
                {dark
                  ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>}
              </button>
            </div>
          </header>

          {/* content */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {page === "overview" && PAGES.Overview && <Boundary key="overview"><PAGES.Overview fluid={fluid} /></Boundary>}
            {page === "typography" && PAGES.Typography && <Boundary key="typography"><PAGES.Typography fluid={fluid} /></Boundary>}
            {page === "components" && PAGES.ComponentsGrid && <Boundary key="components"><PAGES.ComponentsGrid demos={DEMOS} onSelect={openDemo} query={query} fluid={fluid} /></Boundary>}
            {page === "detail" && (
            <div style={{ maxWidth: fluid ? "100%" : 1080, margin: "0 auto", padding: "40px 32px 96px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h1 style={{ margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>{active.name}</h1>
                <span className="ds-badge ds-badge--secondary" style={{ marginTop: 4 }}>{active.group}</span>
              </div>
              <p style={{ margin: "0 0 28px", fontSize: 16, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{active.desc}</p>

              {/* preview surface */}
              <div style={{ border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 40, padding: "0 16px", borderBottom: "1px solid var(--border)", background: "color-mix(in oklch, var(--muted) 40%, transparent)" }}>
                  <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}>Preview</span>
                  <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}>{active.id}</span>
                </div>
                <div style={{ display: "flex", alignItems: "safe center", justifyContent: "safe center", aspectRatio: "16 / 9", overflow: "auto", padding: 40, position: "relative" }}>
                  <Boundary key={active.id}><DemoHost render={active.render} /></Boundary>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Renders a demo inside the Boundary's subtree so render-time errors are caught.
  function DemoHost({ render }) { return render(); }

  // Simple error boundary so one broken demo doesn't blank the app.
  class Boundary extends React.Component {
    constructor(p) { super(p); this.state = { err: null }; }
    static getDerivedStateFromError(err) { return { err }; }
    render() {
      if (this.state.err) return <div style={{ color: "var(--destructive)", fontSize: 14, fontFamily: "var(--font-mono)" }}>Demo error: {String(this.state.err.message || this.state.err)}</div>;
      return this.props.children;
    }
  }

  window.Playground = Playground;
})();
