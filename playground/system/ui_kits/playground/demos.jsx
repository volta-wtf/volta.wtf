/* Playground demo registry. Each entry: { id, name, group, desc, render() }.
   Exposed on window.PLAYGROUND for Playground.jsx to consume. */
(function () {
  const S = window.TestDesignSystem_be7089;
  const {
    Button, Badge, Chip, FloatingButton, FloatingMenu, IconButton, DismissButton, ThemeSwitcher, Snippet, MultiSwitch, Input, Textarea, Label, Checkbox, RadioGroup, RadioGroupItem, Switch,
    Choicebox, ChoiceboxGroup,
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Toggle, ToggleGroup, ToggleGroupItem,
    ButtonGroup, ButtonGroupText, InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton,
    Field, FieldLabel, FieldDescription, FieldGroup, NativeSelect, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, Combobox,
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Separator, AspectRatio, ScrollArea,
    ResizablePanelGroup, ResizablePanel, ResizableHandle, DropSlot, Browser, Phone,
    Window, WindowTopbar, WindowToolbar, WindowTabbar, WindowContent,
    Avatar, AvatarImage, AvatarFallback, Skeleton, Progress, Slider, Gauge,
    Tabs, TabsList, TabsTrigger, TabsContent, Accordion, AccordionItem, AccordionTrigger, AccordionContent,
    Collapsible, CollapsibleTrigger, CollapsibleContent,
    Alert, AlertTitle, AlertDescription, Tooltip, TooltipTrigger, TooltipContent, Truncate, Toaster, toast, Error, ProjectBanner,
    Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
    Popover, PopoverTrigger, PopoverContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuShortcut,
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
    Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose,
    Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
    HoverCard, HoverCardTrigger, HoverCardContent, ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut,
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
    Calendar, DatePicker, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
    ChartContainer, Chart, ChartLegend, DataTable,
    Entity, EntityThumbnail, EntityContent, EntityTitle, EntityDescription, EntityActions, EntityList,
    Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
    Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
    Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut,
    NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
    SidebarProvider, Sidebar, SidebarHeader, SidebarFooter, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarInset, SidebarTrigger, Board, BoardColumn, BoardCard, Aside,
    Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
    Spinner, LoadingDots, StatusDot, Kbd, KbdGroup, Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent,
    Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup, ItemSeparator, Marker, Description,
    Attachment, AttachmentGroup, Bubble, Message, MessageScroller, Reaction, ReactionBar, ReactionToolbar, AddReactionButton, Icon, Picto, GridPicker, PanelPicker, MediaPicker, ColorPicker,
    Display, Heading, Text,
  } = S;

  const Row = ({ children, style }) => <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", ...style }}>{children}</div>;
  const Col = ({ children, style }) => <div style={{ display: "flex", flexDirection: "column", gap: 12, ...style }}>{children}</div>;

  // Sidebar demo — same three top controls as the Board demo.
  function SidebarDemo() {
    const [variant, setVariant] = React.useState("sidebar");
    const [side, setSide] = React.useState("left");
    const [collapsible, setCollapsible] = React.useState("icon");
    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, padding: "64px 20px 20px", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--background)", boxSizing: "border-box" }}>
          <Tabs value={variant} onValueChange={(v) => v && setVariant(v)}>
            <TabsList>
              <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
              <TabsTrigger value="floating">Floating</TabsTrigger>
              <TabsTrigger value="inset">Inset</TabsTrigger>
              <TabsTrigger value="inverse">Inverse</TabsTrigger>
            </TabsList>
          </Tabs>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Toggle variant="outline" size="sm" pressed={collapsible === "icon"} onPressedChange={(p) => setCollapsible(p ? "icon" : "offcanvas")} aria-label="Collapse to icon rail instead of hiding"><Icon name="panel-collapse" /></Toggle>
            <ToggleGroup type="single" variant="outline" size="sm" value={side} onValueChange={(v) => v && setSide(v)}>
              <ToggleGroupItem value="left" aria-label="Sidebar on left"><Icon name="sidebar-left" /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Sidebar on right"><Icon name="sidebar-right" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <SidebarProvider key={variant + side} style={{ height: 280, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <Sidebar variant={variant} side={side} collapsible={collapsible}>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton><Icon name="workspace" /> Acme Inc</SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem><SidebarMenuButton isActive><Icon name="house" /> Dashboard</SidebarMenuButton></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton><Icon name="inbox" /> Inbox</SidebarMenuButton><SidebarMenuBadge>4</SidebarMenuBadge></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton><Icon name="calendar" /> Calendar</SidebarMenuButton></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton><Icon name="search" /> Search</SidebarMenuButton></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem><SidebarMenuButton><Icon name="folder" /> Design System</SidebarMenuButton></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton><Icon name="settings" /> Settings</SidebarMenuButton></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton><Icon name="customer" /> shadcn</SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div style={{ padding: 16, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexDirection: side === "right" ? "row-reverse" : "row" }}>
                <SidebarTrigger className="ds-btn--icon-sm"><Icon name={side === "right" ? "sidebar-right" : "sidebar-left"} size={16} /></SidebarTrigger>
                <div style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>Page content</div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
        <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{variant} variant · {side} side · {collapsible} collapse</div>
      </div>
    );
  }

  // Aside demo — variant-aware app layout shell (sidebar + inset).
  function AsideDemo({ Layout = Aside, label = "Aside" }) {
    const [variant, setVariant] = React.useState("inset");
    const [side, setSide] = React.useState("right");
    const [collapsible, setCollapsible] = React.useState("offcanvas");
    const [sel, setSel] = React.useState(0);
    const Placeholder = window.PG_DEMO_UTILS.Placeholder;
    const sidebar = (
      <React.Fragment>
        <SidebarContent style={{ padding: 8 }}>
          <Placeholder>
            <span className="pg-empty-aside-hint">View aside</span>
          </Placeholder>
        </SidebarContent>
        <SidebarTrigger className={"pg-empty-aside-close pg-empty-aside-close--" + side} aria-label="Toggle aside">
          <Icon name="x" className="pg-close-icon--open" />
          <Icon name="panel-expand" className="pg-close-icon--collapsed" />
        </SidebarTrigger>
      </React.Fragment>
    );
    const MAIL = [
      { from: "Vercel", subj: "Your deployment is live", time: "9:41" },
      { from: "Linear", subj: "3 issues assigned to you", time: "8:12" },
      { from: "GitHub", subj: "PR #204 was merged", time: "Tue" },
      { from: "Figma", subj: "New comments on Board", time: "Mon" },
    ];
    const columns = [
      { width: 240, content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
            <SidebarTrigger className="ds-sidebar-inset-trigger ds-btn--icon-sm"><Icon name={side === "right" ? "sidebar-right" : "sidebar-left"} size={16} /></SidebarTrigger>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Inbox</span>
            <Badge variant="secondary" style={{ marginLeft: "auto" }}>{MAIL.length}</Badge>
          </div>
          {MAIL.map((m, i) => (
            <button key={i} onClick={() => setSel(i)} style={{ textAlign: "left", border: 0, borderBottom: "1px solid var(--border)", background: i === sel ? "var(--accent)" : "transparent", padding: "12px 16px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span style={{ fontSize: 13, fontWeight: 600 }}>{m.from}</span><span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{m.time}</span></div>
              <span style={{ fontSize: 12, color: "var(--muted-foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.subj}</span>
            </button>
          ))}
        </div>
      ) },
      { content: (
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{MAIL[sel].from} · {MAIL[sel].time}</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{MAIL[sel].subj}</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--muted-foreground)" }}>The inset is composed of multiple columns via the <code>columns</code> prop — a fixed list rail and a flexible detail pane, divided automatically.</p>
        </div>
      ) },
    ];
    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, padding: "64px 20px 20px", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--background)", boxSizing: "border-box" }}>
          <Tabs value={variant} onValueChange={(v) => v && setVariant(v)}>
            <TabsList>
              <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
              <TabsTrigger value="floating">Floating</TabsTrigger>
              <TabsTrigger value="inset">Inset</TabsTrigger>
              <TabsTrigger value="inverse">Inverse</TabsTrigger>
            </TabsList>
          </Tabs>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Toggle variant="outline" size="sm" pressed={collapsible === "icon"} onPressedChange={(p) => setCollapsible(p ? "icon" : "offcanvas")} aria-label="Collapse to icon rail instead of hiding"><Icon name="panel-collapse" /></Toggle>
            <ToggleGroup type="single" variant="outline" size="sm" value={side} onValueChange={(v) => v && setSide(v)}>
              <ToggleGroupItem value="left" aria-label="Sidebar on left"><Icon name="sidebar-left" /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Sidebar on right"><Icon name="sidebar-right" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <Layout key={variant + side} variant={variant} side={side} collapsible={collapsible} sidebar={sidebar} columns={columns} style={{ height: 280, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: 20, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexDirection: side === "right" ? "row-reverse" : "row" }}>
              <SidebarTrigger className="ds-sidebar-inset-trigger ds-btn--icon-sm"><Icon name={side === "right" ? "sidebar-right" : "sidebar-left"} size={16} /></SidebarTrigger>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Dashboard</div>
              </div>
            </div>
          </div>
        </Layout>
        <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{label} layout · {variant} variant · {side} side · {collapsible} collapse</div>
      </div>
    );
  }

  // Board demo — multi-column kanban layout.
  function BoardDemo() {
    const [variant, setVariant] = React.useState("columns");
    const [colInd, setColInd] = React.useState("line");
    const [cardInd, setCardInd] = React.useState("line");
    const COLS = [
      { id: "backlog", title: "Backlog", cards: ["PROJ-14", "PROJ-22", "PROJ-31", "PROJ-40", "PROJ-45", "PROJ-52", "PROJ-58", "PROJ-63", "PROJ-67", "PROJ-71", "PROJ-74", "PROJ-79", "PROJ-83", "PROJ-88", "PROJ-92"] },
      { id: "todo", title: "To do", cards: ["PROJ-08", "PROJ-17", "PROJ-25"] },
      { id: "doing", title: "Doing", cards: ["PROJ-03", "PROJ-11"] },
      { id: "done", title: "Done", cards: ["PROJ-01", "PROJ-02", "PROJ-05", "PROJ-06", "PROJ-09"] },
    ];
    const MiniCard = window.PG_DEMO_UTILS.PlaceholderCard;
    const IND = { line: { icon: "separator-vertical", label: "Line" }, ghost: { icon: "square-dashed", label: "Ghost" }, outline: { icon: "square", label: "Outline" } };
    const Picker = ({ label, value, onChange }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{label}</span>
        <Tabs value={value} onValueChange={(v) => v && onChange(v)}>
          <TabsList>
            {Object.entries(IND).map(([val, { icon, label: l }]) => (
              <Tooltip key={val}>
                <TooltipTrigger asChild>
                  <TabsTrigger value={val} aria-label={l + " indicator"}><Icon name={icon} size={15} /></TabsTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">{l}</TooltipContent>
              </Tooltip>
            ))}
          </TabsList>
        </Tabs>
      </div>
    );
    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, padding: "64px 20px 20px", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--background)", boxSizing: "border-box" }}>
          <Tabs value={variant} onValueChange={(v) => v && setVariant(v)}>
            <TabsList>
              <TabsTrigger value="columns">Columns</TabsTrigger>
              <TabsTrigger value="floating">Floating</TabsTrigger>
              <TabsTrigger value="inset">Inset</TabsTrigger>
            </TabsList>
          </Tabs>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Picker label="Cols" value={colInd} onChange={setColInd} />
            <Picker label="Items" value={cardInd} onChange={setCardInd} />
          </div>
        </div>
        <Board variant={variant} columnDropIndicator={colInd} cardDropIndicator={cardInd} style={{ height: 400, border: "1px solid var(--border)", borderRadius: 12, overflowX: "auto", overflowY: "hidden" }}>
          {COLS.map((col) => (
            <BoardColumn key={col.id} title={col.title} count={col.cards.length}
              actions={<Icon name="grip-vertical" size={16} style={{ color: "var(--muted-foreground)" }} />}>
              {col.cards.map((cid) => <MiniCard key={cid} id={cid} />)}
            </BoardColumn>
          ))}
        </Board>
      </div>
    );
  }

  // Draggable demo — headless drag-and-drop, flat lists (no nesting).
  function useSortable(initial, orientation) {
    const [order, setOrder] = React.useState(initial);
    const fromRef = React.useRef(null);
    const overRef = React.useRef(null);
    const [dragging, setDragging] = React.useState(null);
    const [over, setOver] = React.useState(null);
    const [size, setSize] = React.useState(null);
    const reset = () => { fromRef.current = null; overRef.current = null; setDragging(null); setOver(null); setSize(null); };
    const move = (id, index) => setOrder((prev) => {
      const f = prev.indexOf(id);
      const next = prev.filter((x) => x !== id);
      let at = index; if (f > -1 && f < index) at = index - 1;
      next.splice(Math.max(0, Math.min(at, next.length)), 0, id);
      return next;
    });
    const indexAt = (e, i, el) => {
      const r = el.getBoundingClientRect(); const prev = overRef.current;
      if (orientation === "horizontal") {
        const x = e.clientX - r.left, mid = r.width / 2, dz = Math.min(16, r.width * 0.15);
        if (x < mid - dz) return i; if (x > mid + dz) return i + 1; return prev != null ? prev : i + (x > mid ? 1 : 0);
      }
      const y = e.clientY - r.top, mid = r.height / 2, dz = Math.min(12, r.height * 0.2);
      if (y < mid - dz) return i; if (y > mid + dz) return i + 1; return prev != null ? prev : i + (y > mid ? 1 : 0);
    };
    const itemProps = (id, i) => ({
      draggable: true,
      "data-sortable-item": "",
      onDragStart: (e) => { fromRef.current = id; setDragging(id); const r = e.currentTarget.getBoundingClientRect(); setSize({ width: r.width, height: r.height }); e.dataTransfer.effectAllowed = "move"; },
      onDragEnd: reset,
      onDragOver: (e) => { if (fromRef.current == null) return; e.preventDefault(); e.stopPropagation(); const idx = indexAt(e, i, e.currentTarget); if (overRef.current !== idx) { overRef.current = idx; setOver(idx); } },
      onDrop: (e) => { if (fromRef.current == null) return; e.preventDefault(); e.stopPropagation(); const idx = overRef.current != null ? overRef.current : indexAt(e, i, e.currentTarget); move(fromRef.current, idx); reset(); },
    });
    const containerProps = () => ({
      onDragOver: (e) => {
        if (fromRef.current == null) return;
        e.preventDefault();
        // Only append at the end when the pointer is actually past the last item —
        // not while crossing the gaps between items (which route here too).
        const kids = [...e.currentTarget.querySelectorAll("[data-sortable-item]")].filter((k) => k.getBoundingClientRect().height > 0);
        const last = kids[kids.length - 1];
        if (!last) { if (overRef.current !== 0) { overRef.current = 0; setOver(0); } return; }
        const r = last.getBoundingClientRect();
        const beyond = orientation === "horizontal" ? e.clientX > r.right : e.clientY > r.bottom;
        if (beyond && overRef.current !== order.length) { overRef.current = order.length; setOver(order.length); }
      },
      onDrop: (e) => { if (fromRef.current == null) return; e.preventDefault(); const idx = overRef.current != null ? overRef.current : order.length; move(fromRef.current, idx); reset(); },
    });
    return { order, dragging, over, size, itemProps, containerProps };
  }
  const DRAG_STAGES = ["1", "2", "3", "4"];
  const DRAG_STEPS = ["1", "2", "3", "4", "5"];
  const dblk = (w, h) => ({ width: w, height: h, borderRadius: 999, background: "color-mix(in oklch, var(--muted-foreground) 22%, transparent)" });
  function DraggableDemo() {
    const [mode, setMode] = React.useState("line");
    const h = useSortable(DRAG_STAGES, "horizontal");
    const v = useSortable(DRAG_STEPS, "vertical");
    const label = (t, s) => <div style={{ marginBottom: 10, display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}><span style={{ fontSize: 13, fontWeight: 600 }}>{t}</span><span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{s}</span></div>;
    const slot = (s, i, orientation, key) => {
      if (s.over !== i) return null;
      if (mode === "outline") return null;
      return <DropSlot key={key} mode={mode} orientation={orientation} size={s.size} />;
    };
    const outlined = (s) => (mode === "outline" && s.dragging != null) ? { outline: "2px dashed var(--ring)", outlineOffset: "-3px" } : null;
    const chips = [];
    h.order.forEach((id, i) => {
      const sl = slot(h, i, "horizontal", "hs" + i); if (sl) chips.push(sl);
      chips.push(<div key={id} {...h.itemProps(id, i)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", cursor: "grab", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-full)", boxShadow: "var(--shadow-xs)", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", ...(mode === "ghost" && h.dragging === id ? { display: "none" } : { opacity: h.dragging === id ? 0.4 : 1, transition: "opacity 120ms ease" }) }}><Icon name="grip-vertical" size={14} style={{ color: "var(--muted-foreground)" }} /><div style={dblk(40, 8)} /><span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}>#{id}</span></div>);
    });
    { const sl = slot(h, h.order.length, "horizontal", "hse"); if (sl) chips.push(sl); }
    const rows = [];
    v.order.forEach((id, i) => {
      const sl = slot(v, i, "vertical", "vs" + i); if (sl) rows.push(sl);
      rows.push(<div key={id} {...v.itemProps(id, i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "grab", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-xs)", ...(mode === "ghost" && v.dragging === id ? { display: "none" } : { opacity: v.dragging === id ? 0.4 : 1, transition: "opacity 120ms ease" }) }}><Icon name="grip-vertical" size={16} style={{ color: "var(--muted-foreground)" }} /><div style={{ flex: 1 }}><div style={dblk("55%", 8)} /></div><span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}>#{id}</span></div>);
    });
    { const sl = slot(v, v.order.length, "vertical", "vse"); if (sl) rows.push(sl); }
    return (
      <div style={{ width: "100%", maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20, padding: "64px 20px 20px", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--background)", boxSizing: "border-box" }}>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Feedback</span>
          <Tabs value={mode} onValueChange={(m) => m && setMode(m)}>
            <TabsList>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="ghost">Ghost</TabsTrigger>
              <TabsTrigger value="outline">Outline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>{label("Pipeline stages · horizontal", "Drag chips to reorder left-to-right.")}
          <div {...h.containerProps()} style={{ display: "flex", alignItems: "stretch", gap: 8, padding: 10, minHeight: 52, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--muted)", overflowX: "auto", ...outlined(h) }}>{chips}</div>
        </div>
        <div>{label("Automation steps · vertical", "Drag rows to reorder top-to-bottom.")}
          <div {...v.containerProps()} style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 120, padding: 10, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--muted)", ...outlined(v) }}>{rows}</div>
        </div>
      </div>
    );
  }

  function ScrollBlurDemo() {
    const panel = { border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--card)", boxSizing: "border-box" };
    const item = { flex: "0 0 auto", height: 40, display: "flex", alignItems: "center", padding: "0 12px", borderRadius: "var(--radius-md)", background: "color-mix(in oklch, var(--foreground) 6%, transparent)", fontSize: 14 };
    const chip = { flex: "0 0 auto", width: 120, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-md)", background: "color-mix(in oklch, var(--foreground) 6%, transparent)", fontSize: 13, color: "var(--muted-foreground)" };
    return (
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Vertical · <code>.scroll-blur</code></span>
          <div className="scroll-blur scrollbar-none" style={{ ...panel, width: 240, height: 240, overflowY: "auto", padding: "0 12px", display: "flex", flexDirection: "column", gap: 8 }}>
            {Array.from({ length: 12 }, (_, i) => <div key={i} style={item}>Item {i + 1}</div>)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Horizontal · <code>.scroll-blur-x</code></span>
          <div className="scroll-blur-x scrollbar-none" style={{ ...panel, width: 360, height: 96, overflowX: "auto", padding: "12px 0", display: "flex", gap: 8, alignItems: "center" }}>
            {Array.from({ length: 10 }, (_, i) => <div key={i} style={chip}>Card {i + 1}</div>)}
          </div>
        </div>
      </div>
    );
  }

  function ScrollFadeDemo() {
    const panel = { border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--card)", boxSizing: "border-box" };
    const item = { flex: "0 0 auto", height: 40, display: "flex", alignItems: "center", padding: "0 12px", borderRadius: "var(--radius-md)", background: "color-mix(in oklch, var(--foreground) 6%, transparent)", fontSize: 14 };
    const chip = { flex: "0 0 auto", width: 120, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-md)", background: "color-mix(in oklch, var(--foreground) 6%, transparent)", fontSize: 13, color: "var(--muted-foreground)" };
    return (
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Vertical · <code>.scroll-fade</code></span>
          <div className="scroll-fade scrollbar-none" style={{ ...panel, width: 240, height: 240, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {Array.from({ length: 12 }, (_, i) => <div key={i} style={item}>Item {i + 1}</div>)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Horizontal · <code>.scroll-fade-x</code></span>
          <div className="scroll-fade-x scrollbar-none" style={{ ...panel, width: 360, height: 96, overflowX: "auto", padding: 12, display: "flex", gap: 8, alignItems: "center" }}>
            {Array.from({ length: 10 }, (_, i) => <div key={i} style={chip}>Card {i + 1}</div>)}
          </div>
        </div>
      </div>
    );
  }

  function FloatingMenuDemo() {
    const [bg, setBg] = React.useState("label");
    const [overlay, setOverlay] = React.useState(false);
    const ACTIONS = [{ icon: "image", label: "Photo" }, { icon: "gallery", label: "Gallery" }, { icon: "file", label: "Document" }];
    const Picker = ({ label, value, onChange, options }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{label}</span>
        <Tabs value={value} onValueChange={(v) => v && onChange(v)}>
          <TabsList>{options.map((o) => <TabsTrigger key={o[0]} value={o[0]}>{o[1]}</TabsTrigger>)}</TabsList>
        </Tabs>
      </div>
    );
    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", padding: "64px 20px 20px", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--background)", boxSizing: "border-box" }}>
          <Picker label="Background" value={bg} onChange={setBg} options={[["none", "None"], ["label", "Label"], ["icon", "Icon"]]} />
          <Picker label="Overlay" value={overlay ? "on" : "off"} onChange={(v) => setOverlay(v === "on")} options={[["off", "Off"], ["on", "On"]]} />
        </div>
        <div style={{ position: "relative", height: 320, border: "1px solid var(--border)", borderRadius: 12, background: "color-mix(in oklch, var(--muted) 50%, transparent)", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: 20, bottom: 20 }}>
            <FloatingMenu key={bg + overlay} icon="edit" background={bg === "none" ? undefined : bg} overlay={overlay} actions={ACTIONS} />
          </div>
        </div>
      </div>
    );
  }

  const D = [
    // 2.1 Forms & Actions
    { id: "button", name: "Button", group: "Actions", desc: "Displays a button or a component that looks like a button.", render: () => (
      <Col>
        <Row><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="destructive">Destructive</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button></Row>
        <Row><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Add"><Icon name="add" /></Button><Button><Icon name="download" /> With icon</Button><Button disabled><Spinner /> Loading</Button></Row>
      </Col>
    )},
    { id: "badge", name: "Badge", group: "Actions", desc: "Displays a badge or a component that looks like a badge.", render: () => (
      <Row><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="destructive">Destructive</Badge><Badge variant="outline">Outline</Badge><Badge><Icon name="check" /> Verified</Badge></Row>
    )},
    { id: "chip", name: "Chip", group: "Actions", desc: "Entity representation — filters, selections, removable.", render: () => (
      <Col style={{ gap: 12 }}>
        <Row><Chip variant="primary" media={<Icon name="customer" />}>Primary</Chip><Chip variant="secondary" media={<Icon name="customer" />}>Secondary</Chip><Chip variant="outline" media={<Icon name="customer" />}>Outline</Chip><Chip variant="ghost" media={<Icon name="customer" />}>Ghost</Chip></Row>
        <Row><Chip variant="secondary" media={<Icon name="customer" />} onRemove={() => {}}>Creative Tim UI</Chip><Chip variant="ghost" dropdown onClick={() => {}}>Etiquetas</Chip><Chip variant="secondary" selected onClick={() => {}}>Todos</Chip></Row>
      </Col>
    )},
    { id: "input", name: "Input", group: "Forms", desc: "Text input for forms — with Field labels, states, and layouts.", render: () => {
      const cap = { fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted-foreground)" };
      const countries = [{ label: "United States", value: "us" }, { label: "United Kingdom", value: "uk" }, { label: "Canada", value: "ca" }];
      return (
        <Col style={{ maxWidth: 380, width: "100%", gap: 24 }}>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Basic</span>
            <Input placeholder="Enter text" />
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Field</span>
            <Field>
              <FieldLabel htmlFor="in-username">Username</FieldLabel>
              <Input id="in-username" placeholder="Enter your username" />
              <FieldDescription>Choose a unique username for your account.</FieldDescription>
            </Field>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Disabled</span>
            <Field data-disabled>
              <FieldLabel htmlFor="in-disabled">Email</FieldLabel>
              <Input id="in-disabled" type="email" placeholder="Email" disabled />
              <FieldDescription>This field is currently disabled.</FieldDescription>
            </Field>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Invalid</span>
            <Field data-invalid>
              <FieldLabel htmlFor="in-invalid">Invalid Input</FieldLabel>
              <Input id="in-invalid" placeholder="Error" aria-invalid />
              <FieldDescription>This field contains validation errors.</FieldDescription>
            </Field>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>File</span>
            <Field>
              <FieldLabel htmlFor="in-file">Picture</FieldLabel>
              <Input id="in-file" type="file" />
              <FieldDescription>Select a picture to upload.</FieldDescription>
            </Field>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Required</span>
            <Field>
              <FieldLabel htmlFor="in-required">Required Field <span style={{ color: "var(--destructive)" }}>*</span></FieldLabel>
              <Input id="in-required" placeholder="This field is required" required />
              <FieldDescription>This field must be filled out.</FieldDescription>
            </Field>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Badge in label</span>
            <Field>
              <FieldLabel htmlFor="in-badge">Webhook URL <Badge variant="secondary" style={{ marginLeft: "auto" }}>Beta</Badge></FieldLabel>
              <Input id="in-badge" type="url" placeholder="https://api.example.com/webhook" />
            </Field>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Inline</span>
            <Field orientation="horizontal">
              <Input type="search" placeholder="Search…" />
              <Button>Search</Button>
            </Field>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Grid</span>
            <FieldGroup style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field><FieldLabel htmlFor="in-first">First Name</FieldLabel><Input id="in-first" placeholder="Jordan" /></Field>
              <Field><FieldLabel htmlFor="in-last">Last Name</FieldLabel><Input id="in-last" placeholder="Lee" /></Field>
            </FieldGroup>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Form</span>
            <FieldGroup>
              <Field><FieldLabel htmlFor="in-name">Name</FieldLabel><Input id="in-name" placeholder="Evil Rabbit" required /></Field>
              <Field>
                <FieldLabel htmlFor="in-email">Email</FieldLabel>
                <Input id="in-email" type="email" placeholder="john@example.com" />
                <FieldDescription>We'll never share your email with anyone.</FieldDescription>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field><FieldLabel htmlFor="in-phone">Phone</FieldLabel><Input id="in-phone" type="tel" placeholder="+1 (555) 123-4567" /></Field>
                <Field>
                  <FieldLabel htmlFor="in-country">Country</FieldLabel>
                  <Select defaultValue="us">
                    <SelectTrigger id="in-country"><SelectValue /></SelectTrigger>
                    <SelectContent>{countries.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
              </div>
              <Field orientation="horizontal">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Submit</Button>
              </Field>
            </FieldGroup>
          </Col>
        </Col>
      );
    }},
    { id: "textarea", name: "Textarea", group: "Forms", desc: "Displays a form textarea.", render: () => (
      <Col style={{ maxWidth: 360 }}><Label htmlFor="pt">Message</Label><Textarea id="pt" placeholder="Type your message here." /></Col>
    )},
    { id: "select", name: "Select", group: "Forms", desc: "Displays a list of options for the user to pick from.", render: () => (
      <Select defaultValue="apple"><SelectTrigger style={{ width: 200 }}><SelectValue placeholder="Fruit" /></SelectTrigger><SelectContent><SelectItem value="apple">Apple</SelectItem><SelectItem value="banana">Banana</SelectItem><SelectItem value="blueberry">Blueberry</SelectItem></SelectContent></Select>
    )},
    { id: "combobox", name: "Combobox", group: "Forms", desc: "Autocomplete input and command palette with a list of suggestions.", render: () => {
      const FW = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
      const TZ = [
        { label: "Americas", items: ["(GMT-5) New York", "(GMT-8) Los Angeles", "(GMT-3) São Paulo"] },
        { label: "Europe", items: ["(GMT+0) London", "(GMT+1) Paris", "(GMT+1) Berlin"] },
      ];
      const CO = [
        { value: "canada", label: "Canada", continent: "North America" },
        { value: "france", label: "France", continent: "Europe" },
        { value: "japan", label: "Japan", continent: "Asia" },
      ];
      const CAT = ["Technology", "Design", "Business", "Marketing"];
      const cell = (label, node) => <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{label}</span>{node}</div>;
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px 28px", alignItems: "start", width: "100%" }}>
          {cell("Basic", <Combobox options={FW} placeholder="Select a framework" />)}
          {cell("Multiple (chips)", <Combobox multiple options={FW} defaultValue={["Next.js"]} placeholder="Add framework" />)}
          {cell("Clear button", <Combobox showClear options={FW} defaultValue="Next.js" placeholder="Select a framework" />)}
          {cell("Groups", <Combobox groups={TZ} placeholder="Select a timezone" />)}
          {cell("Custom items", <Combobox options={CO} placeholder="Search countries…" renderItem={(o) => (<div style={{ display: "flex", flexDirection: "column", gap: 2 }}><span style={{ fontWeight: 500 }}>{o.label}</span><span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{o.continent}</span></div>)} />)}
          {cell("Invalid", <Combobox invalid options={FW} placeholder="Select a framework" />)}
          {cell("Disabled", <Combobox disabled options={FW} placeholder="Select a framework" />)}
          {cell("Auto highlight", <Combobox autoHighlight options={FW} placeholder="Select a framework" />)}
          {cell("Input group", <Combobox icon={<Icon name="workspace" />} groups={TZ} placeholder="Select a timezone" />)}
          {cell("Popup trigger", <Combobox options={CO} placeholder="Select country" trigger={<Button variant="outline" style={{ width: "100%", justifyContent: "space-between", fontWeight: 400 }} />} />)}
          {cell("RTL", <Combobox multiple dir="rtl" options={CAT} defaultValue={["Technology"]} placeholder="أضف فئات" />)}
        </div>
      );
    }},
    { id: "checkbox", name: "Checkbox", group: "Forms", desc: "A control that allows the user to toggle between checked and not checked.", render: () => (
      <Col><Row><Checkbox id="pc1" defaultChecked /><Label htmlFor="pc1">Checked</Label></Row><Row><Checkbox id="pc2" checked="indeterminate" /><Label htmlFor="pc2">Indeterminate</Label></Row><Row><Checkbox id="pc3" disabled /><Label htmlFor="pc3">Disabled</Label></Row></Col>
    )},
    { id: "radio-group", name: "Radio Group", group: "Forms", desc: "A set of checkable buttons where no more than one can be checked at a time.", render: () => (
      <RadioGroup defaultValue="comfortable"><Row><RadioGroupItem value="default" id="pr1" /><Label htmlFor="pr1">Default</Label></Row><Row><RadioGroupItem value="comfortable" id="pr2" /><Label htmlFor="pr2">Comfortable</Label></Row><Row><RadioGroupItem value="compact" id="pr3" /><Label htmlFor="pr3">Compact</Label></Row></RadioGroup>
    )},
    { id: "switch", name: "Switch", group: "Forms", desc: "A control that allows the user to toggle between on and off.", render: () => (
      <Col style={{ gap: 16 }}>
        <Row style={{ alignItems: "center", gap: 16 }}><Switch size="sm" defaultChecked /><Switch size="md" defaultChecked /><Switch size="lg" defaultChecked /></Row>
        <Row style={{ alignItems: "center", gap: 16 }}><Switch size="lg" icon={<Icon name="sun" />} checkedIcon={<Icon name="moon" />} defaultChecked /><Row><Switch id="ps2" disabled /><Label htmlFor="ps2">Disabled</Label></Row></Row>
      </Col>
    )},
    { id: "theme-switcher", name: "Theme Switcher", group: "Actions", desc: "Segmented light / system / dark control.", render: () => (
      <Col style={{ gap: 16, alignItems: "flex-start" }}><ThemeSwitcher defaultValue="system" /><ThemeSwitcher defaultValue="light" showLabels /></Col>
    )},
    { id: "multiswitch", name: "Multi Switch", group: "Actions", desc: "Segmented control that selects one of several options.", render: () => (
      <Col style={{ gap: 12, alignItems: "flex-start" }}><MultiSwitch options={["Day", "Week", "Month"]} defaultValue="Week" /><MultiSwitch size="sm" options={[{ label: "Production", value: "p" }, { label: "Preview", value: "pr" }, { label: "Development", value: "d" }]} defaultValue="pr" /><MultiSwitch size="xs" options={[{ label: "A–Z", value: "alpha" }, { label: "Recent", value: "recent" }]} defaultValue="alpha" /></Col>
    )},
    { id: "snippet", name: "Snippet", group: "Actions", desc: "Copyable command or code line.", render: () => (
      <Col style={{ gap: 12, maxWidth: 420 }}><Snippet prompt>npm install geist</Snippet><Snippet prompt commands={["git clone https://github.com/acme/app.git", "cd app", "pnpm install"]} /></Col>
    )},
    { id: "toggle", name: "Toggle / Group", group: "Actions", desc: "A two-state button that can be on or off.", render: () => (
      <Row><Toggle aria-label="Bold" defaultPressed><Icon name="bold" /></Toggle><Toggle variant="outline"><Icon name="italic" /> Italic</Toggle><ToggleGroup type="single" variant="outline" defaultValue="c"><ToggleGroupItem value="l" aria-label="Left"><Icon name="back" /></ToggleGroupItem><ToggleGroupItem value="c" aria-label="Center"><Icon name="menu" /></ToggleGroupItem><ToggleGroupItem value="r" aria-label="Right"><Icon name="forward" /></ToggleGroupItem></ToggleGroup></Row>
    )},
    { id: "button-group", name: "Button Group", group: "Actions", desc: "Group related buttons together.", render: () => (
      <Col><ButtonGroup><Button variant="outline"><Icon name="back" /></Button><Button variant="outline">Center</Button><Button variant="outline"><Icon name="forward" /></Button></ButtonGroup><ButtonGroup><ButtonGroupText>https://</ButtonGroupText><Button variant="outline">example.com</Button><Button variant="outline"><Icon name="copy" /></Button></ButtonGroup></Col>
    )},
    { id: "icon-button", name: "Icon Button", group: "Actions", desc: "Icon-only action — sized to the glyph, round hover background extends outward.", render: () => (
      <Row style={{ gap: 32 }}><IconButton icon="inbox" aria-label="Archive" /><IconButton icon="star" aria-label="Star" /><IconButton icon="more-vertical" aria-label="More" /><IconButton icon="send" aria-label="Send" /><IconButton icon="delete" aria-label="Delete" /><IconButton icon="add" variant="solid" aria-label="Add" /></Row>
    )},
    { id: "dismiss-button", name: "Dismiss Button", group: "Actions", desc: "A control on a soft rounded surface — close or remove.", render: () => (
      <Col style={{ gap: 20 }}>
        <Row style={{ gap: 24, alignItems: "center" }}><DismissButton size="xs" /><DismissButton size="sm" /><DismissButton /><DismissButton size="md" /><DismissButton size="lg" /></Row>
        <Row style={{ gap: 24, alignItems: "center" }}><DismissButton shape="circle" /><DismissButton shape="square" /></Row>
        <Row style={{ gap: 24, alignItems: "center" }}><DismissButton variant="ghost" /><DismissButton variant="default" /><DismissButton variant="primary" /></Row>
      </Col>
    )},
    { id: "fab", name: "Floating Button", group: "Actions", desc: "Floating action button — circular, elevated; extended shows a label.", render: () => (
      <Row style={{ gap: 20 }}><FloatingButton aria-label="Add"><Icon name="add" /></FloatingButton><FloatingButton variant="secondary" aria-label="Edit"><Icon name="edit" /></FloatingButton><FloatingButton variant="surface" aria-label="Share"><Icon name="copy" /></FloatingButton><FloatingButton size="sm" aria-label="Add"><Icon name="add" /></FloatingButton><FloatingButton extended><Icon name="add" /> New item</FloatingButton></Row>
    )},
    { id: "floating-menu", name: "Floating Menu", group: "Actions", bleed: true, desc: "Expandable floating action button (speed dial) — reveals labelled child actions.", render: () => <FloatingMenuDemo /> },
    { id: "input-group", name: "Input Group", group: "Forms", desc: "Group inputs with icons, text, or buttons.", render: () => (
      <Col style={{ maxWidth: 340 }}><InputGroup><InputGroupAddon><Icon name="search" /></InputGroupAddon><InputGroupInput placeholder="Search…" /></InputGroup><InputGroup><InputGroupText>https://</InputGroupText><InputGroupInput placeholder="example.com" /><InputGroupAddon align="end"><InputGroupButton>Copy</InputGroupButton></InputGroupAddon></InputGroup></Col>
    )},
    { id: "field", name: "Field", group: "Forms", desc: "Structured form field with label, control, and messages.", render: () => (
      <FieldGroup style={{ maxWidth: 340 }}><Field><FieldLabel htmlFor="pf1">Username</FieldLabel><Input id="pf1" placeholder="shadcn" /><FieldDescription>This is your public display name.</FieldDescription></Field></FieldGroup>
    )},
    { id: "native-select", name: "Native Select", group: "Forms", desc: "A styled native select element.", render: () => (
      <div style={{ maxWidth: 220 }}><NativeSelect defaultValue="banana"><option value="apple">Apple</option><option value="banana">Banana</option><option value="grapes">Grapes</option></NativeSelect></div>
    )},
    { id: "input-otp", name: "Input OTP", group: "Forms", desc: "Accessible one-time password component.", render: () => (
      <InputOTP maxLength={6} defaultValue="12"><InputOTPGroup><InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /></InputOTPGroup><InputOTPSeparator /><InputOTPGroup><InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} /></InputOTPGroup></InputOTP>
    )},

    // 2.2 Layout
    { id: "card", name: "Card", group: "Layout", desc: "Displays a card with header, content, and footer.", render: () => (
      <Card style={{ width: 340 }}><CardHeader><CardTitle>Create project</CardTitle><CardDescription>Deploy your new project in one click.</CardDescription></CardHeader><CardContent style={{ fontSize: 14, color: "var(--muted-foreground)" }}>Configure your framework and region.</CardContent><CardFooter style={{ justifyContent: "space-between" }}><Button variant="outline">Cancel</Button><Button>Deploy</Button></CardFooter></Card>
    )},
    { id: "separator", name: "Separator", group: "Layout", desc: "Visually or semantically separates content.", render: () => (
      <Col style={{ maxWidth: 320 }}><div style={{ fontWeight: 500 }}>Radix Primitives</div><Separator /><Row style={{ height: 20, gap: 12, fontSize: 14 }}><span>Blog</span><Separator orientation="vertical" /><span>Docs</span><Separator orientation="vertical" /><span>Source</span></Row></Col>
    )},
    { id: "aspect-ratio", name: "Aspect Ratio", group: "Layout", desc: "Displays content within a desired ratio.", render: () => (
      <div style={{ width: 320 }}><AspectRatio ratio={16/9}><img src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=640&q=80" alt="" style={{ borderRadius: 8, objectFit: "cover" }} /></AspectRatio></div>
    )},
    { id: "scroll-area", name: "Scroll Area", group: "Layout", desc: "Augments native scroll functionality.", render: () => (
      <ScrollArea style={{ height: 180, width: 280, border: "1px solid var(--border)", borderRadius: 8, padding: "8px 16px" }}><div style={{ fontWeight: 500, paddingBottom: 8 }}>Tags</div>{Array.from({length:20}).map((_,i)=><div key={i} style={{ fontSize: 14, padding: "6px 0", borderBottom: "1px solid var(--border)" }}>v1.2.0-beta.{20-i}</div>)}</ScrollArea>
    )},
    { id: "resizable", name: "Resizable", group: "Layout", desc: "Accessible resizable panel groups and layouts.", render: () => (
      <ResizablePanelGroup direction="horizontal" style={{ height: 180, maxWidth: 480, border: "1px solid var(--border)", borderRadius: 10 }}><ResizablePanel defaultSize={40}><div style={{ padding: 16, fontSize: 14, fontWeight: 500 }}>Sidebar</div></ResizablePanel><ResizableHandle withHandle /><ResizablePanel defaultSize={60}><div style={{ padding: 16, fontSize: 14, color: "var(--muted-foreground)" }}>Drag the handle to resize.</div></ResizablePanel></ResizablePanelGroup>
    )},
    { id: "browser", name: "Browser", group: "Layout", desc: "Browser window chrome — traffic lights, nav controls and an address bar.", render: () => {
      const u = (window.PG_TEXT && window.PG_TEXT.get("demoUrl")) || "vercel.com";
      const fav = (c) => <span style={{ width: 12, height: 12, borderRadius: 3, background: c }} />;
      return (
        <div style={{ width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
          <Browser url={u} variant="muted" height={32} />
          <Browser compact nav="none" variant="muted" url={u} tabsRow="square" onNewTab={() => {}} tabs={[{ favicon: fav("#22c55e"), title: "as — Buscar con Google", active: true, onClose: () => {} }, { favicon: fav("#6366f1"), title: "sad — Buscar con Google", onClose: () => {} }]} height={160} />
          <Browser nav="none" tabs={[{ favicon: fav("#22c55e"), title: "Vercel", active: true, onClose: () => {} }, { favicon: fav("#6366f1"), title: "Linear", onClose: () => {} }]} onNewTab={() => {}} height={140} />
        </div>
      );
    }},
    { id: "phone", name: "Phone", group: "Layout", desc: "iPhone-style device frame with an optional in-app browser bar.", render: () => (
      <Phone url={(window.PG_TEXT && window.PG_TEXT.get("demoUrl")) || "vercel.com"} width={300} />
    )},

    // 2.3 Display
    { id: "avatar", name: "Avatar", group: "Display", desc: "An image element with a fallback for representing the user.", render: () => (
      <Row style={{ alignItems: "center" }}><Avatar><AvatarImage src="https://i.pravatar.cc/64?img=12" alt="" /><AvatarFallback>CN</AvatarFallback></Avatar><Avatar><AvatarFallback>AL</AvatarFallback></Avatar><Avatar style={{ width: 48, height: 48 }}><AvatarFallback>JD</AvatarFallback></Avatar><div style={{ display: "flex" }}>{["1","2","3"].map((n,i)=>(<Avatar key={n} style={{ marginLeft: i? -10:0, boxShadow: "0 0 0 2px var(--background)" }}><AvatarImage src={"https://i.pravatar.cc/64?img="+(20+i)} alt="" /><AvatarFallback>U{n}</AvatarFallback></Avatar>))}</div></Row>
    )},
    { id: "skeleton", name: "Skeleton", group: "Display", desc: "Use to show a placeholder while content is loading.", render: () => (
      <Row><Skeleton style={{ width: 48, height: 48, borderRadius: "50%" }} /><Col style={{ gap: 8 }}><Skeleton style={{ width: 220, height: 12 }} /><Skeleton style={{ width: 170, height: 12 }} /></Col></Row>
    )},
    { id: "progress", name: "Progress", group: "Display", desc: "Displays an indicator showing completion progress.", render: () => (
      <Col style={{ width: "100%", maxWidth: 420, gap: 14 }}><Progress value={12} /><Progress value={40} /><Progress value={66} /><Progress value={100} /></Col>
    )},
    { id: "slider", name: "Slider", group: "Display", desc: "An input where the user selects a value from within a range.", render: () => (
      <Col style={{ width: "100%", maxWidth: 420, gap: 22 }}><Slider defaultValue={40} /><Slider defaultValue={60} step={10} /><Slider defaultValue={[25, 75]} /><Slider defaultValue={30} disabled /></Col>
    )},
    { id: "gauge", name: "Gauge", group: "Display", desc: "A circular progress arc showing a percentage.", render: () => (
      <Row style={{ gap: 28, alignItems: "center" }}><Gauge value={24} /><Gauge value={52} /><Gauge value={88} /><Gauge value={72} size={72} /><Gauge value={64} size={64} color="var(--primary)" /></Row>
    )},

    // 2.4 Disclosure
    { id: "tabs", name: "Tabs", group: "Disclosure", desc: "Layered sections of content displayed one at a time.", render: () => (
      <Col style={{ gap: 24, width: 380 }}>
        <Tabs defaultValue="account"><TabsList><TabsTrigger value="account">Account</TabsTrigger><TabsTrigger value="password">Password</TabsTrigger></TabsList><TabsContent value="account" style={{ fontSize: 14, color: "var(--muted-foreground)", paddingTop: 10 }}>Make changes to your account here.</TabsContent><TabsContent value="password" style={{ fontSize: 14, color: "var(--muted-foreground)", paddingTop: 10 }}>Change your password here.</TabsContent></Tabs>
        <Tabs defaultValue="overview"><TabsList variant="geist"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="analytics">Analytics</TabsTrigger><TabsTrigger value="reports">Reports</TabsTrigger></TabsList><TabsContent value="overview" style={{ fontSize: 14, color: "var(--muted-foreground)", paddingTop: 12 }}>Geist-style underline tabs.</TabsContent><TabsContent value="analytics" style={{ fontSize: 14, color: "var(--muted-foreground)", paddingTop: 12 }}>Analytics panel.</TabsContent><TabsContent value="reports" style={{ fontSize: 14, color: "var(--muted-foreground)", paddingTop: 12 }}>Reports panel.</TabsContent></Tabs>
      </Col>
    )},
    { id: "accordion", name: "Accordion", group: "Disclosure", desc: "A vertically stacked set of interactive headings.", render: () => {
      const FAQ = [
        { value: "shipping", q: "What are your shipping options?", a: "Standard (5–7 days), express (2–3 days), and overnight shipping. Free shipping on international orders." },
        { value: "returns", q: "What is your return policy?", a: "Returns accepted within 30 days in original packaging. Refunds in 5–7 business days." },
        { value: "support", q: "How can I contact support?", a: "Email, live chat, or phone — we respond within 24 hours on business days." },
      ];
      const cell = (label, node) => <div style={{ display: "flex", flexDirection: "column", gap: 10 }}><span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{label}</span>{node}</div>;
      const faqItems = FAQ.map((i) => <AccordionItem key={i.value} value={i.value}><AccordionTrigger>{i.q}</AccordionTrigger><AccordionContent>{i.a}</AccordionContent></AccordionItem>);
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px 32px", alignItems: "start", width: "100%" }}>
          {cell("Basic (single)", <Accordion defaultValue={["shipping"]}>{faqItems}</Accordion>)}
          {cell("Multiple", <Accordion multiple defaultValue={["shipping"]}>{FAQ.map((i) => <AccordionItem key={i.value} value={i.value}><AccordionTrigger>{i.q}</AccordionTrigger><AccordionContent>{i.a}</AccordionContent></AccordionItem>)}</Accordion>)}
          {cell("Disabled item", <Accordion defaultValue={["shipping"]}><AccordionItem value="shipping"><AccordionTrigger>Account history</AccordionTrigger><AccordionContent>View your complete history in the dashboard.</AccordionContent></AccordionItem><AccordionItem value="premium" disabled><AccordionTrigger>Premium feature</AccordionTrigger><AccordionContent>Upgrade to access.</AccordionContent></AccordionItem><AccordionItem value="email"><AccordionTrigger>Update email address</AccordionTrigger><AccordionContent>Change it in account settings.</AccordionContent></AccordionItem></Accordion>)}
          {cell("Borders", <Accordion defaultValue={["shipping"]} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "0 16px" }}>{FAQ.map((i) => <AccordionItem key={i.value} value={i.value}><AccordionTrigger>{i.q}</AccordionTrigger><AccordionContent>{i.a}</AccordionContent></AccordionItem>)}</Accordion>)}
          {cell("Card", <Card><CardHeader><CardTitle>Subscription &amp; Billing</CardTitle><CardDescription>Common account questions.</CardDescription></CardHeader><CardContent><Accordion className="ds-accordion--top-border" defaultValue={["shipping"]}>{FAQ.map((i) => <AccordionItem key={i.value} value={i.value}><AccordionTrigger>{i.q}</AccordionTrigger><AccordionContent>{i.a}</AccordionContent></AccordionItem>)}</Accordion></CardContent></Card>)}
          {cell("RTL", <Accordion defaultValue={["p1"]} dir="rtl"><AccordionItem value="p1"><AccordionTrigger>كيف يمكنني إعادة تعيين كلمة المرور؟</AccordionTrigger><AccordionContent>انقر على 'نسيت كلمة المرور' وأدخل بريدك الإلكتروني.</AccordionContent></AccordionItem><AccordionItem value="p2"><AccordionTrigger>هل يمكنني تغيير خطة الاشتراك؟</AccordionTrigger><AccordionContent>نعم، في أي وقت من إعدادات حسابك.</AccordionContent></AccordionItem></Accordion>)}
        </div>
      );
    }},
    { id: "collapsible", name: "Collapsible", group: "Disclosure", desc: "An interactive component which expands/collapses content.", render: () => (
      <Collapsible style={{ width: 340 }}><Row style={{ justifyContent: "space-between" }}><span style={{ fontWeight: 500, fontSize: 14 }}>@peduarte starred 3 repos</span><CollapsibleTrigger asChild><Button variant="ghost" size="icon" aria-label="Toggle"><Icon name="chevrons-up-down" /></Button></CollapsibleTrigger></Row><div style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", fontSize: 14, marginTop: 8 }}>@radix-ui/primitives</div><CollapsibleContent><div style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", fontSize: 14, marginTop: 8 }}>@radix-ui/colors</div></CollapsibleContent></Collapsible>
    )},

    // 2.5 Feedback
    { id: "choicebox", name: "Choicebox", group: "Forms", desc: "Selectable card option — radio, checkbox or switch.", render: () => (
      <Col style={{ maxWidth: 520, width: "100%", gap: 24 }}>
        <ChoiceboxGroup defaultValue="pro"><Choicebox value="hobby" title="Hobby" description="For personal projects." /><Choicebox value="pro" title="Pro" description="For professional teams." /></ChoiceboxGroup>
        <ChoiceboxGroup type="checkbox" columns={2} defaultValue={["analytics"]}><Choicebox value="analytics" icon="chart-bar" title="Web Analytics" description="Traffic insights." /><Choicebox value="speed" icon="trend-up" title="Speed Insights" description="Performance metrics." /></ChoiceboxGroup>
        <ChoiceboxGroup type="switch" columns={2} defaultValue={["firewall"]}><Choicebox value="firewall" icon="shield" title="Firewall" description="Block malicious traffic." /><Choicebox value="logs" icon="file" title="Audit Logs" description="Record access events." /></ChoiceboxGroup>
      </Col>
    )},
    { id: "alert", name: "Alert", group: "Feedback", desc: "Displays a callout for user attention.", render: () => (
      <Col style={{ maxWidth: 460 }}><Alert><Icon name="info" /><AlertTitle>Heads up!</AlertTitle><AlertDescription>You can add components to your app using the CLI.</AlertDescription></Alert><Alert variant="destructive"><Icon name="alert-triangle" /><AlertTitle>Error</AlertTitle><AlertDescription>Your session has expired. Please log in again.</AlertDescription></Alert></Col>
    )},
    { id: "tooltip", name: "Tooltip", group: "Feedback", desc: "A popup that displays information related to an element.", render: () => {
      const STATIC = { position: "static", transform: "none", inset: "auto" };
      return (
      <Col style={{ gap: 20, alignItems: "stretch", width: "100%" }}>
        <Row style={{ gap: 12, alignItems: "center" }}><Tooltip><TooltipTrigger asChild><Button variant="outline">Top</Button></TooltipTrigger><TooltipContent side="top">Add to library</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button variant="outline">Right</Button></TooltipTrigger><TooltipContent side="right">Add to library</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button variant="outline">Bottom</Button></TooltipTrigger><TooltipContent side="bottom">Add to library</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button variant="outline">Left</Button></TooltipTrigger><TooltipContent side="left">Add to library</TooltipContent></Tooltip><span style={{ alignSelf: "stretch", width: 1, background: "var(--border)", margin: "0 4px" }} /><IconButton icon="star" tooltip="Add to library" /><span style={{ alignSelf: "stretch", width: 1, background: "var(--border)", margin: "0 4px" }} /><div style={{ flex: 1, minWidth: 0, height: 44 }}><ResizablePanelGroup direction="horizontal" style={{ height: "100%" }}><ResizablePanel defaultSize={50} minSize={20} style={{ minWidth: 0, paddingRight: 10, display: "flex", alignItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", minWidth: 0, width: "100%" }}><Icon name="star" size={15} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} /><span style={{ flex: 1, minWidth: 0 }}><Truncate position="middle">El nombre del viento - edición completa.epub</Truncate></span></div></ResizablePanel><ResizableHandle withHandle /><ResizablePanel defaultSize={50} minSize={20} style={{ minWidth: 0, paddingLeft: 10, display: "flex", alignItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", minWidth: 0, width: "100%" }}><Icon name="star" size={15} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} /><span style={{ flex: 1, minWidth: 0 }}><Truncate>Documento de referencia muy largo.epub</Truncate></span></div></ResizablePanel></ResizablePanelGroup></div></Row>
        <Tooltip followCursor><TooltipTrigger asChild><div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 90, backgroundImage: "var(--pg-placeholder-border)", borderRadius: 8, color: "var(--muted-foreground)", fontSize: 14, cursor: "default" }}>follow — mueve el cursor por aquí</div></TooltipTrigger><TooltipContent>Add to library</TooltipContent></Tooltip>
        <Row style={{ gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <Tooltip defaultOpen><TooltipContent size="sm" style={STATIC}>Tooltip label</TooltipContent></Tooltip>
          <Tooltip defaultOpen><TooltipContent size="sm" shortcut="⌘+F" style={STATIC}>Tooltip label</TooltipContent></Tooltip>
          <Tooltip defaultOpen><TooltipContent style={STATIC}>Tooltip label</TooltipContent></Tooltip>
          <Tooltip defaultOpen><TooltipContent shortcut="⌘+F" style={STATIC}>Tooltip label</TooltipContent></Tooltip>
          <Tooltip defaultOpen><TooltipContent hint="Hint or ⌘⌥⇧⌃" style={STATIC}>Tooltip label</TooltipContent></Tooltip>
          <Tooltip defaultOpen><TooltipContent hint="(Haz click para copiar)" style={{ ...STATIC, textAlign: "center" }}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name="copy" size={15} /> +54 9 260 401 0976</span></TooltipContent></Tooltip>
          <Tooltip defaultOpen><TooltipContent media={<span />} hint="Hint ⌘⌥⇧⌃" style={STATIC}>Tooltip label</TooltipContent></Tooltip>
          <Tooltip defaultOpen><TooltipContent media={<span />} dismissible hint="Hint ⌘⌥⇧⌃" style={STATIC}>Tooltip label</TooltipContent></Tooltip>
          <Tooltip defaultOpen><TooltipContent media={<span />} dismissible description="Esta es una descripción corta y util para guiar al usuario con algo importante que aprender." footerLink="Conoce más aquí" action={<Button variant="ghost" size="sm">Entiendo</Button>} style={STATIC}>Tooltip label</TooltipContent></Tooltip>
        </Row>
      </Col>
      );
    }},
    { id: "error", name: "Error", group: "Feedback", desc: "Inline error message.", render: () => (
      <Col style={{ gap: 14, alignItems: "flex-start" }}><Error size="sm">This field is required.</Error><Error>Your credit card was declined. Try another payment method.</Error></Col>
    )},
    { id: "project-banner", name: "Project Banner", group: "Feedback", desc: "Full-width announcement bar.", render: () => (
      <Col style={{ gap: 12, maxWidth: 520, width: "100%" }}><ProjectBanner variant="info" icon="info">Your trial ends in 5 days.</ProjectBanner><ProjectBanner variant="warning" icon="circle-alert" onDismiss={() => {}}>Usage is approaching the plan limit.</ProjectBanner></Col>
    )},
    { id: "truncate", name: "Truncate", group: "Feedback", desc: "Ellipsis text that reveals the full string in a muted tooltip when clipped.", render: () => {
      const files = [
        "El nombre del viento - edición completa.epub",
        "Cien años de soledad (edición conmemorativa).pdf",
        "Rayuela.mobi",
        "La sombra del viento - saga completa anotada.epub",
        "Ficciones.pdf",
        "El amor en los tiempos del cólera revisado.docx",
        "1984.epub",
        "Crónica de una muerte anunciada comentada.pdf",
        "Pedro Páramo.mobi",
        "Los detectives salvajes - edición revisada.epub",
      ];
      const rows = [
        "Este texto es muy largo para leerlo completo",
        "Una descripción larga que no cabe en la celda de la tabla",
        "Registro breve",
        "Valor final bastante extenso para forzar el truncado",
        "Item mediano aquí",
        "Otro registro con un valor extenso que se recorta",
        "Valor normal",
        "Detalle adicional que excede el ancho disponible fácilmente",
      ];
      const cell = (t, pos) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderTop: "1px solid var(--border)", minWidth: 0 }}>
          <Icon name="star" size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
          <span style={{ flex: 1, minWidth: 0 }}>{pos === "middle" ? <Truncate position="middle">{t}</Truncate> : <Truncate reveal="rail">{t}</Truncate>}</span>
        </div>
      );
      const column = (pos, data) => (
        <Col style={{ gap: 0, border: "1px solid var(--border)", borderRadius: "var(--radius-md)", borderTop: 0, minWidth: 0 }}>
          {data.map((t, i) => <React.Fragment key={i}>{cell(t, pos)}</React.Fragment>)}
        </Col>
      );
      const caption = (pos, label) => (
        <Col style={{ gap: 2, alignItems: "center", flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 12, color: "var(--foreground)", fontWeight: 500 }}>{label}</span>
          <code style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}>{pos === "middle" ? 'position="middle" · reveal="cursor"' : 'position="end" · reveal="rail"'}</code>
        </Col>
      );
      return (
        <div style={{ width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ height: 300 }}>
            <ResizablePanelGroup direction="horizontal" style={{ height: "100%" }}>
              <ResizablePanel defaultSize={50} minSize={20} style={{ minWidth: 0, paddingRight: 20 }}>
                {column("middle", files)}
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={20} style={{ minWidth: 0, paddingLeft: 20 }}>
                {column("end", rows)}
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
          <Row style={{ gap: 20, alignItems: "baseline" }}>
            <code style={{ flex: 1, minWidth: 0, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)", textAlign: "left" }}><span style={{ color: "var(--foreground)", fontWeight: 600 }}>truncate medio</span> · follow cursor</code>
            <code style={{ flex: 1, minWidth: 0, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)", textAlign: "right" }}>follow rail · <span style={{ color: "var(--foreground)", fontWeight: 600 }}>truncate final</span></code>
          </Row>
        </div>
      );
    }},
    { id: "sonner", name: "Sonner (Toast)", group: "Feedback", desc: "An opinionated toast component for React.", render: () => (
      <React.Fragment><Button variant="outline" onClick={() => toast({ title: "Event created", description: "Sunday, December 03, 2023 at 9:00 AM" })}>Show toast</Button><Toaster /></React.Fragment>
    )},

    // 2.6 Overlays
    { id: "dialog", name: "Dialog", group: "Overlays", desc: "A window overlaid on the primary window.", render: () => (
      <Dialog><DialogTrigger asChild><Button variant="outline">Edit profile</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Make changes to your profile here.</DialogDescription></DialogHeader><Col style={{ gap: 8 }}><Label>Name</Label><Input defaultValue="Pedro Duarte" /></Col><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button>Save changes</Button></DialogFooter></DialogContent></Dialog>
    )},
    { id: "alert-dialog", name: "Alert Dialog", group: "Overlays", desc: "A modal dialog that interrupts with important content.", render: () => (
      <AlertDialog><AlertDialogTrigger asChild><Button variant="outline">Delete account</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    )},
    { id: "sheet", name: "Sheet", group: "Overlays", desc: "Extends the Dialog to display content from a screen edge.", render: () => (
      <Sheet><SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger><SheetContent side="right"><SheetHeader><SheetTitle>Edit profile</SheetTitle><SheetDescription>Make changes to your profile here.</SheetDescription></SheetHeader><Col style={{ gap: 8 }}><Label>Name</Label><Input defaultValue="Pedro Duarte" /></Col><SheetFooter><SheetClose asChild><Button>Save</Button></SheetClose></SheetFooter></SheetContent></Sheet>
    )},
    { id: "drawer", name: "Drawer", group: "Overlays", desc: "A drawer that slides in from the bottom.", render: () => (
      <Drawer><DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Move goal</DrawerTitle><DrawerDescription>Set your daily activity goal.</DrawerDescription></DrawerHeader><DrawerFooter><Button>Submit</Button><DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose></DrawerFooter></DrawerContent></Drawer>
    )},
    { id: "popover", name: "Popover", group: "Overlays", desc: "Displays rich content in a portal, triggered by a button.", render: () => (
      <Popover><PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger><PopoverContent><Col style={{ gap: 8 }}><div style={{ fontWeight: 500 }}>Dimensions</div><Label>Width</Label><Input defaultValue="100%" /><Label>Height</Label><Input defaultValue="25px" /></Col></PopoverContent></Popover>
    )},
    { id: "dropdown-menu", name: "Dropdown Menu", group: "Overlays", desc: "Displays a menu to the user triggered by a button.", render: () => (
      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Open menu <Icon name="chevron-down" /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>My Account</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem><Icon name="customer" /> Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem><DropdownMenuItem><Icon name="settings" /> Settings</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive"><Icon name="delete" /> Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
    )},
    { id: "hover-card", name: "Hover Card", group: "Overlays", desc: "For sighted users to preview content behind a link.", render: () => (
      <HoverCard><HoverCardTrigger asChild><Button variant="link">@nextjs</Button></HoverCardTrigger><HoverCardContent><Row style={{ gap: 12, flexWrap: "nowrap", alignItems: "flex-start" }}><Avatar><AvatarFallback>VC</AvatarFallback></Avatar><div><div style={{ fontWeight: 600 }}>@nextjs</div><div style={{ fontSize: 14, color: "var(--muted-foreground)" }}>The React Framework – created and maintained by @vercel.</div></div></Row></HoverCardContent></HoverCard>
    )},
    { id: "context-menu", name: "Context Menu", group: "Overlays", desc: "Displays a menu located at the pointer, triggered by right click.", render: () => (
      <ContextMenu><ContextMenuTrigger style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 140, width: 320, border: "1px dashed var(--border)", borderRadius: 8, fontSize: 14, color: "var(--muted-foreground)" }}>Right click here</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Back <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem><ContextMenuItem>Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem><ContextMenuSeparator /><ContextMenuItem variant="destructive">Delete</ContextMenuItem></ContextMenuContent></ContextMenu>
    )},

    // 2.7 Data
    { id: "entity", name: "Entity", group: "Data", desc: "Two-column data-model row (media + content · actions) — the base for Contact / User / Account, with list, checkbox and skeleton variants.", render: () => {
      const EntityDemo = () => {
        const PEOPLE = [
          { name: "Evil Rabbit", meta: "evil@rabbit.com", img: "https://i.pravatar.cc/64?img=13", role: "Owner" },
          { name: "Guillermo Rauch", meta: "rauchg · @rauchg", img: "https://i.pravatar.cc/64?img=12", role: "Admin" },
          { name: "Lee Robinson", meta: "leerob@vercel.com", img: "https://i.pravatar.cc/64?img=5", role: "Member" },
        ];
        const [checked, setChecked] = React.useState({ 0: true });
        const cap = { fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted-foreground)" };
        return (
          <Col style={{ gap: 20, maxWidth: 440, width: "100%" }}>
            <Col style={{ gap: 8 }}>
              <span style={cap}>List + checkbox</span>
              <EntityList>
                {PEOPLE.map((p, i) => (
                  <Entity key={i} selectable checked={!!checked[i]} onCheckedChange={(v) => setChecked((c) => ({ ...c, [i]: v }))}>
                    <EntityThumbnail><Avatar><AvatarImage src={p.img} alt="" /><AvatarFallback>{p.name.slice(0,2)}</AvatarFallback></Avatar></EntityThumbnail>
                    <EntityContent>
                      <EntityTitle>{p.name}</EntityTitle>
                      <EntityDescription>{p.meta}</EntityDescription>
                    </EntityContent>
                    <EntityActions>
                      <Badge variant="secondary">{p.role}</Badge>
                      <IconButton aria-label="More"><Icon name="more-horizontal" /></IconButton>
                    </EntityActions>
                  </Entity>
                ))}
              </EntityList>
            </Col>
            <Col style={{ gap: 8 }}>
              <span style={cap}>Densities — xs · sm · default · lg</span>
              <EntityList>
                {["xs", "sm", "default", "lg"].map((s, i) => (
                  <Entity key={s} size={s}>
                    <EntityThumbnail><Avatar><AvatarImage src={PEOPLE[i % PEOPLE.length].img} alt="" /><AvatarFallback>{PEOPLE[i % PEOPLE.length].name.slice(0,2)}</AvatarFallback></Avatar></EntityThumbnail>
                    <EntityContent><EntityTitle>{PEOPLE[i % PEOPLE.length].name}</EntityTitle><EntityDescription>size="{s}"</EntityDescription></EntityContent>
                    <EntityActions><Button size="sm" variant="outline">Manage</Button></EntityActions>
                  </Entity>
                ))}
              </EntityList>
            </Col>
            <Col style={{ gap: 8 }}>
              <span style={cap}>Compact — text inline, avatar scales with density</span>
              <EntityList>
                {["xs", "sm", "default", "lg"].map((s, i) => {
                  const p = PEOPLE[i % PEOPLE.length];
                  return (
                    <Entity key={s} compact variant="data" size={s}>
                      <EntityThumbnail><Avatar><AvatarImage src={p.img} alt="" /><AvatarFallback>{p.name.slice(0,2)}</AvatarFallback></Avatar></EntityThumbnail>
                      <EntityContent><EntityTitle>{p.name}</EntityTitle><EntityDescription>{p.meta}</EntityDescription></EntityContent>
                    </Entity>
                  );
                })}
              </EntityList>
            </Col>
            <Col style={{ gap: 8 }}>
              <span style={cap}>Ghost list — items as ghost cards (12px radius)</span>
              <EntityList variant="ghost">
                {PEOPLE.map((p, i) => (
                  <Entity key={i} interactive>
                    <EntityThumbnail><Avatar><AvatarImage src={p.img} alt="" /><AvatarFallback>{p.name.slice(0,2)}</AvatarFallback></Avatar></EntityThumbnail>
                    <EntityContent>
                      <EntityTitle>{p.name}</EntityTitle>
                      <EntityDescription>{p.meta}</EntityDescription>
                    </EntityContent>
                    <EntityActions><Icon name="chevron-right" style={{ color: "var(--muted-foreground)" }} /></EntityActions>
                  </Entity>
                ))}
              </EntityList>
            </Col>
            <Col style={{ gap: 8 }}>
              <span style={cap}>Loading</span>
              <EntityList>
                <Entity loading />
                <Entity loading />
              </EntityList>
            </Col>
          </Col>
        );
      };
      return <EntityDemo />;
    }},
    { id: "table", name: "Table", group: "Data", desc: "A responsive table component.", render: () => (
      <Table><TableCaption>A list of your recent invoices.</TableCaption><TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead><TableHead style={{ textAlign: "right" }}>Amount</TableHead></TableRow></TableHeader><TableBody>{[["INV001","Paid","default","$250.00"],["INV002","Pending","secondary","$150.00"],["INV003","Overdue","destructive","$350.00"]].map(r=>(<TableRow key={r[0]}><TableCell style={{ fontWeight: 500 }}>{r[0]}</TableCell><TableCell><Badge variant={r[2]}>{r[1]}</Badge></TableCell><TableCell style={{ textAlign: "right" }}>{r[3]}</TableCell></TableRow>))}</TableBody></Table>
    )},
    { id: "data-table", name: "Data Table", group: "Data", desc: "Powerful table with sorting, filtering, and pagination.", render: () => {
      const rows=[{status:"success",email:"ken99@example.com",amount:316},{status:"success",email:"abe45@example.com",amount:242},{status:"processing",email:"monserrat44@example.com",amount:837},{status:"failed",email:"carmella@example.com",amount:721},{status:"pending",email:"liam@example.com",amount:534}];
      const cols=[{key:"status",header:"Status",sortable:true,cell:r=>(<Badge variant={r.status==="failed"?"destructive":r.status==="success"?"default":"secondary"}>{r.status}</Badge>)},{key:"email",header:"Email",sortable:true},{key:"amount",header:"Amount",align:"right",sortable:true,cell:r=>"$"+r.amount.toFixed(2)}];
      return <DataTable columns={cols} data={rows} filterKey="email" filterPlaceholder="Filter emails…" selectable pageSize={4} />;
    }},
    { id: "calendar", name: "Calendar", group: "Data", desc: "A date field component that allows selecting dates.", render: () => (
      <div style={{ border: "1px solid var(--border)", borderRadius: 10, width: 300 }}><Calendar defaultSelected={new Date()} /></div>
    )},
    { id: "date-picker", name: "Date Picker", group: "Data", desc: "A date picker built with Calendar and Popover.", render: () => (<DatePicker placeholder="Pick a date" />)},
    { id: "carousel", name: "Carousel", group: "Data", desc: "A carousel with motion and swipe.", render: () => (
      <div style={{ padding: "0 40px", maxWidth: 280 }}><Carousel><CarouselContent>{[1,2,3,4,5].map(n=>(<CarouselItem key={n}><Card><CardContent style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 150, fontSize: 40, fontWeight: 600 }}>{n}</CardContent></Card></CarouselItem>))}</CarouselContent><CarouselPrevious /><CarouselNext /></Carousel></div>
    )},
    { id: "chart", name: "Chart", group: "Data", desc: "Beautiful charts built using a config-driven API.", render: () => {
      const data=[{label:"Jan",desktop:186,mobile:80},{label:"Feb",desktop:305,mobile:200},{label:"Mar",desktop:237,mobile:120},{label:"Apr",desktop:173,mobile:190},{label:"May",desktop:209,mobile:130},{label:"Jun",desktop:264,mobile:140}];
      const config={desktop:{label:"Desktop",color:"var(--chart-1)"},mobile:{label:"Mobile",color:"var(--chart-2)"}};
      return <div style={{ maxWidth: 520 }}><ChartContainer config={config}><Chart type="bar" data={data} height={220} /><ChartLegend /></ChartContainer></div>;
    }},

    // 2.8 Navigation
    { id: "breadcrumb", name: "Breadcrumb", group: "Navigation", desc: "Displays the path to the current resource.", render: () => (
      <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
    )},
    { id: "pagination", name: "Pagination", group: "Navigation", desc: "Pagination with page navigation.", render: () => (
      <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#" /></PaginationItem><PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationNext href="#" /></PaginationItem></PaginationContent></Pagination>
    )},
    { id: "menubar", name: "Menubar", group: "Navigation", desc: "A visually persistent menu common in desktop apps.", render: () => (
      <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem><MenubarSeparator /><MenubarItem>Print… <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>Edit</MenubarTrigger><MenubarContent><MenubarItem>Undo</MenubarItem><MenubarItem>Redo</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarItem>Reload</MenubarItem></MenubarContent></MenubarMenu></Menubar>
    )},
    { id: "navigation-menu", name: "Navigation Menu", group: "Navigation", desc: "A collection of links for navigating websites.", render: () => (
      <div style={{ minHeight: 220 }}><NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Getting started</NavigationMenuTrigger><NavigationMenuContent><div style={{ display: "grid", gap: 6, width: 360 }}><NavigationMenuLink href="#" title="Introduction">Re-usable components built with Radix UI and Tailwind CSS.</NavigationMenuLink><NavigationMenuLink href="#" title="Installation">How to install dependencies and structure your app.</NavigationMenuLink></div></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu></div>
    )},
    { id: "sidebar", name: "Sidebar", group: "Layout", desc: "Composable, collapsible application sidebar.", render: () => <SidebarDemo /> },
    { id: "board", name: "Board", group: "Layout", desc: "Multi-column kanban layout — columns as stages of a flow.", render: () => <BoardDemo /> },
    { id: "aside", name: "Aside", group: "Layout", desc: "Variant-aware app layout shell (sidebar + inset content).", render: () => <AsideDemo /> },
    { id: "draggable", name: "Draggable", group: "Layout", desc: "Headless drag-and-drop — reorder flat lists in any direction.", render: () => <DraggableDemo /> },
    { id: "scroll-fade", name: "Scroll Fade", group: "Layout", desc: "Fade the edges of a scroll container — scroll-aware, no JS.", render: () => <ScrollFadeDemo /> },
    { id: "scroll-blur", name: "Scroll Blur", group: "Layout", desc: "Blur the edges of a scroll container — scroll-aware, no JS.", render: () => <ScrollBlurDemo /> },
    { id: "shimmer", name: "Shimmer", group: "Layout", desc: "Moving highlight swept across text — pure CSS.", render: () => (
      <Col style={{ gap: 16, alignItems: "flex-start" }}>
        <p className="shimmer" style={{ fontSize: 16, color: "var(--muted-foreground)", margin: 0 }}>Generating response…</p>
        <p className="shimmer shimmer-duration-1000" style={{ fontSize: 16, color: "var(--muted-foreground)", margin: 0 }}>Generating response…</p>
        <p className="shimmer shimmer-color-blue shimmer-spread-24" style={{ fontSize: 16, color: "var(--muted-foreground)", margin: 0 }}>Generating response…</p>
        <p className="shimmer" style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Thinking…</p>
        <p className="shimmer" dir="rtl" style={{ fontSize: 16, color: "var(--muted-foreground)", margin: 0 }}>جارٍ إنشاء الرد…</p>
      </Col>
    )},
    { id: "command", name: "Command", group: "Navigation", desc: "Fast, composable command menu for React.", render: () => (
      <Command style={{ maxWidth: 440, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}><CommandInput placeholder="Type a command or search..." /><CommandList><CommandGroup heading="Suggestions"><CommandItem keywords="calendar"><Icon name="calendar" /> Calendar</CommandItem><CommandItem keywords="search"><Icon name="search" /> Search</CommandItem><CommandItem keywords="settings"><Icon name="settings" /> Settings <CommandShortcut>⌘S</CommandShortcut></CommandItem></CommandGroup><CommandSeparator /><CommandGroup heading="Contacts"><CommandItem keywords="profile"><Icon name="customer" /> Profile</CommandItem><CommandItem keywords="mail"><Icon name="mail" /> Mail</CommandItem></CommandGroup></CommandList></Command>
    )},

    // 2.10 Primitives
    { id: "description", name: "Description", group: "Primitives", desc: "A compact label / value metadata pair.", render: () => (
      <Row style={{ gap: 48 }}><Col style={{ gap: 16 }}><Description title="Environment">Production</Description><Description title="Domain" hint="The primary domain for this deployment.">acme.vercel.app</Description></Col><Col style={{ gap: 16 }}><Description title="Status" inline>Ready</Description><Description title="Branch" inline>main</Description></Col></Row>
    )},
    { id: "text", name: "Text", group: "Primitives", desc: "Display, Heading, Text & Label — semantic level decoupled from visual level.", render: () => {
      const tag = (t) => <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted-foreground)" }}>{t}</span>;
      const row = (node, t) => <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{node}{tag(t)}</div>;
      return (
        <Col style={{ gap: 18, alignItems: "flex-start", maxWidth: 620 }}>
          {row(<Display size="sm">Display</Display>, "<Display/>")}
          {row(<Heading level={2}>Heading level 2</Heading>, "<Heading level={2}/>")}
          {row(<Heading as="h2" size={5}>Semantic h2, visual level 5</Heading>, "<Heading as=\"h2\" size={5}/>")}
          {row(<Text>Body base — the quick brown fox jumps over the lazy dog.</Text>, "<Text/>")}
          {row(<Text variant="lead">Lead — a larger, muted intro paragraph.</Text>, "<Text variant=\"lead\"/>")}
          {row(<Text variant="muted" size="sm">Muted small — supporting helper copy.</Text>, "<Text variant=\"muted\" size=\"sm\"/>")}
          {row(<Label>Email address</Label>, "<Label/>")}
        </Col>
      );
    }},
    { id: "spinner", name: "Spinner", group: "Primitives", desc: "Loading indicator — circular (ring) for buttons, bars for tables/rows.", render: () => (
      <Col style={{ gap: 24, alignItems: "flex-start" }}>
        <Row style={{ alignItems: "flex-end", gap: 20 }}>
          {["sm","md","lg","xl","2xl","3xl","4xl"].map((s) => <Spinner key={s} size={s} style={{ color: "var(--muted-foreground)" }} />)}
        </Row>
        <Row style={{ alignItems: "flex-end", gap: 20 }}>
          {["sm","md","lg","xl","2xl","3xl","4xl"].map((s) => <Spinner key={s} variant="bars" size={s} style={{ color: "var(--muted-foreground)" }} />)}
        </Row>
        <Row style={{ alignItems: "center", gap: 28, flexWrap: "wrap" }}>
          <Button disabled><Spinner size="sm" /> Please wait</Button>
          <div style={{ minWidth: 220, border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}><Spinner variant="bars" size="md" style={{ color: "var(--muted-foreground)" }} /><span style={{ fontSize: 14 }}>Cargando fila…</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderTop: "1px solid var(--border)" }}><Spinner variant="bars" size="md" style={{ color: "var(--muted-foreground)" }} /><span style={{ fontSize: 14 }}>Procesando datos…</span></div>
          </div>
        </Row>
      </Col>
    )},
    { id: "loading-dots", name: "Loading Dots", group: "Primitives", desc: "Three sequentially-pulsing dots for inline loading states.", render: () => (
      <Row style={{ alignItems: "center", gap: 24 }}><LoadingDots /><LoadingDots size={6} /><Button disabled>Deploying <LoadingDots /></Button><span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>Thinking <LoadingDots /></span></Row>
    )},
    { id: "status-dot", name: "Status Dot", group: "Primitives", desc: "A small colored dot conveying state, optionally pulsing.", render: () => (
      <Col style={{ gap: 16, alignItems: "flex-start" }}>
        <Row style={{ alignItems: "center", gap: 24 }}><StatusDot status="ready" label="Ready" /><StatusDot status="error" label="Error" /><StatusDot status="warning" label="Building" /><StatusDot status="info" label="Queued" /><StatusDot status="neutral" label="Idle" /></Row>
        <Row style={{ alignItems: "center", gap: 24 }}><StatusDot status="ready" pulse label="Live" /><StatusDot status="warning" pulse label="Deploying" /></Row>
      </Col>
    )},
    { id: "kbd", name: "Kbd", group: "Primitives", desc: "Used to display textual user input from keyboard.", render: () => (
      <Row><KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup><KbdGroup><Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>P</Kbd></KbdGroup><Kbd>Esc</Kbd><Kbd>Enter</Kbd></Row>
    )},
    { id: "empty", name: "Empty", group: "Primitives", desc: "Use to display an empty state.", render: () => (
      <div style={{ border: "1px solid var(--border)", borderRadius: 10, maxWidth: 420 }}><Empty><EmptyHeader><EmptyMedia><Icon name="inbox" /></EmptyMedia><EmptyTitle>No projects yet</EmptyTitle><EmptyDescription>Create your first project to get started.</EmptyDescription></EmptyHeader><EmptyContent><Button><Icon name="add" /> New project</Button></EmptyContent></Empty></div>
    )},
    { id: "item", name: "Item", group: "Primitives", desc: "A flexible component for list rows and settings.", render: () => (
      <ItemGroup style={{ maxWidth: 440, border: "1px solid var(--border)", borderRadius: 10, padding: 4 }}><Item><ItemMedia variant="icon"><Icon name="folder" /></ItemMedia><ItemContent><ItemTitle>Project files</ItemTitle><ItemDescription>128 files · updated 2h ago</ItemDescription></ItemContent><ItemActions><Button variant="ghost" size="icon" aria-label="More"><Icon name="more-horizontal" /></Button></ItemActions></Item><ItemSeparator /><Item><ItemMedia variant="icon"><Icon name="star" /></ItemMedia><ItemContent><ItemTitle>Starred</ItemTitle><ItemDescription>12 items</ItemDescription></ItemContent><ItemActions><Icon name="chevron-right" /></ItemActions></Item></ItemGroup>
    )},
    { id: "marker", name: "Marker", group: "Primitives", desc: "Highlight a span of text inline.", render: () => (
      <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 460 }}>The quick <Marker>brown fox</Marker> jumps over the lazy dog. Use a marker to <Marker>emphasize</Marker> a key phrase inline.</p>
    )},

    // 2.11 Chat
    { id: "attachment", name: "Attachment", group: "Chat", desc: "File or image attachment chip — with states, sizes, orientation, and groups.", render: () => {
      const cap = { fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted-foreground)" };
      const IMG = "https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=200&q=80";
      return (
        <Col style={{ gap: 24, width: "100%", maxWidth: 520 }}>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Default</span>
            <Row><Attachment name="sales-dashboard.pdf" size="PDF · 2.4 MB" icon="file" onRemove={()=>{}} /><Attachment name="quarterly-report.xlsx" size="1.1 MB" icon="invoice" /></Row>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Image (vertical)</span>
            <Row><Attachment orientation="vertical" name="workspace.png" size="PNG · 480 KB" src={IMG} onRemove={()=>{}} /><Attachment name="cover.jpg" size="JPG · 1.8 MB" src={IMG} /></Row>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>States</span>
            <Row>
              <Attachment state="uploading" name="uploading.mov" size="Uploading… 40%" icon="file" />
              <Attachment state="processing" name="processing.zip" size="Processing…" icon="file" />
              <Attachment state="error" name="broken.pdf" size="Upload failed — too large" icon="file" onRemove={()=>{}} />
              <Attachment state="done" name="done.pdf" size="PDF · 2.4 MB" icon="file" />
            </Row>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Sizes</span>
            <Row style={{ alignItems: "center" }}>
              <Attachment name="default.pdf" size="2.4 MB" icon="file" />
              <Attachment scale="sm" name="small.pdf" size="2.4 MB" icon="file" />
              <Attachment scale="xs" name="extra-small.pdf" icon="file" />
            </Row>
          </Col>
          <Col style={{ gap: 8 }}>
            <span style={cap}>Group (scrollable)</span>
            <AttachmentGroup style={{ maxWidth: 360 }}>
              <Attachment name="research-summary.pdf" size="2.4 MB" icon="file" onRemove={()=>{}} />
              <Attachment name="quarterly-report.xlsx" size="1.1 MB" icon="invoice" onRemove={()=>{}} />
              <Attachment name="workspace.png" size="480 KB" src={IMG} onRemove={()=>{}} />
              <Attachment name="notes.txt" size="12 KB" icon="file" onRemove={()=>{}} />
            </AttachmentGroup>
          </Col>
        </Col>
      );
    }},
    { id: "message", name: "Message & Bubble", group: "Chat", desc: "Chat message rows with avatars and bubbles.", render: () => (
      <div style={{ maxWidth: 520 }}><Message role="assistant" name="Claude" avatar={<Avatar><AvatarFallback>C</AvatarFallback></Avatar>}>Sure — here's a quick summary of the discussion.</Message><Message role="user" name="You" avatar={<Avatar><AvatarFallback>Y</AvatarFallback></Avatar>}>Thanks, that's perfect!</Message></div>
    )},
    { id: "message-scroller", name: "Message Scroller", group: "Chat", desc: "Auto-scrolling container for a message thread.", render: () => (
      <div style={{ border: "1px solid var(--border)", borderRadius: 10, maxWidth: 520 }}><MessageScroller style={{ height: 220, padding: 12 }}><Message role="assistant" name="Claude" avatar={<Avatar><AvatarFallback>C</AvatarFallback></Avatar>}>Welcome! Ask me anything.</Message><Message role="user" name="You" avatar={<Avatar><AvatarFallback>Y</AvatarFallback></Avatar>}>What's the weather like?</Message><Message role="assistant" name="Claude" avatar={<Avatar><AvatarFallback>C</AvatarFallback></Avatar>}>I can't check live weather, but I can point you to a source.</Message></MessageScroller></div>
    )},
    { id: "reaction", name: "Reaction", group: "Chat", desc: "Applied-reaction chips, an add-reaction addon, and a floating quick-react toolbar.", render: () => {
      const ReactionDemo = () => {
        const [reactions, setReactions] = React.useState([
          { emoji: "thumbs-up", count: 4, active: true },
          { emoji: "joy", count: 2, active: false },
          { emoji: "heart-eyes", count: 1, active: false },
        ]);
        const toggle = (emoji) => setReactions((rs) => {
          const hit = rs.find((r) => r.emoji === emoji);
          if (hit) return rs.map((r) => r.emoji === emoji ? { ...r, active: !r.active, count: r.count + (r.active ? -1 : 1) } : r).filter((r) => r.count > 0);
          return [...rs, { emoji, count: 1, active: true }];
        });
        const cap = { fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted-foreground)" };
        return (
          <Col style={{ gap: 24, maxWidth: 420 }}>
            <Col style={{ gap: 10 }}>
              <span style={cap}>Reaction bar (chips + add)</span>
              <div style={{ maxWidth: 320, padding: "10px 14px", borderRadius: 14, background: "var(--secondary)", fontSize: 14 }}>Ship it 🚀 — great work on the picker refactor.</div>
              <ReactionBar reactions={reactions} onToggle={toggle} onReact={toggle} />
            </Col>
            <Col style={{ gap: 10 }}>
              <span style={cap}>Floating quick-react toolbar</span>
              <ReactionToolbar onReact={toggle} />
            </Col>
            <Col style={{ gap: 10 }}>
              <span style={cap}>Add-reaction addon</span>
              <Row style={{ gap: 8, alignItems: "center" }}>
                <AddReactionButton onReact={toggle} />
                <Reaction emoji="clap" count={3} onToggle={toggle} />
                <Reaction emoji="eyes" count={1} active onToggle={toggle} />
              </Row>
            </Col>
          </Col>
        );
      };
      return <ReactionDemo />;
    }},
    { id: "grid-picker", name: "Grid Picker", group: "Utilities", desc: "Searchable, categorizable grid of selectable items.", render: () => (
      <GridPicker search style={{ height: 340 }} searchPlaceholder="Search pictos…" recents={["arrow-up","play","file","house","star","search"].map((n) => ({ value: n, label: n, node: <Picto name={n} size={18} /> }))} favorites={["star","heart","bookmark","house"].map((n) => ({ value: n, label: n, node: <Picto name={n} size={18} /> }))} groups={[
        { id: "arrows", label: "Arrows", items: ["arrow-up","arrow-down","arrow-left","arrow-right","arrow-up-right","arrow-down-right","chevron-up","chevron-down","chevron-left","chevron-right","chevrons-up-down","refresh-cw","maximize","minimize","move","move"].map((n) => ({ value: n, label: n, node: <Picto name={n} size={18} /> })) },
        { id: "media", label: "Media", items: ["play","pause","square","skip-back","skip-forward","rewind","fast-forward","volume-2","volume-x","mic","mic-off","image","images","video","camera","music"].map((n) => ({ value: n, label: n, node: <Picto name={n} size={18} /> })) },
        { id: "files", label: "Files", items: ["file","file-text","file-plus","folder","folder-open","paperclip","save","clipboard","clipboard-check","archive","printer","download","upload","trash-2","copy","scissors"].map((n) => ({ value: n, label: n, node: <Picto name={n} size={18} /> })) },
        { id: "general", label: "General", items: ["house","settings","search","user","users","bell","heart","star","bookmark","mail","calendar","clock","lock","eye","filter","link"].map((n) => ({ value: n, label: n, node: <Picto name={n} size={18} /> })) },
      ]} />
    )},
    { id: "panel-picker", name: "Panel Picker", group: "Utilities", desc: "Master-header shell hosting several pickers.", render: () => {
      const Placeholder = window.PG_DEMO_UTILS.Placeholder;
      return (
        <PanelPicker defaultValue="p1" onClose={() => {}} style={{ height: 340 }} pickers={[
          { id: "p1", label: "Panel 1", icon: "square-dashed", node: <Placeholder label="Panel 1" style={{ margin: 16, flex: 1 }} /> },
          { id: "p2", label: "Panel 2", icon: "grid", node: <Placeholder label="Panel 2" style={{ margin: 16, flex: 1 }} /> },
        ]} />
      );
    }},
    { id: "media-picker", name: "Media Picker", group: "Utilities", desc: "Emoji · Pictos · Icons · Stickers · GIFs in one panel.", render: () => (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        <MediaPicker defaultValue="emoji" />
        <MediaPicker sources={["emoji", "picto"]} />
      </div>
    )},
    { id: "color-picker", name: "Color Picker", group: "Utilities", desc: "Pick one color from a swatch grid — built on GridPicker.", render: () => {
      const [c, setC] = React.useState("#8b93a6");
      return (
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, background: "var(--popover)", padding: 12, width: 260 }}>
          <ColorPicker value={c} onChange={setC} />
        </div>
      );
    }},
    { id: "window", name: "Window", group: "Utilities", desc: "Generalized window frame — topbar, toolbar, tabbar variants and a viewport.", render: () => {
      const Placeholder = window.PG_DEMO_UTILS.Placeholder;
      const noop = () => {};
      const tabs = [
        { id: "a", title: "Overview", active: true, onClose: noop },
        { id: "b", title: "Activity", onClose: noop },
        { id: "c", title: "Settings", onClose: noop },
      ];
      const barFill = { flex: 1, minWidth: 0, alignSelf: "stretch", display: "flex" };
      const block = { minHeight: "100%", margin: 8 };
      return (
        <div style={{ width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
          <Window size="md" style={{ height: 240 }}>
            <WindowTopbar onClose={noop} onMinimize={noop} onMaximize={noop}><div style={barFill}><Placeholder label="Topbar" icon={false} /></div></WindowTopbar>
            <WindowToolbar><div style={barFill}><Placeholder label="Toolbar" icon={false} /></div></WindowToolbar>
            <WindowContent><Placeholder label="Viewport" style={block} /></WindowContent>
          </Window>
          {["macos", "windows"].map((p) => (
            <Window key={p} platform={p} style={{ height: 120 }}>
              <WindowTopbar onClose={noop} onMinimize={noop} onMaximize={noop}><div style={barFill}><Placeholder label={p} icon={false} /></div></WindowTopbar>
              <WindowContent><Placeholder label="Viewport" icon={false} style={block} /></WindowContent>
            </Window>
          ))}
          <Window platform="macos" variant="muted">
            <WindowTopbar onClose={noop} onMinimize={noop} onMaximize={noop}><div style={barFill}><Placeholder label="macOS · muted" icon={false} /></div></WindowTopbar>
          </Window>
          {["sm", "md", "lg"].map((s) => (
            <Window key={s} size={s}>
              <WindowTopbar onClose={noop} onMinimize={noop} onMaximize={noop}><div style={barFill}><Placeholder label={"size " + s} icon={false} /></div></WindowTopbar>
            </Window>
          ))}
          {["pill", "tab", "block"].map((v) => (
            <Window key={v} size="md" style={{ height: 160 }}>
              <WindowTopbar onClose={noop} onMinimize={noop} onMaximize={noop}><div style={barFill}><Placeholder label={"tabbar — " + v} icon={false} /></div></WindowTopbar>
              <WindowTabbar variant={v} tabs={tabs} onNewTab={noop} />
              <WindowContent><Placeholder label="Viewport" icon={false} style={block} /></WindowContent>
            </Window>
          ))}
        </div>
      );
    }},
  ];

  window.PLAYGROUND = D;
  // Recency order (most-recently edited first) for the "Recently edited" sort
  // in the ungrouped list. Ids not listed fall back after these, alphabetically.
  window.PLAYGROUND_RECENT = [
    "multiswitch", "snippet", "project-banner", "error", "gauge", "description", "choicebox",
    "text", "phone", "spinner", "status-dot", "loading-dots", "theme-switcher", "switch",
    "tabs", "truncate", "tooltip", "icon-button", "floating-menu", "fab", "chip",
    "board", "aside", "draggable", "scroll-blur", "scroll-fade", "shimmer", "combobox", "slider",
  ];
})();
