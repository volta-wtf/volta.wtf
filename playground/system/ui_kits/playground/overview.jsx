/* Overview page — every block is a Demo* component composed only from
   design-system components. Exposes window.PG_OVERVIEW = { Overview, ...demos }. */
(function () {
  const S = window.TestDesignSystem_be7089;
  const {
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
    Button, Badge, Icon, Input, Textarea, Label, Switch, Slider, Checkbox,
    RadioGroup, RadioGroupItem, ToggleGroup, ToggleGroupItem, Separator, Progress,
    Avatar, AvatarFallback, ChartContainer, Chart, Calendar,
    InputGroup, InputGroupInput, InputGroupTextarea, InputGroupAddon, InputGroupButton,
    Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup, ItemSeparator,
    Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription,
    ButtonGroup, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    HoverCard, HoverCardTrigger, HoverCardContent,
    Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
    Popover, PopoverTrigger, PopoverContent,
    Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose,
    Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
  } = S;

  // Icon button that lives in a card's top-right corner (as an overlay trigger).
  const CornerBtn = React.forwardRef((props, ref) => (
    <Button ref={ref} variant="ghost" size="icon-sm" {...props} />
  ));

  const money = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ============================= EXISTING BLOCKS ============================= */

  const METRICS = [
    { label: "Total Revenue", value: "$45,231.89", delta: "+20.1%", up: true, icon: "invoice" },
    { label: "Subscriptions", value: "+2,350", delta: "+180.1%", up: true, icon: "customer" },
    { label: "Sales", value: "+12,234", delta: "+19%", up: true, icon: "chart-bar" },
    { label: "Active Now", value: "573", delta: "-4.3%", up: false, icon: "chart-line" },
  ];
  function DemoMetrics() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
        {METRICS.map((m) => (
          <Card key={m.label}>
            <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <CardDescription>{m.label}</CardDescription>
              <Icon name={m.icon} size={16} style={{ color: "var(--muted-foreground)" }} />
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>{m.value}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <Badge variant={m.up ? "default" : "destructive"} style={{ gap: 3 }}>
                  <Icon name={m.up ? "trend-up" : "trend-down"} size={12} /> {m.delta}
                </Badge>
                <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const REV_DATA = [
    { label: "Jan", desktop: 186, mobile: 80 }, { label: "Feb", desktop: 305, mobile: 200 },
    { label: "Mar", desktop: 237, mobile: 120 }, { label: "Apr", desktop: 173, mobile: 190 },
    { label: "May", desktop: 209, mobile: 130 }, { label: "Jun", desktop: 264, mobile: 140 },
  ];
  const REV_CFG = { desktop: { label: "Desktop", color: "var(--chart-1)" }, mobile: { label: "Mobile", color: "var(--chart-2)" } };
  function DemoRevenueChart() {
    return (
      <Card>
        <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div><CardTitle>Revenue</CardTitle><CardDescription>Desktop vs. mobile · last 6 months</CardDescription></div>
          <div style={{ position: "relative", flexShrink: 0 }}><Dialog>
            <DialogTrigger asChild><CornerBtn aria-label="Expand"><Icon name="expand" /></CornerBtn></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Revenue breakdown</DialogTitle><DialogDescription>Detailed desktop vs. mobile revenue for the last 6 months.</DialogDescription></DialogHeader>
              <ChartContainer config={REV_CFG}><Chart type="bar" data={REV_DATA} height={280} /></ChartContainer>
              <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose><Button>Download report</Button></DialogFooter>
            </DialogContent>
          </Dialog></div>
        </CardHeader>
        <CardContent><ChartContainer config={REV_CFG}><Chart type="bar" data={REV_DATA} height={240} /></ChartContainer></CardContent>
      </Card>
    );
  }

  const SALES = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amt: "+$1,999.00", fb: "OM" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amt: "+$39.00", fb: "JL" },
    { name: "Isabella Nguyen", email: "isabella@email.com", amt: "+$299.00", fb: "IN" },
    { name: "William Kim", email: "will@email.com", amt: "+$99.00", fb: "WK" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amt: "+$39.00", fb: "SD" },
  ];
  function DemoRecentSales() {
    return (
      <Card>
        <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div><CardTitle>Recent sales</CardTitle><CardDescription>You made 265 sales this month.</CardDescription></div>
          <div style={{ position: "relative", flexShrink: 0 }}><Popover>
            <PopoverTrigger asChild><CornerBtn aria-label="Filter"><Icon name="more-horizontal" /></CornerBtn></PopoverTrigger>
            <PopoverContent align="end" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Filter sales</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}><Checkbox defaultChecked /> Completed</label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}><Checkbox defaultChecked /> Refunded</label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}><Checkbox /> Pending</label>
              </div>
              <Button size="sm" style={{ width: "100%" }}>Apply</Button>
            </PopoverContent>
          </Popover></div>
        </CardHeader>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {SALES.map((s) => (
            <div key={s.email} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button type="button" style={{ all: "unset", cursor: "pointer", borderRadius: 999 }}><Avatar><AvatarFallback>{s.fb}</AvatarFallback></Avatar></button>
                </HoverCardTrigger>
                <HoverCardContent style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Avatar><AvatarFallback>{s.fb}</AvatarFallback></Avatar>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{s.email}</div>
                    <div style={{ fontSize: 13, marginTop: 6 }}>Lifetime value <strong>{s.amt.replace("+", "")}</strong></div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted-foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.email}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s.amt}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  function DemoTeamMembers() {
    const rows = [["Sofia Davis", "m@example.com", "Owner", "SD"], ["Jackson Lee", "p@example.com", "Member", "JL"], ["Isabella Nguyen", "i@example.com", "Member", "IN"]];
    return (
      <Card>
        <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div><CardTitle>Team members</CardTitle><CardDescription>Invite your team to collaborate.</CardDescription></div>
          <div style={{ position: "relative", flexShrink: 0 }}><Drawer>
            <DrawerTrigger asChild><CornerBtn aria-label="Invite member"><Icon name="add" /></CornerBtn></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader><DrawerTitle>Invite a team member</DrawerTitle><DrawerDescription>They'll get an email invitation to join this workspace.</DrawerDescription></DrawerHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
                <Label>Email address</Label>
                <Input placeholder="teammate@example.com" />
              </div>
              <DrawerFooter><Button>Send invite</Button><DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose></DrawerFooter>
            </DrawerContent>
          </Drawer></div>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <ItemGroup>
            {rows.map((r, i) => (
              <React.Fragment key={r[1]}>
                {i > 0 && <ItemSeparator />}
                <Item>
                  <ItemMedia><Avatar><AvatarFallback>{r[3]}</AvatarFallback></Avatar></ItemMedia>
                  <ItemContent><ItemTitle>{r[0]}</ItemTitle><ItemDescription>{r[1]}</ItemDescription></ItemContent>
                  <ItemActions><Badge variant="secondary">{r[2]}</Badge></ItemActions>
                </Item>
              </React.Fragment>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>
    );
  }

  function DemoNotifications() {
    const rows = [["Marketing emails", "Product news and offers.", false], ["Security alerts", "Access from a new device.", true], ["Weekly digest", "A summary every Monday.", true]];
    return (
      <Card>
        <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div><CardTitle>Notifications</CardTitle><CardDescription>Choose what you want to hear about.</CardDescription></div>
          <div style={{ position: "relative", flexShrink: 0 }}><Sheet>
            <SheetTrigger asChild><CornerBtn aria-label="Notification settings"><Icon name="settings" /></CornerBtn></SheetTrigger>
            <SheetContent side="right">
              <SheetHeader><SheetTitle>Notification settings</SheetTitle><SheetDescription>Fine-tune how and when we reach you.</SheetDescription></SheetHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
                {["Push notifications", "Email summaries", "SMS alerts", "Sound"].map((l, i) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ fontSize: 14 }}>{l}</span><Switch defaultChecked={i < 2} />
                  </div>
                ))}
              </div>
              <SheetFooter><SheetClose asChild><Button>Save preferences</Button></SheetClose></SheetFooter>
            </SheetContent>
          </Sheet></div>
        </CardHeader>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {rows.map((n) => (
            <div key={n[0]} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div><div style={{ fontSize: 14, fontWeight: 500 }}>{n[0]}</div><div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{n[1]}</div></div>
              <Switch defaultChecked={n[2]} />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  function DemoStorage() {
    const rows = [["Documents", 72], ["Media", 45], ["Backups", 88]];
    return (
      <Card>
        <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div><CardTitle>Storage</CardTitle><CardDescription>2 of 3 workspaces used.</CardDescription></div>
          <div style={{ position: "relative", flexShrink: 0 }}><AlertDialog>
            <AlertDialogTrigger asChild><CornerBtn aria-label="Clear storage"><Icon name="delete" /></CornerBtn></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>Clear all storage?</AlertDialogTitle><AlertDialogDescription>This permanently removes cached documents, media and backups. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
              <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Clear storage</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog></div>
        </CardHeader>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {rows.map((u) => (
            <div key={u[0]}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span>{u[0]}</span><span style={{ color: "var(--muted-foreground)" }}>{u[1]}%</span></div>
              <Progress value={u[1]} />
            </div>
          ))}
        </CardContent>
        <CardFooter><Button variant="outline" style={{ width: "100%" }}>Upgrade plan</Button></CardFooter>
      </Card>
    );
  }

  /* ============================= NEW BLOCKS ============================= */

  // 1 — Theme / palette preview
  const SWATCHES = [
    ["--background", "var(--background)"], ["--foreground", "var(--foreground)"], ["--primary", "var(--primary)"],
    ["--secondary", "var(--secondary)"], ["--muted", "var(--muted)"], ["--accent", "var(--accent)"],
    ["--border", "var(--border)"], ["--chart-1", "var(--chart-1)"], ["--chart-2", "var(--chart-2)"],
    ["--chart-3", "var(--chart-3)"], ["--chart-4", "var(--chart-4)"], ["--chart-5", "var(--chart-5)"],
  ];
  function DemoThemePreview() {
    const [font, setFont] = React.useState(() => document.documentElement.getAttribute("data-font") || "geist");
    React.useEffect(() => {
      const on = (e) => setFont((e.detail && e.detail.font) || document.documentElement.getAttribute("data-font") || "geist");
      window.addEventListener("theme:change", on);
      return () => window.removeEventListener("theme:change", on);
    }, []);
    const LABELS = { geist: "Geist", inter: "Inter", plex: "IBM Plex Sans", system: "System UI" };
    return (
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: 22 }}>{LABELS[font] || "Geist"}</CardTitle>
          <CardDescription>Designers love packing quirky glyphs into test phrases. This is a preview of the palette.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
            {SWATCHES.map(([label, bg]) => (
              <div key={label} style={{ minWidth: 0 }}>
                <div style={{ height: 44, borderRadius: "var(--radius-md)", background: bg, border: "1px solid var(--border)" }} />
                <div style={{ marginTop: 6, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted-foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // 2 — Icon button grid (28 total)
  const ICONS = [
    "copy", "alert-circle", "delete", "upload", "inbox", "more-horizontal", "loader", "add",
    "minus", "back", "forward", "check", "chevron-down", "chevron-right", "search", "settings",
    "edit", "download", "star", "send", "paperclip", "folder", "file", "calendar",
    "message", "info", "check-circle", "x",
  ];
  function DemoIconButtons() {
    return (
      <Card>
        <CardHeader><CardTitle>Icon buttons</CardTitle><CardDescription>Outline icon buttons at every action.</CardDescription></CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {ICONS.map((n, i) => <Button key={n + i} variant="outline" size="icon" aria-label={n}><Icon name={n} /></Button>)}
          </div>
        </CardContent>
      </Card>
    );
  }

  // 3 — Weekly fitness summary
  const FIT_DATA = [
    { label: "Mon", load: 92 }, { label: "Tue", load: 48 }, { label: "Wed", load: 74 }, { label: "Thu", load: 66 },
    { label: "Fri", load: 100 }, { label: "Sat", load: 40 }, { label: "Sun", load: 54 },
  ];
  const FIT_CFG = { load: { label: "Workout load", color: "var(--chart-1)" } };
  function DemoFitnessSummary() {
    return (
      <Card>
        <CardHeader><CardTitle>Weekly Fitness Summary</CardTitle><CardDescription>Calories and workout load by day</CardDescription></CardHeader>
        <CardContent><ChartContainer config={FIT_CFG}><Chart type="bar" data={FIT_DATA} height={150} /></ChartContainer></CardContent>
        <CardFooter><Button style={{ width: "100%" }}>View details</Button></CardFooter>
      </Card>
    );
  }

  // 4 — Controls kitchen sink
  function DemoControls() {
    return (
      <Card>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Button size="sm">Button</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
            <Button size="sm" variant="outline">Outline</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
          </div>
          <Item variant="outline">
            <ItemContent><ItemTitle>Two-factor authentication</ItemTitle><ItemDescription>Verify via email or phone number.</ItemDescription></ItemContent>
            <ItemActions><Button variant="secondary" size="sm">Enable</Button></ItemActions>
          </Item>
          <Slider defaultValue={60} />
          <InputGroup><InputGroupInput placeholder="Name" /><InputGroupAddon align="end"><Icon name="search" /></InputGroupAddon></InputGroup>
          <Textarea placeholder="Message" rows={3} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6 }}>
              <Badge>Badge</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <RadioGroup defaultValue="a" style={{ display: "flex", gap: 8 }}>
                <RadioGroupItem value="a" aria-label="Option A" />
                <RadioGroupItem value="b" aria-label="Option B" />
              </RadioGroup>
              <Checkbox defaultChecked aria-label="Checked" />
              <Switch defaultChecked aria-label="Toggle" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Button variant="outline" size="sm">Alert Dialog</Button>
            <div style={{ display: "flex" }}>
              <Button variant="outline" size="sm" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>Button Group</Button>
              <Button variant="outline" size="icon-sm" aria-label="More" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: -1 }}><Icon name="chevron-up" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 5 — Payout preferences form
  function DemoPayoutForm() {
    const [method, setMethod] = React.useState("bank");
    const opt = (val, title, sub) => {
      const on = method === val;
      return (
        <label htmlFor={"pm-" + val} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", border: "1px solid " + (on ? "var(--foreground)" : "var(--border)"), borderRadius: "var(--radius-md)", background: on ? "var(--accent)" : "transparent", cursor: "pointer" }}>
          <RadioGroupItem value={val} id={"pm-" + val} />
          <span><span style={{ fontSize: 14, fontWeight: 500, display: "block" }}>{title}</span><span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{sub}</span></span>
        </label>
      );
    };
    return (
      <Card>
        <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Payout Preferences</div>
            <CardTitle>Receiving Method</CardTitle>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Close"><Icon name="x" /></Button>
        </CardHeader>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Label>Account Holder Name</Label>
            <Input defaultValue="Synthetic Horizons Music LLC" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Label>Receiving Method</Label>
            <RadioGroup value={method} onValueChange={setMethod} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {opt("bank", "Bank Transfer", "SWIFT / IBAN")}
              {opt("paypal", "PayPal", "Instant Payout")}
            </RadioGroup>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Label>IBAN / Account Number</Label>
            <Input placeholder="DE89 3704 0044 ...." />
          </div>
        </CardContent>
        <CardFooter><Button disabled style={{ width: "100%" }}>Save Payout Settings</Button></CardFooter>
      </Card>
    );
  }

  // 6 — Upcoming payments (calendar + list)
  const PAYMENTS = [
    { name: "Netflix Subscription", date: "Apr 15, 2024", amt: "$19.99" },
    { name: "Rent Payment", date: "Apr 1, 2024", amt: "$2,400.00" },
    { name: "Auto Insurance", date: "Apr 22, 2024", amt: "$186.00" },
  ];
  function DemoUpcomingPayments() {
    return (
      <Card>
        <CardHeader><CardTitle>Upcoming Payments</CardTitle><CardDescription>Select a date to view scheduled payments.</CardDescription></CardHeader>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: 8 }}>
            <Calendar defaultSelected={new Date(2026, 6, 3)} defaultMonth={new Date(2026, 6, 1)} />
          </div>
          <ItemGroup style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PAYMENTS.map((p) => (
              <Item key={p.name} variant="muted">
                <ItemContent><ItemTitle>{p.name}</ItemTitle><ItemDescription>{p.date}</ItemDescription></ItemContent>
                <ItemActions><Badge variant="secondary">{p.amt}</Badge></ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>
    );
  }

  // 7 — Smart light control
  const SCENES = ["Cooking", "Dining", "Nightlight", "Focus"];
  const LIGHT_SLIDERS = [["sun", "Brightness", 84], ["star", "Color Temp", 72], ["volume", "Volume", 40], ["loader", "Fade", 8]];
  function DemoLightControl() {
    const [scene, setScene] = React.useState("Cooking");
    return (
      <Card>
        <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div><CardTitle>Kitchen Island</CardTitle><CardDescription>Hue Color Ambient</CardDescription></div>
          <Switch defaultChecked />
        </CardHeader>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <ToggleGroup type="single" variant="outline" value={scene} onValueChange={(v) => v && setScene(v)} style={{ flexWrap: "wrap" }}>
            {SCENES.map((s) => <ToggleGroupItem key={s} value={s}>{s}</ToggleGroupItem>)}
          </ToggleGroup>
          {LIGHT_SLIDERS.map(([icon, label, val]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "12px 14px" }}>
              <Icon name={icon} size={16} style={{ color: "var(--muted-foreground)" }} />
              <span style={{ fontSize: 14, fontWeight: 500, width: 90 }}>{label}</span>
              <div style={{ flex: 1 }}><Slider defaultValue={val} /></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // 8 — Claimable balance
  function DemoClaimableBalance() {
    return (
      <Card>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ fontSize: 14, color: "var(--muted-foreground)" }}>Claimable Balance</div>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>$1,211.29</div>
            <Badge variant="outline" style={{ gap: 6, marginTop: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--chart-4)" }} /> Pending Setup
            </Badge>
          </div>
          <div style={{ background: "var(--muted)", borderRadius: "var(--radius-md)", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "var(--muted-foreground)" }}>Net Royalties</span><span style={{ fontWeight: 600 }}>$1,248.75</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "var(--muted-foreground)" }}>Processing Fee</span><span style={{ fontWeight: 600 }}>-$37.46</span></div>
            <Separator />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "var(--muted-foreground)" }}>Total Ready to Claim</span><span style={{ fontWeight: 700 }}>$1,211.29 USD</span></div>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--muted-foreground)" }}>Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution on the 15th of each month.</p>
        </CardContent>
      </Card>
    );
  }

  // 9 — New chat empty state
  function DemoNewChat() {
    return (
      <Card style={{ display: "flex", flexDirection: "column", minHeight: 420 }}>
        <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div><CardTitle>New Chat</CardTitle><CardDescription>How can I help you today?</CardDescription></div>
          <Button variant="outline" size="icon-sm" aria-label="Reset"><Icon name="loader" /></Button>
        </CardHeader>
        <Separator />
        <CardContent style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 24, paddingBottom: 24 }}>
          <Empty>
            <EmptyHeader>
              <EmptyMedia><Icon name="message" /></EmptyMedia>
              <EmptyTitle>Morning, shadcn!</EmptyTitle>
              <EmptyDescription>What are we working on today? Press send to start a new conversation.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
        <CardFooter>
          <InputGroup style={{ width: "100%" }}>
            <InputGroupTextarea placeholder="Ask anything…" rows={2} />
            <InputGroupAddon align="block-end">
              <InputGroupButton size="icon-sm" aria-label="Add"><Icon name="plus" /></InputGroupButton>
              <InputGroupButton size="icon-sm" aria-label="Send" variant="default" style={{ marginLeft: "auto" }}><Icon name="arrow-up" /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </CardFooter>
      </Card>
    );
  }

  /* ============================= COMPOSITION ============================= */

  // Masonry: tall/short cards flow into balanced columns.
  // (DemoRevenueChart + DemoRecentSales stay in a prominent top row, not the masonry.)
  const CARDS = [
    DemoClaimableBalance, DemoThemePreview, DemoFitnessSummary,
    DemoNewChat, DemoControls, DemoNotifications, DemoIconButtons,
    DemoUpcomingPayments, DemoLightControl, DemoTeamMembers, DemoPayoutForm,
    DemoStorage,
  ];

  function Overview({ fluid }) {
    const maxWidth = fluid ? "100%" : 1180;
    return (
      <div style={{ maxWidth, margin: "0 auto", padding: "36px 32px 96px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>Dashboard</h1>
            <p style={{ margin: "6px 0 0", fontSize: 15, color: "var(--muted-foreground)" }}>An overview built by composing design-system components.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="outline"><Icon name="calendar" /> Jan 20 – Feb 09</Button>
            <ButtonGroup>
              <Button><Icon name="download" /> Download</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button size="icon" aria-label="Download options"><Icon name="chevron-down" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Export as</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Icon name="file" /> CSV <DropdownMenuShortcut>⌘C</DropdownMenuShortcut></DropdownMenuItem>
                  <DropdownMenuItem><Icon name="file" /> PDF report</DropdownMenuItem>
                  <DropdownMenuItem><Icon name="invoice" /> Excel workbook</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Icon name="send" /> Email to team</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
        </div>

        <DemoMetrics />

        {/* prominent row: big revenue chart + Recent sales */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, alignItems: "stretch" }}>
          <DemoRevenueChart />
          <DemoRecentSales />
        </div>

        <div style={{ columnWidth: 340, columnGap: 16 }}>
          {CARDS.map((C, i) => (
            <div key={i} style={{ breakInside: "avoid", marginBottom: 16 }}><C /></div>
          ))}
        </div>
      </div>
    );
  }

  window.PG_OVERVIEW = {
    Overview, DemoMetrics, DemoRevenueChart, DemoRecentSales, DemoTeamMembers,
    DemoNotifications, DemoStorage, DemoThemePreview, DemoIconButtons, DemoFitnessSummary,
    DemoControls, DemoPayoutForm, DemoUpcomingPayments, DemoLightControl, DemoClaimableBalance, DemoNewChat,
  };
})();
