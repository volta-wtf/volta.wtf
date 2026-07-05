/* Playground pages: Overview (composed cards) + Components grid (skeleton minis).
   Exposes window.PG_PAGES = { Overview, ComponentsGrid }. */
(function () {
  const S = window.TestDesignSystem_be7089;
  const { Skeleton, Icon } = S;

  const containerWidth = (fluid) => (fluid ? "100%" : 1080);

  function Overview({ fluid }) {
    const O = window.PG_OVERVIEW;
    if (!O || !O.Overview) return null;
    return <O.Overview fluid={fluid} />;
  }

  /* ------------------------------------------------------------------ */
  /* COMPONENTS GRID — skeleton miniatures                               */
  /* ------------------------------------------------------------------ */
  // rounded skeleton bar
  const B = ({ w, h = 8, r = 999, style }) => <Skeleton style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
  // outlined mini container
  const O = ({ children, style }) => <div style={{ border: "1px solid var(--border)", borderRadius: 8, background: "var(--card)", ...style }}>{children}</div>;
  const solid = (w, h, r = 999, bg = "var(--primary)", style) => <div style={{ width: w, height: h, borderRadius: r, background: bg, flexShrink: 0, ...style }} />;
  const col = (kids, style) => <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>{React.Children.toArray(kids)}</div>;
  const row = (kids, style) => <div style={{ display: "flex", alignItems: "center", gap: 6, ...style }}>{React.Children.toArray(kids)}</div>;

  // pill button shapes
  const pill = (w, filled) => <div style={{ width: w, height: 22, borderRadius: 6, background: filled ? "var(--primary)" : "transparent", border: filled ? 0 : "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><B w={w * 0.5} h={6} style={filled ? { background: "var(--primary-foreground)", opacity: 0.5 } : undefined} /></div>;

  const MINI = {
    button: () => row([pill(56, true), pill(64, false)]),
    badge: () => row([solid(40, 16, 8, "var(--primary)"), <div key="b" style={{ width: 46, height: 16, borderRadius: 8, border: "1px solid var(--border)" }} />]),
    chip: () => (
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 30, padding: "0 12px", borderRadius: 999, background: "var(--secondary)" }}>
        <div style={{ width: 16, height: 16, borderRadius: 999, background: "color-mix(in oklch, var(--foreground) 20%, transparent)" }} />
        <B w={58} h={7} />
        <div style={{ width: 18, height: 18, borderRadius: 999, background: "color-mix(in oklch, var(--foreground) 22%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </div>
      </div>
    ),
    toggle: () => row([solid(24, 24, 6, "var(--primary)"), <div key="t" style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--border)" }} />, <div key="t2" style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--border)" }} />]),
    "button-group": () => row([<div key="g" style={{ display: "flex", border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden" }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 34, height: 22, borderRight: i < 2 ? "1px solid var(--border)" : 0, display: "flex", alignItems: "center", justifyContent: "center" }}><B w={14} h={5} /></div>)}</div>]),

    input: () => col([<O key="i" style={{ width: 150, height: 30, display: "flex", alignItems: "center", padding: "0 10px" }}><B w={70} h={7} /></O>]),
    textarea: () => <O style={{ width: 160, height: 74, padding: 10, display: "flex", flexDirection: "column", gap: 7 }}>{[110, 130, 80].map((w, i) => <B key={i} w={w} h={7} />)}</O>,
    select: () => <O style={{ width: 150, height: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px" }}><B w={64} h={7} /><Icon name="chevron-down" size={13} style={{ color: "var(--muted-foreground)" }} /></O>,
    combobox: () => <O style={{ width: 150, height: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px" }}><B w={54} h={7} /><Icon name="chevrons-up-down" size={13} style={{ color: "var(--muted-foreground)" }} /></O>,
    checkbox: () => col([row([solid(16, 16, 4, "var(--primary)"), <B key="a" w={80} h={7} />]), row([<div key="b" style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid var(--border)" }} />, <B key="c" w={64} h={7} />])]),
    "radio-group": () => col([row([solid(15, 15, 999, "var(--primary)"), <B key="a" w={80} h={7} />]), row([<div key="b" style={{ width: 15, height: 15, borderRadius: 999, border: "1px solid var(--border)" }} />, <B key="c" w={64} h={7} />])]),
    switch: () => row([<div key="s" style={{ width: 34, height: 19, borderRadius: 999, background: "var(--primary)", position: "relative" }}><div style={{ position: "absolute", top: 2, right: 2, width: 15, height: 15, borderRadius: 999, background: "var(--background)" }} /></div>, <B key="l" w={70} h={7} />]),
    "input-group": () => <O style={{ width: 160, height: 30, display: "flex", alignItems: "center", padding: "0 8px", gap: 8 }}><Icon name="search" size={14} style={{ color: "var(--muted-foreground)" }} /><B w={90} h={7} /></O>,
    field: () => col([<B key="l" w={60} h={7} />, <O key="i" style={{ width: 150, height: 28 }} />, <B key="d" w={110} h={6} />]),
    "native-select": () => <O style={{ width: 140, height: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px" }}><B w={56} h={7} /><Icon name="chevron-down" size={13} style={{ color: "var(--muted-foreground)" }} /></O>,
    "input-otp": () => row([...[0, 1, 2, 3].map((i) => <O key={i} style={{ width: 24, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}><B w={8} h={8} r={2} /></O>)]),

    card: () => <O style={{ width: 168, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}><B w={80} h={9} /><B w={130} h={6} /><B w={110} h={6} /><div style={{ display: "flex", gap: 6, marginTop: 4 }}>{pill(44, false)}{pill(48, true)}</div></O>,
    separator: () => col([<B key="a" w={150} h={7} />, <div key="s" style={{ width: 160, height: 1, background: "var(--border)" }} />, <B key="b" w={110} h={7} />], { alignItems: "flex-start" }),
    "aspect-ratio": () => <B w={168} h={94} r={8} />,
    "scroll-area": () => <O style={{ width: 160, height: 92, padding: 10, display: "flex", flexDirection: "column", gap: 8, position: "relative", overflow: "hidden" }}>{[130, 120, 130, 110].map((w, i) => <B key={i} w={w} h={7} />)}<div style={{ position: "absolute", top: 8, right: 4, width: 4, height: 40, borderRadius: 999, background: "var(--border)" }} /></O>,
    resizable: () => <O style={{ width: 170, height: 90, display: "flex", overflow: "hidden" }}><div style={{ width: "42%", padding: 10 }}><B w={40} h={7} /></div><div style={{ width: 2, background: "var(--border)", position: "relative" }}><div style={{ position: "absolute", top: "50%", left: -3, transform: "translateY(-50%)", width: 8, height: 18, borderRadius: 4, border: "1px solid var(--border)", background: "var(--card)" }} /></div><div style={{ flex: 1, padding: 10 }}><B w={64} h={7} /></div></O>,

    avatar: () => row([solid(36, 36, 999, "var(--muted)"), solid(36, 36, 999, "var(--muted)", { marginLeft: -10 }), solid(36, 36, 999, "var(--muted)", { marginLeft: -10 })]),
    skeleton: () => row([<B key="c" w={44} h={44} r={999} />, col([<B key="a" w={120} h={9} />, <B key="b" w={90} h={9} />])]),
    progress: () => <div style={{ width: 160, height: 8, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}><div style={{ width: "62%", height: "100%", background: "var(--primary)" }} /></div>,
    slider: () => <div style={{ width: 160, position: "relative", display: "flex", alignItems: "center" }}><div style={{ width: "100%", height: 5, borderRadius: 999, background: "var(--muted)" }}><div style={{ width: "45%", height: "100%", borderRadius: 999, background: "var(--primary)" }} /></div><div style={{ position: "absolute", left: "45%", width: 15, height: 15, borderRadius: 999, background: "var(--background)", border: "2px solid var(--primary)" }} /></div>,

    tabs: () => col([<div key="t" style={{ display: "flex", gap: 4, background: "var(--muted)", borderRadius: 7, padding: 3, width: "fit-content" }}><div style={{ width: 52, height: 20, borderRadius: 5, background: "var(--background)" }} /><div style={{ width: 52, height: 20 }} /></div>, <B key="a" w={150} h={7} />, <B key="b" w={120} h={7} />]),
    accordion: () => col([<div key="a" style={{ display: "flex", justifyContent: "space-between", width: 168, alignItems: "center" }}><B w={90} h={8} /><Icon name="chevron-down" size={13} style={{ color: "var(--muted-foreground)" }} /></div>, <div key="s" style={{ width: 168, height: 1, background: "var(--border)" }} />, <div key="b" style={{ display: "flex", justifyContent: "space-between", width: 168, alignItems: "center" }}><B w={110} h={8} /><Icon name="chevron-down" size={13} style={{ color: "var(--muted-foreground)" }} /></div>], { gap: 10 }),
    collapsible: () => col([<div key="a" style={{ display: "flex", justifyContent: "space-between", width: 168, alignItems: "center" }}><B w={110} h={8} /><Icon name="chevrons-up-down" size={13} style={{ color: "var(--muted-foreground)" }} /></div>, <O key="b" style={{ width: 168, height: 22 }} />, <O key="c" style={{ width: 168, height: 22 }} />], { gap: 6 }),

    alert: () => <O style={{ width: 170, padding: 10, display: "flex", gap: 8 }}><Icon name="info" size={16} style={{ color: "var(--muted-foreground)", marginTop: 1 }} /><div style={{ display: "flex", flexDirection: "column", gap: 6 }}><B w={70} h={8} /><B w={120} h={6} /></div></O>,
    tooltip: () => col([<div key="t" style={{ padding: "6px 10px", borderRadius: 6, background: "var(--primary)" }}><B w={54} h={6} style={{ background: "var(--primary-foreground)", opacity: 0.5 }} /></div>, <div key="a" style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid var(--primary)" }} />], { alignItems: "center", gap: 0 }),
    sonner: () => <O style={{ width: 170, padding: 10, display: "flex", gap: 8, boxShadow: "var(--shadow-md)" }}><div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}><B w={80} h={7} /><B w={120} h={6} /></div>{pill(38, false)}</O>,

    dialog: () => <div style={{ width: 176, height: 100, borderRadius: 8, background: "color-mix(in oklch, var(--foreground) 12%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}><O style={{ width: 120, padding: 10, boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column", gap: 6 }}><B w={70} h={8} /><B w={96} h={6} /><div style={{ display: "flex", justifyContent: "flex-end", gap: 5, marginTop: 4 }}>{pill(30, false)}{pill(34, true)}</div></O></div>,
    "alert-dialog": () => MINI.dialog(),
    sheet: () => <div style={{ width: 176, height: 100, borderRadius: 8, background: "color-mix(in oklch, var(--foreground) 12%, transparent)", display: "flex", justifyContent: "flex-end", overflow: "hidden" }}><div style={{ width: 78, background: "var(--card)", borderLeft: "1px solid var(--border)", padding: 10, display: "flex", flexDirection: "column", gap: 6 }}><B w={50} h={8} />{[60, 50, 60].map((w, i) => <B key={i} w={w} h={6} />)}</div></div>,
    drawer: () => <div style={{ width: 176, height: 100, borderRadius: 8, background: "color-mix(in oklch, var(--foreground) 12%, transparent)", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}><div style={{ background: "var(--card)", borderTop: "1px solid var(--border)", padding: 10, display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}><div style={{ width: 34, height: 4, borderRadius: 999, background: "var(--border)" }} /><B w={80} h={7} /><B w={120} h={6} /></div></div>,
    popover: () => <O style={{ width: 130, padding: 10, boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: 7 }}><B w={64} h={8} />{[100, 80].map((w, i) => <B key={i} w={w} h={6} />)}</O>,
    "dropdown-menu": () => <O style={{ width: 140, padding: 6, boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: 3 }}><B w={70} h={6} style={{ margin: "2px 4px" }} /><div style={{ height: 1, background: "var(--border)", margin: "2px 0" }} />{[110, 96, 104].map((w, i) => <div key={i} style={{ padding: "4px 4px" }}><B w={w} h={7} /></div>)}</O>,
    "hover-card": () => <O style={{ width: 168, padding: 10, boxShadow: "var(--shadow-md)", display: "flex", gap: 8 }}><B w={34} h={34} r={999} /><div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}><B w={60} h={8} />{[110, 90].map((w, i) => <B key={i} w={w} h={6} />)}</div></O>,
    "context-menu": () => <O style={{ width: 140, padding: 6, boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: 3 }}>{[100, 90].map((w, i) => <div key={i} style={{ padding: "4px" }}><B w={w} h={7} /></div>)}<div style={{ height: 1, background: "var(--border)", margin: "2px 0" }} /><div style={{ padding: "4px" }}><B w={80} h={7} /></div></O>,

    table: () => <O style={{ width: 176, overflow: "hidden" }}><div style={{ display: "flex", gap: 8, padding: "7px 10px", borderBottom: "1px solid var(--border)", background: "color-mix(in oklch, var(--muted) 40%, transparent)" }}>{[40, 34, 30].map((w, i) => <B key={i} w={w} h={6} />)}</div>{[0, 1, 2].map((r) => <div key={r} style={{ display: "flex", gap: 8, padding: "7px 10px", borderBottom: r < 2 ? "1px solid var(--border)" : 0 }}>{[44, 30, 36].map((w, i) => <B key={i} w={w} h={6} />)}</div>)}</O>,
    "data-table": () => <O style={{ width: 176, overflow: "hidden" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 8 }}><O style={{ width: 80, height: 20 }} />{pill(24, false)}</div>{[0, 1, 2].map((r) => <div key={r} style={{ display: "flex", gap: 8, padding: "6px 10px", borderTop: "1px solid var(--border)" }}>{[16, 40, 30].map((w, i) => <B key={i} w={w} h={6} />)}</div>)}</O>,
    calendar: () => <O style={{ padding: 10 }}><div style={{ display: "grid", gridTemplateColumns: "repeat(7, 12px)", gap: 5 }}>{Array.from({ length: 28 }).map((_, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 4, background: i === 12 ? "var(--primary)" : "var(--muted)" }} />)}</div></O>,
    "date-picker": () => <O style={{ width: 150, height: 30, display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }}><Icon name="calendar" size={14} style={{ color: "var(--muted-foreground)" }} /><B w={80} h={7} /></O>,
    carousel: () => row([<Icon key="l" name="chevron-left" size={16} style={{ color: "var(--muted-foreground)" }} />, <B key="c" w={104} h={80} r={8} />, <Icon key="r" name="chevron-right" size={16} style={{ color: "var(--muted-foreground)" }} />]),
    chart: () => <div style={{ display: "flex", alignItems: "flex-end", gap: 7, height: 74 }}>{[42, 66, 52, 34, 60, 46].map((h, i) => <div key={i} style={{ width: 12, height: h, borderRadius: 3, background: `var(--chart-${(i % 5) + 1})` }} />)}</div>,

    breadcrumb: () => row([<B key="a" w={34} h={7} />, <Icon key="s1" name="chevron-right" size={12} style={{ color: "var(--muted-foreground)" }} />, <B key="b" w={48} h={7} />, <Icon key="s2" name="chevron-right" size={12} style={{ color: "var(--muted-foreground)" }} />, <B key="c" w={40} h={7} />]),
    pagination: () => row([<Icon key="l" name="chevron-left" size={14} style={{ color: "var(--muted-foreground)" }} />, ...[0, 1, 2].map((i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 6, border: i === 1 ? 0 : "1px solid var(--border)", background: i === 1 ? "var(--primary)" : "transparent" }} />), <Icon key="r" name="chevron-right" size={14} style={{ color: "var(--muted-foreground)" }} />]),
    menubar: () => <O style={{ display: "flex", gap: 14, padding: "7px 12px" }}>{[34, 28, 34].map((w, i) => <B key={i} w={w} h={7} />)}</O>,
    "navigation-menu": () => <O style={{ display: "flex", gap: 14, padding: "9px 14px", alignItems: "center" }}>{[40, 34].map((w, i) => <B key={i} w={w} h={7} />)}<Icon name="chevron-down" size={12} style={{ color: "var(--muted-foreground)" }} /></O>,
    sidebar: () => <O style={{ width: 176, height: 96, display: "flex", overflow: "hidden" }}><div style={{ width: 58, background: "color-mix(in oklch, var(--muted) 55%, transparent)", borderRight: "1px solid var(--border)", padding: 9, display: "flex", flexDirection: "column", gap: 8 }}>{[30, 42, 34, 38].map((w, i) => <B key={i} w={w} h={6} />)}</div><div style={{ flex: 1, padding: 10 }}><B w={44} h={7} /></div></O>,
    board: () => <O style={{ width: 176, height: 96, display: "flex", gap: 6, padding: 8, background: "color-mix(in oklch, var(--muted) 40%, transparent)", overflow: "hidden" }}>{[3, 2, 1].map((n, ci) => <div key={ci} style={{ flex: 1, background: "color-mix(in oklch, var(--muted) 60%, transparent)", border: "1px solid var(--border)", borderRadius: 5, padding: 5, display: "flex", flexDirection: "column", gap: 4 }}><B w={22} h={5} />{Array.from({ length: n }).map((_, i) => <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 4, height: 14 }} />)}</div>)}</O>,
    aside: () => <O style={{ width: 176, height: 96, display: "flex", gap: 8, padding: 8, background: "color-mix(in oklch, var(--muted) 40%, transparent)" }}><div style={{ width: 48, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, padding: 7, display: "flex", flexDirection: "column", gap: 7 }}>{[24, 32, 28].map((w, i) => <B key={i} w={w} h={5} />)}</div><div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, padding: 10 }}><B w={40} h={7} /></div></O>,

    command: () => <O style={{ width: 170, boxShadow: "var(--shadow-md)", overflow: "hidden" }}><div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderBottom: "1px solid var(--border)" }}><Icon name="search" size={14} style={{ color: "var(--muted-foreground)" }} /><B w={90} h={7} /></div>{[110, 90].map((w, i) => <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 10px" }}><B w={12} h={12} r={4} /><B w={w} h={6} /></div>)}</O>,

    spinner: () => <div style={{ width: 30, height: 30, borderRadius: 999, border: "3px solid var(--muted)", borderTopColor: "var(--primary)" }} />,
    kbd: () => row([...["⌘", "K"].map((k, i) => <div key={i} style={{ minWidth: 22, height: 22, borderRadius: 5, border: "1px solid var(--border)", background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--muted-foreground)" }}>{k}</div>)]),
    empty: () => col([<div key="i" style={{ width: 34, height: 34, borderRadius: 8, background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="inbox" size={17} style={{ color: "var(--muted-foreground)" }} /></div>, <B key="a" w={90} h={8} />, <B key="b" w={130} h={6} />], { alignItems: "center" }),
    item: () => <O style={{ width: 176, padding: 10, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 26, height: 26, borderRadius: 6, background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="folder" size={14} style={{ color: "var(--muted-foreground)" }} /></div><div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}><B w={70} h={7} /><B w={100} h={6} /></div><Icon name="chevron-right" size={14} style={{ color: "var(--muted-foreground)" }} /></O>,
    marker: () => col([<B key="a" w={150} h={7} />, row([<B key="b1" w={30} h={7} />, <div key="m" style={{ width: 54, height: 12, borderRadius: 3, background: "color-mix(in oklch, var(--chart-4) 45%, transparent)" }} />, <B key="b2" w={26} h={7} />]), <B key="c" w={120} h={7} />], { alignItems: "flex-start" }),

    attachment: () => <O style={{ width: 168, padding: 8, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 26, height: 26, borderRadius: 6, background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="file" size={14} style={{ color: "var(--muted-foreground)" }} /></div><div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}><B w={80} h={7} /><B w={50} h={6} /></div><Icon name="x" size={13} style={{ color: "var(--muted-foreground)" }} /></O>,
    message: () => col([<div key="a" style={{ alignSelf: "flex-start", maxWidth: 130, padding: "7px 10px", borderRadius: 10, background: "var(--muted)" }}><B w={90} h={6} /></div>, <div key="b" style={{ alignSelf: "flex-end", maxWidth: 130, padding: "7px 10px", borderRadius: 10, background: "var(--primary)" }}><B w={70} h={6} style={{ background: "var(--primary-foreground)", opacity: 0.5 }} /></div>], { gap: 8, width: 168 }),
    "message-scroller": () => MINI.message(),
    fab: () => (
      <div style={{ position: "relative", width: 168, height: 60 }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, borderRadius: 8, background: "var(--muted)" }} />
        <div style={{ position: "absolute", right: 12, bottom: 12, width: 40, height: 40, borderRadius: 999, background: "var(--primary)", boxShadow: "var(--shadow-md)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-foreground)" stroke-width="3" stroke-linecap="round" style={{ opacity: 0.85 }}><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        </div>
      </div>
    ),
    "floating-menu": () => (
      <div style={{ position: "relative", width: 152, height: 96, border: "1px solid var(--border)", borderRadius: 8, background: "var(--card)" }}>
        <div style={{ position: "absolute", right: 12, bottom: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 15, height: 15, borderRadius: 999, background: "var(--muted)" }} />
          <div style={{ width: 15, height: 15, borderRadius: 999, background: "var(--muted)" }} />
          <div style={{ width: 30, height: 30, borderRadius: 999, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary-foreground)" stroke-width="3" stroke-linecap="round" style={{ opacity: 0.85 }}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </div>
        </div>
      </div>
    ),
    "icon-button": () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ padding: "5px 10px", borderRadius: 6, background: "var(--primary)" }}><B w={30} h={5} style={{ background: "var(--primary-foreground)", opacity: 0.65 }} /></div>
        <Icon name="star" size={26} style={{ color: "var(--muted-foreground)" }} />
      </div>
    ),
  };

  const GROUP_FALLBACK = (
    <O style={{ width: 160, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}><B w={80} h={8} />{[130, 110].map((w, i) => <B key={i} w={w} h={6} />)}</O>
  );

  function Tile({ demo, onSelect }) {
    const [hover, setHover] = React.useState(false);
    const mini = MINI[demo.id];
    return (
      <button type="button" onClick={() => onSelect(demo.id)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          all: "unset", cursor: "pointer", display: "flex", flexDirection: "column",
          border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden",
          background: "var(--card)", boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
          transform: hover ? "translateY(-2px)" : "none", transition: "transform .15s ease, box-shadow .15s ease, border-color .15s ease",
          borderColor: hover ? "var(--ring)" : "var(--border)",
        }}>
        <div style={{ height: 128, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "color-mix(in oklch, var(--muted) 35%, transparent)", borderBottom: "1px solid var(--border)", pointerEvents: "none" }}>
          {mini ? mini() : GROUP_FALLBACK}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "11px 14px" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{window.PG_ORDER ? window.PG_ORDER.nameOf(demo) : demo.name}</span>
          <span style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>{demo.group}</span>
        </div>
      </button>
    );
  }

  function ComponentsGrid({ demos, onSelect, query, fluid }) {
    const [, forceOrder] = React.useReducer((x) => x + 1, 0);
    React.useEffect(() => { const on = () => forceOrder(); window.addEventListener("pg-order:change", on); return () => window.removeEventListener("pg-order:change", on); }, []);
    const persist = () => { try { return localStorage.getItem("pg-persist-layout") !== "0"; } catch (e) { return true; } };
    const [grouped, setGrouped] = React.useState(() => { try { return persist() && localStorage.getItem("pg-grid-grouped") === "1"; } catch (e) { return false; } });
    React.useEffect(() => { if (!persist()) return; try { localStorage.setItem("pg-grid-grouped", grouped ? "1" : "0"); } catch (e) {} }, [grouped]);
    const [collapsed, setCollapsed] = React.useState(() => { try { return persist() ? JSON.parse(localStorage.getItem("pg-grid-collapsed") || "{}") : {}; } catch (e) { return {}; } });
    React.useEffect(() => { if (!persist()) return; try { localStorage.setItem("pg-grid-collapsed", JSON.stringify(collapsed)); } catch (e) {} }, [collapsed]);
    const toggleGroup = (g) => setCollapsed((c) => ({ ...c, [g]: !c[g] }));
    const maxWidth = containerWidth(fluid);

    const q = (query || "").trim().toLowerCase();
    const filtered = q ? demos.filter((d) => d.name.toLowerCase().includes(q) || d.group.toLowerCase().includes(q)) : demos;
    const RECENT = window.PLAYGROUND_RECENT || [];
    const sortMode = (() => { try { return localStorage.getItem("pg-sort") || "alpha"; } catch (e) { return "alpha"; } })();
    const list = sortMode === "recent"
      ? [...filtered].sort((a, b) => { const ia = RECENT.indexOf(a.id), ib = RECENT.indexOf(b.id); const ra = ia < 0 ? Infinity : ia, rb = ib < 0 ? Infinity : ib; return ra !== rb ? ra - rb : a.name.localeCompare(b.name); })
      : (window.PG_ORDER ? window.PG_ORDER.flatSort(filtered, ORDER) : [...filtered].sort((a, b) => a.name.localeCompare(b.name)));

    const ORDER = ["Forms", "Actions", "Layout", "Display", "Disclosure", "Feedback", "Overlays", "Data", "Navigation", "Command", "Primitives", "Chat"];
    const ICONS = { Forms: "edit", Actions: "add", Layout: "workspace", Display: "image", Disclosure: "chevrons-up-down", Feedback: "notification", Overlays: "copy", Data: "chart-bar", Navigation: "route", Command: "search", Primitives: "settings", Chat: "chat" };
    const groups = (window.PG_ORDER ? window.PG_ORDER.groupOrder(ORDER) : ORDER).map((g) => ({ group: g, items: (window.PG_ORDER ? window.PG_ORDER.sortItems(g, list.filter((d) => window.PG_ORDER.groupOf(d) === g)) : list.filter((d) => d.group === g)) })).filter((g) => g.items.length);

    const Grid = ({ items }) => (
      <div style={{ display: "grid", gridTemplateColumns: fluid ? "repeat(auto-fill, minmax(240px, 1fr))" : "repeat(3, 1fr)", gap: 18 }}>
        {items.map((d) => <Tile key={d.id} demo={d} onSelect={onSelect} />)}
      </div>
    );

    const SegBtn = ({ id, label, icon }) => {
      const on = (id === "grouped") === grouped;
      return (
        <button type="button" onClick={() => setGrouped(id === "grouped")}
          style={{
            display: "flex", alignItems: "center", gap: 6, border: 0, cursor: "pointer",
            padding: "0 12px", height: 32, fontSize: 13, fontFamily: "var(--font-sans)",
            fontWeight: on ? 500 : 400, background: on ? "var(--background)" : "transparent",
            color: on ? "var(--foreground)" : "var(--muted-foreground)",
            boxShadow: on ? "var(--shadow-sm)" : "none", borderRadius: "calc(var(--radius-md) - 3px)",
          }}>
          <Icon name={icon} size={14} /> {label}
        </button>
      );
    };

    return (
      <div style={{ maxWidth, margin: "0 auto", padding: "36px 32px 96px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>Components</h1>
            <p style={{ margin: "6px 0 0", fontSize: 15, color: "var(--muted-foreground)" }}>{list.length} components · click a tile to open its live demo.</p>
          </div>
          <div style={{ display: "flex", gap: 3, padding: 3, background: "var(--muted)", borderRadius: "var(--radius-md)" }}>
            <SegBtn id="grouped" label="Grouped" icon="menu" />
            <SegBtn id="flat" label="All" icon="workspace" />
          </div>
        </div>

        {list.length === 0
          ? <div style={{ fontSize: 14, color: "var(--muted-foreground)" }}>No components match the search.</div>
          : grouped
            ? <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                {groups.map(({ group, items }) => {
                  const isCollapsed = !!collapsed[group];
                  return (
                  <section key={group}>
                    <button type="button" onClick={() => toggleGroup(group)}
                      style={{ all: "unset", boxSizing: "border-box", display: "flex", alignItems: "center", gap: 8, width: "100%", cursor: "pointer", marginBottom: isCollapsed ? 0 : 14, paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                      <Icon name="chevron-right" size={15} style={{ color: "var(--muted-foreground)", transform: isCollapsed ? "none" : "rotate(90deg)", transition: "transform .15s ease" }} />
                      <Icon name={ICONS[group] || "folder"} size={15} style={{ color: "var(--muted-foreground)" }} />
                      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{group}</h2>
                      <span style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>{items.length}</span>
                    </button>
                    {!isCollapsed && <Grid items={items} />}
                  </section>
                  );
                })}
              </div>
            : <Grid items={list} />}
      </div>
    );
  }

  function Typography({ fluid }) {
    const maxW = fluid ? "100%" : 880;
    const p = { marginTop: 24, fontSize: 16, lineHeight: 1.75 };
    const h3 = { marginTop: 32, marginBottom: 0, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" };
    const link = { fontWeight: 500, color: "var(--primary)", textDecoration: "underline", textUnderlineOffset: 4 };
    const cell = { border: "1px solid var(--border)", padding: "8px 16px", textAlign: "left" };
    const rows = [["Empty", "Overflowing"], ["Modest", "Satisfied"], ["Full", "Ecstatic"]];
    return (
      <div style={{ maxWidth: maxW, margin: "0 auto", padding: "40px 32px 96px", fontFamily: "var(--font-sans)", color: "var(--foreground)" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--card)", padding: 80 }}>
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, letterSpacing: "-0.025em", textWrap: "balance" }}>Taxing Laughter: The Joke Tax Chronicles</h1>
        <p style={{ marginTop: 24, fontSize: 20, lineHeight: 1.6, color: "var(--muted-foreground)" }}>Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.</p>
        <h2 style={{ marginTop: 40, marginBottom: 0, paddingBottom: 8, fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", borderBottom: "1px solid var(--border)" }}>The King's Plan</h2>
        <p style={p}>The king thought long and hard, and finally came up with <a href="#" style={link}>a brilliant plan</a>: he would tax the jokes in the kingdom.</p>
        <blockquote style={{ marginTop: 24, paddingLeft: 24, borderLeft: "2px solid var(--border)", fontStyle: "italic" }}>"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</blockquote>
        <h3 style={h3}>The Joke Tax</h3>
        <p style={p}>The king's subjects were not amused. They grumbled and complained, but the king was firm:</p>
        <ul style={{ margin: "24px 0", paddingLeft: 24, listStyle: "disc", display: "flex", flexDirection: "column", gap: 8, fontSize: 16, lineHeight: 1.6 }}>
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners: 20 gold coins</li>
        </ul>
        <p style={p}>As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester.</p>
        <h3 style={h3}>Jokester's Revolt</h3>
        <p style={p}>Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.</p>
        <p style={p}>And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.</p>
        <h3 style={h3}>The People's Rebellion</h3>
        <p style={p}>The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.</p>
        <div style={{ margin: "24px 0", width: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
            <thead><tr><th style={{ ...cell, fontWeight: 700 }}>King's Treasury</th><th style={{ ...cell, fontWeight: 700 }}>People's happiness</th></tr></thead>
            <tbody>{rows.map((r, i) => (<tr key={i} style={{ background: i % 2 ? "var(--muted)" : "transparent" }}><td style={cell}>{r[0]}</td><td style={cell}>{r[1]}</td></tr>))}</tbody>
          </table>
        </div>
        <p style={p}>The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.</p>
        <p style={p}>The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.</p>
        </div>
        {S.H1 && <TypographyShowcase />}
      </div>
    );
  }

  function TypographyShowcase() {
    const { H1, H2, H3, H4, P, Blockquote, InlineCode, Lead, Large, Small, Muted, List } = S;
    const Row = ({ tag, children }) => (
      <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 20, alignItems: "baseline", padding: "14px 0", borderTop: "1px solid var(--border)" }}>
        <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}>{tag}</span>
        <div>{children}</div>
      </div>
    );
    return (
      <div style={{ marginTop: 40 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 600 }}>Typography components</h2>
        <p style={{ margin: "0 0 8px", fontSize: 14, color: "var(--muted-foreground)" }}>Composable elements from components/typography.</p>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--card)", padding: 80 }}>
          <Row tag="H1"><H1>The Joke Tax Chronicles</H1></Row>
          <Row tag="H2"><H2>The People of the Kingdom</H2></Row>
          <Row tag="H3"><H3>The Joke Tax</H3></Row>
          <Row tag="H4"><H4>People stopped telling jokes</H4></Row>
          <Row tag="Lead"><Lead>A modal dialog that interrupts the user with important content.</Lead></Row>
          <Row tag="P"><P>The king realized the error of his ways and repealed the joke tax.</P></Row>
          <Row tag="Blockquote"><Blockquote>"Everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</Blockquote></Row>
          <Row tag="List"><List><li>1st level of puns: 5 gold coins</li><li>2nd level of jokes: 10 gold coins</li><li>3rd level of one-liners: 20 gold coins</li></List></Row>
          <Row tag="Code">Use <InlineCode>@radix-ui/react-alert-dialog</InlineCode> to build this.</Row>
          <Row tag="Large"><Large>Are you absolutely sure?</Large></Row>
          <Row tag="Small"><Small>Email address</Small></Row>
          <Row tag="Muted"><Muted>Enter your email address.</Muted></Row>
          <Row tag="RTL"><P dir="rtl">الملك، عندما رأى مدى سعادة رعيته، أدرك خطأه وألغى ضريبة النكتة.</P></Row>
        </div>
      </div>
    );
  }

  window.PG_PAGES = { Overview, Typography, ComponentsGrid };
})();
