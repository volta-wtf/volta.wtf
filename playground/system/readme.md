# shadcn/ui Design System

A faithful, layered implementation of **shadcn/ui** (the new-york style, Tailwind v4 default theme). The goal is fidelity to the official shadcn/ui documentation — same component APIs, anatomy, states, spacing, radii, and behavior — repackaged into a clean, layered, resource-centralized architecture that scales across products.

This is **not** a reinterpretation. Values (paddings, heights, radii, colors, easings) are copied from a fresh shadcn/ui + Tailwind v4 project. Where this system differs from shadcn, it is only in *internal organization* (centralized tokens, icon layers, one component per file), never in look or API.

## Sources & provenance
- **shadcn/ui** — https://ui.shadcn.com (component anatomy, variants, states, API). MIT licensed; shadcn is a copy-into-your-project library, which is exactly how it is used here.
- **Radix UI primitives** — https://www.radix-ui.com (accessibility patterns, `data-state`, roles, keyboard behavior that shadcn wraps).
- **Tailwind CSS v4** — the token values (spacing 4px scale, shadow scale, the oklch neutral color theme, `--radius: 0.625rem`).
- **Lucide** — https://lucide.dev (ISC) — the base icon library for all four icon layers.
- **Geist / Geist Mono** — https://vercel.com/font, loaded from Google Fonts.

No company codebase or Figma file was provided; the source of truth is the public shadcn/ui documentation.

---

## Architecture — layers (each depends only on layers below)

1. **Design Tokens** — `tokens/*.css` (colors, typography, spacing, radius, shadows, motion, misc: opacity/z-index/breakpoints)
2. **Typography & Fonts** — `tokens/typography.css`, `tokens/fonts.css`
3. **Base / reset** — `styles/base.css`
4. **Icon library (Lucide)** — `components/icons/iconData.js` (BASE)
5. **Pictos** — system icons (subset of iconData) used by components
6. **Icons** — product/domain icons
7. **Context Icons** — functional-context icons (audio, media, analytics, communication, location, security)
8. **Helpers / utilities** — `components/lib/cn.js`
9. **Component styles** — `styles/components-*.css`
10. **Base + complex components** — `components/<group>/*.jsx`
11. **Showcase** — `@dsCard`-tagged `.html` in every directory (Design System tab)

The root **`styles.css`** is an `@import`-only manifest that reaches every token, font, and component stylesheet — consumers link this one file.

---

## CONTENT FUNDAMENTALS (copy & tone)

shadcn's documentation voice, mirrored here:
- **Tone:** plain, technical, unhurried. No marketing adjectives, no exclamation except the canonical demo "Heads up!" alert.
- **Person:** second person ("You can add components…"), imperative for actions ("Deploy", "Save changes", "Add to library").
- **Casing:** Sentence case for descriptions and body; Title Case for component names and `CardTitle`s. Button labels are sentence-case verbs ("Save changes", not "SAVE CHANGES").
- **Canonical demo copy** (reuse verbatim in showcases): "Create project / Deploy your new project in one click.", "Edit profile / Make changes to your profile here. Click save when you're done.", "Are you absolutely sure?", "This action cannot be undone.", invoices `INV001…` with `Paid / Pending / Unpaid`, "you@example.com", "Pedro Duarte", "@peduarte".
- **Emoji:** none. Icons carry meaning, not emoji.
- **Microcopy:** short. Placeholders describe input ("Type a command or search…"). Destructive confirmations state consequence plainly.

## VISUAL FOUNDATIONS

- **Color:** oklch neutral base. Near-black `--primary` (oklch 0.205) on near-white surfaces; a single chromatic role, `--destructive` (red, oklch 0.577 0.245 27.3). Charts use a fixed 5-color palette. Dark theme via `.dark` scope. Color is used sparingly — the system reads as monochrome + one danger red.
- **Type:** Geist sans everywhere; Geist Mono for code/labels. Weights 400/500/600. Tight tracking on large headings (`-0.025em`). Body is 14px (`--text-sm`) — shadcn's default UI size.
- **Spacing:** Tailwind 4px scale. Controls are 36px tall by default (`h-9`), 32px `sm`, 40px `lg`. Card padding 24px; menu item padding 6px/8px.
- **Radius:** everything derives from `--radius: 0.625rem` (10px). Inputs/buttons/menus use `md` (8px); cards `xl` (14px); pills/avatars full.
- **Borders:** hairline 1px in `--border` (oklch 0.922, a light gray). Inputs use `--input`. Borders define structure far more than shadow does.
- **Shadows:** restrained. Controls carry `shadow-xs`; cards `shadow-sm`; popovers/menus `shadow-md`; dialogs `shadow-lg`. No colored or glow shadows.
- **Focus:** the signature shadcn focus ring — a 3px ring at 50% opacity of `--ring` plus a border-color shift, on `:focus-visible` only. `aria-invalid` swaps the ring to destructive.
- **Hover:** primary/secondary darken by mixing ~10–20% toward transparent (`bg-primary/90`); ghost/outline fill with `--accent`; links underline. **Press:** no shrink transform — shadcn relies on color, not scale.
- **Motion:** fast and subtle. 100–200ms, `ease-out` for overlays; accordion/popover use an emphasized cubic-bezier. Dialogs fade + scale from 0.95. No bounces, no infinite decorative loops.
- **Backgrounds:** flat surface tokens only. No gradients, no images, no textures, no blur (shadcn overlays use a solid 50%-black scrim, not backdrop blur).
- **Cards:** `--card` fill, 1px `--border`, 14px radius, `shadow-sm`, 24px internal padding, header/content/footer as a vertical gap-6 stack.
- **Disabled:** `opacity: 0.5` + `pointer-events: none`. Universal.

## ICONOGRAPHY

- **Base library: Lucide** (24px canvas, `fill:none`, `stroke:currentColor`, `stroke-width:2`, round caps/joins). This is shadcn's own icon set.
- Delivered through a single `Icon` component (`components/icons/Icon.jsx`) reading a registry (`iconData.js`), organized into four layers: **Pictos** (system UI — close/add/chevron/check/search/settings…), **Icons** (product/domain — customer/company/invoice/project/task…), **Context Icons** (functional — play/pause/mail/lock/chart-bar/trend-up…). All four draw from Lucide; the split is semantic, not stylistic.
- **No emoji.** No unicode-glyph icons. In production, swap the embedded registry for `lucide-react` and import by name — the names match.
- The embedded set is a curated subset. Icons are **copied path data from Lucide**, never hand-drawn approximations.
- **Icon-only controls must be labelled.** Any control that shows only an icon with no visible text label (IconButton, DismissButton, a Tabs/Toggle trigger reduced to a glyph, etc.) must expose an accessible name (`aria-label`/`title`) **and** surface that name in a `Tooltip`, positioned `side="top"` by default (fall back to another side only when the top edge is clipped).
- **Tooltips render in the global (top-layer) context.** Always portal tooltip content to the document root / a top-layer container, never inside the triggering control's subtree — so a tooltip is never clipped by an ancestor's hidden or scrolling overflow (`overflow: hidden/auto`, scroll areas, cards, toolbars).

---

## Components (index)

All are exported on the runtime namespace and shown in the Design System tab. Faithful to shadcn/ui APIs. Sub-components (compound parts) are exported alongside each family.

- **Forms** (`components/forms`): **Input**, **Textarea**, **Label**, **Checkbox**, **RadioGroup**, **Switch**, **Select**, **Combobox**, **Choicebox** (Geist selectable card), **Field**, **InputGroup**, **NativeSelect**, **InputOTP**, **SearchInput** (search field with clear button)
- **Actions** (`components/actions`): **Button**, **Badge**, **Chip**, **FloatingButton**, **FloatingMenu**, **IconButton**, **DismissButton**, **ThemeSwitcher**, **MultiSwitch** (Geist segmented), **Snippet** (Geist copyable command), **Toggle**, **ToggleGroup**, **ButtonGroup**
- **Layout** (`components/layout`): **Card**, **Separator**, **AspectRatio**, **ScrollArea**, **Resizable** (ResizablePanelGroup/Panel/Handle), **Browser** (window chrome frame), **Window** (generalized window frame — topbar/toolbar/tabbar/viewport, incl. WindowTopbar/Toolbar/Tabbar/Content), **Phone** (iPhone-style device frame), **Sidebar** (SidebarProvider/Content/Group/Menu/Inset/…), **Board** (variant-aware app layout shell), **Aside** (variant-aware app layout shell)
- **Display** (`components/display`): **Avatar**, **Skeleton**, **Progress**, **Slider** (single + two-thumb range), **Gauge** (Geist circular arc)
- **Disclosure** (`components/disclosure`): **Tabs**, **Accordion**, **Collapsible**
- **Feedback** (`components/feedback`): **Alert**, **Tooltip**, **Truncate**, **Error** (Geist inline error), **ProjectBanner** (Geist announcement bar), **Toaster** + `toast()`
- **Overlay** (`components/overlay`): **Dialog**, **Popover**, **DropdownMenu**, **AlertDialog**, **Sheet**, **Drawer**, **HoverCard**, **ContextMenu**, **Overlay**
- **Data** (`components/data`): **Table**, **Calendar**, **DatePicker**, **Carousel**, **Chart** (ChartContainer/Chart/ChartLegend), **DataTable**, **Entity** (data-model row — base for Contact / User / Account; manage + data variants, 3 densities)
- **Navigation** (`components/navigation`): **Breadcrumb**, **Pagination**, **Menubar**, **NavigationMenu**
- **Command** (`components/command`): **Command**
- **Primitives** (`components/primitives`): **Spinner**, **LoadingDots**, **StatusDot**, **Kbd**, **Empty**, **Item**, **Marker**, **Description** (Geist label/value)
- **Chat / AI elements** (`components/chat`): **Attachment**, **Bubble**, **Message**, **MessageScroller**, **Reaction** (reaction chips, add-reaction addon, floating quick-react toolbar)
- **Icons** (`components/icons`): **Icon**, **Picto** (Lucide base library), **Emoji**
- **Pickers** (`components/pickers`): **GridPicker** (searchable/categorized grid primitive), **PanelPicker** (master-header shell hosting several pickers), **MediaPicker** (Emoji · Pictos · Icons · Stickers · GIFs) with **EmojiPicker**, **PictoPicker**, **IconPicker**, **StickerPicker**, **GifPicker**, **ColorPicker** (swatch grid)

### Intentional additions / interpretations
- **Icon** — a wrapper over the Lucide registry; not a shadcn component but needed to deliver the glyph set.
- **Attachment, Bubble, Message, MessageScroller, Marker** — these appear in shadcn-adjacent registries (AI Elements and community sets) rather than the canonical shadcn/ui core. They are implemented here as faithful, brand-consistent interpretations so the full requested inventory is present.
- **Toast** — shadcn deprecated its `Toast` in favor of **Sonner**; the `Toaster` + `toast()` API here is the Sonner replacement.
- **Direction** and **Typography** from the full shadcn list are a RTL utility and a foundation (see "1.2 · Typography"), respectively — not standalone components.

### Full shadcn/ui parity
Every component in the shadcn/ui component list is now implemented.

---

## Root manifest

- `styles.css` — the single entry point (import-only).
- `tokens/` — colors, typography, spacing, radius, shadows, motion, misc, fonts.
- `styles/` — base reset + `components-forms.css`, `components-layout.css`, `components-overlay.css`.
- `components/<group>/` — `<Name>.jsx` + `<Name>.d.ts` + `<Name>.prompt.md`, one `*.card.html` per directory.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Radius, Shadows, Iconography).
- `SKILL.md` — Agent-Skill entry point.
