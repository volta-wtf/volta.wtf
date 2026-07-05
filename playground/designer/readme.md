# Designer Design System

Components for building **design tools** — like Framer, Canva, Figma-class editors.
Infinite canvas. Layers. Drag and drop. Resize. Style. Data collections. Composable. Performant. Developer-friendly.

This design system is the complete working environment for building such a tool: typed design tokens, a role-based icon library, UI primitives, typed property fields, editor chrome (toolbars, panels, panes, canvas), a token manager, data collections bound to the canvas, a component/asset library, and design micro-tools (gradients, shapes, SVG filters).

## Sources & influences

- **Structure reference:** https://ds.shadcn.com/ (shadcn/designer docs — concepts: Designer, Layers, Theming, Unit System, Keybindings; reference: Designer, Actions, Toolbar, UI, Hooks, Types). No source code was available; everything here is an original implementation following that documentation's *structure*, not its code.
- **Visual influences (per the brief):** shadcn (neutral oklch tokens, Geist, border-first chrome) · Linear (density, restraint, keyboard-first, fast micro-interactions) · Figma (editor anatomy: toolbar / layers panel / inspector / canvas, blue selection; layout archetypes across Design/FigJam/Slides/Sites/Buzz/Make) · Framer (infinite canvas, CMS-style Collections bound to layers) · Claude/Anthropic (warm paper neutrals, serif editorial voice, terracotta accent) · early OpenAI (stark B&W editorial minimalism).
- No logo or brand mark was provided. **Do not invent one** — render the wordmark as plain type: `Designer` in Geist Medium, or the abbreviation `dsr.` in Geist Mono. Flagged: if you have a real mark, drop it into `assets/` and update this note.
- Fonts: **Geist + Geist Mono + Source Serif 4 via Google Fonts** (`tokens/fonts.css`). Source Serif 4 substitutes a Tiempos-class editorial serif — flagged; if you own licensed binaries (Geist, Tiempos), replace the import with local `@font-face` rules.

## Architecture — modular by rule

Every concern is its own file; every part is replaceable without touching the rest.

```
styles.css                  ← entry point: @import lines only
tokens/                     ← one CSS file per concern (colors, typography, spacing,
                              radius, shadows, motion, fonts, base)
data/                       ← ALL content & config as JSON
  tokens.json               ← the same tokens, typed (W3C Design Tokens format)
  collections.json          ← registry of data collections
  collections/*.json        ← one collection per file (fields + records)
  gradients.json            ← gradient presets
  shapes.json               ← generic shape geometry
  filters.json              ← SVG filter presets (plugin primitives as data)
components/
  icons/                    ← Icon + role registry (semantic names, not raw glyphs)
  ui/                       ← primitives: Button, Input, Select, Switch, …
  fields/                   ← typed value controls: Number(unit), Color, Select, XY…
  designer/                 ← editor chrome: Toolbar, Panel, Pane, Canvas, LayerTree…
  tokens/                   ← token-management UI (typed rows, swatches, editor panel)
  data/                     ← collections UI: panel, table, field binding
  library/                  ← component/asset library (insert panel, grid)
  utilities/                ← micro-tools: GradientEditor, ShapeLibrary, FilterStack
  actions/                  ← property actions: Fill, Rotate, Opacity
guidelines/                 ← foundation specimen cards (Design System tab)
ui_kits/editor/             ← the full editor, assembled from the above
```

**Modularity rules**

1. One component = one `.jsx` + one `.d.ts` (props contract) + one `.prompt.md` (usage). No grab-bag files.
2. Components style themselves **only** through CSS custom properties from `tokens/`. No hard-coded values, no CSS-in-JS.
3. Data never lives in components. Content, presets, and token definitions are JSON under `data/`; components receive them as props.
4. Icons are never inlined. Every glyph goes through `icons/Icon` with a **semantic role** (`name="visible"`, not a pasted SVG).
5. Composition over configuration: `Panel` doesn't know about layers; `LayerTree` doesn't know about panels. Screens compose them.
6. Groups may depend downward only: `ui → icons`, `fields → ui`, `designer → fields/ui/icons`. Never sideways or upward.

## Token layers

1. **Primitives — Open Props** (`tokens/openprops.css`, pinned `open-props@1.7.16` via CDN): the full primitive vocabulary (`--gray-6`, `--size-3`, `--ease-3`, `--shadow-2`, `--gradient-7`…) preloaded and free to use for ad-hoc values.
2. **Semantic — ours** (`tokens/*.css`): the branded layer (`--background`, `--selection`, `--control-height`…). Imported after Open Props; wins on collision. Components reference THIS layer; reach for Open Props only when no semantic token fits.
3. **Typed mirror** (`data/tokens.json`): the semantic layer in W3C Design Tokens format for the token-manager UI.
4. **Tier demo — optional** (`tokens/tiers.css`): a switchable 4-layer resolution demo (primitives `--t-*` → brand alias `--brand-*` → theme slots → component vars `--btn-*`). Inert by default; add `data-tiers` to any scope to activate (real components re-theme through the chain), remove it to deactivate.

## Core concepts

- **Canvas** — an infinite, pannable, zoomable surface with a dot grid. Frames (artboards) live on it.
- **Layers** — everything on the canvas is a layer in a tree. Rows are 32px, virtualized-friendly, keyboard navigable.
- **Selection** — the one saturated color in the whole UI (`--selection`, ultramarine). Handles, marquee, bound-field ties.
- **Unit system** — every dimension field is a number + unit (`px`, `%`, `fr`, `deg`, `ms`). `fields/NumberField` owns parsing, stepping (↑/↓, ⇧ = ×10), and scrubbing.
- **Tokens** — typed, managed entities (`data/tokens.json`, W3C format: color, dimension, fontFamily, fontWeight, duration, cubicBezier, shadow, number). The `components/tokens/` UI reads/edits them; `cssVar` binds each to its runtime custom property.
- **Collections** — structured datasets (`data/collections/*.json`) with typed fields (text, richtext, number, boolean, image, select, date, color, url). Layers *bind* to fields; a bound frame repeats over records. Purple-free: bindings show in selection blue.
- **Library** — reusable components & assets, insertable by drag.
- **Utilities / plugins** — micro-tools defined as data + a small panel component: gradient presets, shape geometry, SVG filter stacks (`data/filters.json` primitives are rendered into real `<filter>` nodes).

## CONTENT FUNDAMENTALS

The voice is a **developer-tool voice**: terse, factual, lowercase-calm. Linear's restraint, shadcn's plainness.

- **Sentence case everywhere** — titles, buttons, labels, menus. Never Title Case, never ALL CAPS in copy (uppercase is reserved for 11px section eyebrows like `LAYERS`, `FILL`, tracked at +0.08em).
- **Short imperatives** for actions: "Add layer", "Duplicate", "Export as PNG", "Bind to field". No "please", no exclamation marks.
- **Terse noun labels** for properties: "Fill", "Stroke", "Radius", "Opacity", "X", "Y", "W", "H".
- **Numbers are content**: always tabular, always mono in fields (`13px Geist Mono`), units shown small and muted.
- **You/we**: address the user as "you"; the product speaks as "we" only in docs/marketing, never in the UI.
- **No emoji.** Anywhere. Keyboard shortcuts are shown as `<Kbd>` glyphs (`⌘`, `⇧`, `V`, `F`).
- **Empty states teach**: one line of what this is + one action. "No collections yet. Create one to bind data to the canvas."
- **Errors are diagnoses, not apologies**: "Font missing — Inter was replaced with Geist." not "Oops! Something went wrong".
- Examples of the register: "Drag to reorder. Hold ⌥ to duplicate." · "Zoom to fit ⇧1" · "Published · 2m ago" · "4 layers selected".

## VISUAL FOUNDATIONS

**The rule of the whole system: the user's artwork is the only color on screen.** Chrome is achromatic gray; the single saturated hue is the selection blue.

- **Color**: warm-neutral oklch ramp (barely-there warm cast, hue ~80, chroma ≤ 0.005 — Claude-like paper warmth; never bluish). Light theme default, `.dark` scope flips it. Semantic aliases (`--background`, `--muted`, `--border`…) over raw ramp values. Chromatic accents, each with ONE job: `--selection` (ultramarine, canvas-selection UI ONLY), `--brand` (terracotta, editorial/marketing accents ONLY), `--destructive` (danger ONLY). No purple-blue gradients, no decorative color in chrome.
- **Type**: Geist for UI at 13px default (12px labels, 11px eyebrows); Geist Mono for every numeric value, coordinate, token value, and code; `--font-serif` (Source Serif 4, a Tiempos-class substitute) for docs/marketing display + pull quotes ONLY — never in editor chrome. Content scale up to 48px. Tight tracking on display sizes (−0.015 to −0.03em), wide (+0.08em) on uppercase micro-labels. Weights: 400/500/600 — bold (700) is rare. Editorial pages (early-OpenAI register): stark near-B&W, generous whitespace, serif display over grotesque body.
- **Spacing**: 4px base grid. Chrome is dense — 2/4/6/8/12 do most of the work. Fixed chrome dimensions are tokens: toolbar 48px, panels 264px, control rows 28px, tree rows 32px, pane headers 36px.
- **Backgrounds**: flat solids only. The canvas is `--canvas` (0.97 gray) with a 1px dot grid (`--canvas-dots`, 16px pitch at 100% zoom). No textures, no photos, no gradients in chrome — gradients exist only as *content presets* (`data/gradients.json`).
- **Borders**: 1px hairlines in `--border` are the primary separator. Chrome is **border-first, shadow-second**: panels separate from canvas by border, not elevation.
- **Shadows**: none on flat chrome; `--shadow-popover` for menus/popovers; `--shadow-lg/xl` for dialogs; `--shadow-drag` under a layer being dragged. Dark theme uses stronger alphas, never glows.
- **Radii**: seed `--radius: 10px`. Inputs/rows 4px, buttons/controls 6px, cards/panes 8px, panels/popovers 10px, dialogs 14px, pills/handles full. Nothing sharp, nothing bubbly.
- **Cards**: `--card` surface + 1px `--border` + `--radius-md`; shadow only when floating (popover/drag). No colored left-border accents.
- **Hover states**: background shifts to `--muted` (light) / `--secondary` (dark) in 120ms; icons go `--muted-foreground → --foreground`. No underlines, no scale-ups on chrome.
- **Press states**: one shade deeper than hover; toolbar tools also fill `--selection-muted` when *active*. No shrink transforms on chrome (buttons in marketing may scale 0.98).
- **Focus**: 3px translucent ring (`--ring-color`) outside a 1px `--ring` border; visible only on `:focus-visible`.
- **Motion**: 80–240ms, `--ease-standard` for state, `--ease-out` for entering popovers (fade + 4px slide). No bounces, no springs on chrome; reduced-motion collapses everything.
- **Transparency & blur**: reserved for floating layers over the canvas (toolbar HUD, context menus): `background: color-mix(...92% surface)` + `backdrop-filter: blur(8px)`. Never on docked panels.
- **Imagery**: neutral, cool, well-lit product/interface shots; grayscale-friendly. No stocky people photos; testimonial avatars are small circles.
- **Layout**: editor = fixed chrome (top toolbar, left layers panel, right inspector) with the canvas filling the rest; docs/marketing = centered 720px prose column / 1200px max shell.
- **Density**: Linear-grade. If a control can be 28px tall, it is not 36px.

## ICONOGRAPHY

- **System: [Lucide](https://lucide.dev)** (the shadcn ecosystem's icon set) loaded from CDN as UMD (`lucide@0.525.0/dist/umd/lucide.js`); `components/icons/Icon.jsx` renders icon data as inline SVG. 1.5px stroke at 16px default (2px at 12px), `currentColor` only.
- **Roles, not glyphs**: components never pick raw icon names. `data/icon-roles.json` + `components/icons/roles.js` map ~70 semantic roles → Lucide glyphs: tools (`select`, `frame`, `rectangle`, `text`, `pen`, `hand`, `comment`), layer states (`visible`, `hidden`, `locked`, `unlocked`, `component`, `group`), panels (`layers`, `assets`, `tokens`, `data`), field types (`field-text`, `field-number`, `field-image`, `field-boolean`…), transforms (`align-left`, `rotate`, `flip-h`…), chrome (`chevron-down`, `plus`, `search`, `close`, `more`…). Change the glyph in ONE place; every surface follows.
- **No emoji, no unicode-as-icon, no hand-drawn SVGs.** The only non-Lucide vectors allowed are the generic shape geometry in `data/shapes.json` (content, not chrome).
- Sizes: 16px default in chrome, 14px in dense rows, 12px in micro controls; always `currentColor`.

## Data model (JSON)

- `data/collections.json` — registry; each entry points to `data/collections/<id>.json`.
- Collection file: `{ id, name, icon(role), fields: [{key, label, type, unit?, options?}], records: [{id, ...}] }`. Field types: `text, richtext, number, boolean, image, select, date, color, url`.
- `data/tokens.json` — W3C-format typed tokens; `cssVar` binds each to `tokens/*.css`.
- `data/gradients.json`, `data/shapes.json`, `data/filters.json` — utility presets (filters express raw SVG primitives as `{tag, attrs, children}` — a data-driven plugin format).

## Index

*(updated as the system grows)*

- `styles.css` — link this one file.
- `tokens/` — openprops (primitives) · colors · typography · spacing · devices · radius · shadows · motion · tiers (optional demo) · fonts · base.
- `data/` — tokens.json · collections(.json + 4 files) · gradients · shapes · filters · keybindings · layouts · devices · interactions · blocks · icon-roles.
- `guidelines/` — foundation specimen cards (Design System tab).
- `ui_kits/editor/` — the assembled editor, one screen per layout archetype.
- `ui_kits/playground/` — interactive catalog of every asset/component.
- `SKILL.md` — agent skill entry point.

## Components (full inventory)

- `components/icons/` — **Icon** (+ `roles.js` registry, ~95 roles).
- `components/ui/` — **Button · IconButton · Input · Select · Checkbox · Switch · Slider · Label · Separator · Badge · Tabs · Tooltip · Kbd · Menu · Dialog · Toast · Avatar**.
- `components/fields/` — **TextField · NumberField · ColorField · SelectField · BooleanField · PositionField**.
- `components/designer/` — **Menubar · Toolbar · FloatingToolbar · Panel · Pane · Canvas · Frame · LayerTree · ZoomControls · Filmstrip · StatusBar · PageList**.
- `components/tokens/` — **TokenSwatch · TokenRow · TokenList**.
- `components/data/` — **CollectionList · CollectionTable · BoundField · DataSourcePicker**.
- `components/library/` — **LibraryItem · AssetGrid**.
- `components/utilities/` — **GradientEditor · ShapeLibrary · FilterStack** (+ exported `GradientCss` helper).
- `components/devices/` — **DeviceFrame · BreakpointSwitcher** (+ exported `DEVICE_SIZES`).
- `components/prototype/` — **ConnectionLayer · InteractionEditor**.
- `components/collab/` — **AvatarStack · CursorChip · CommentPin** (presencia multiplayer; + `presenceColor` helper).
- `components/commands/` — **CommandPalette · ShortcutsOverlay**.
- `components/actions/` — **ActionFill · ActionRotate · ActionOpacity · ActionAlign**.

## Intentional additions

Documented deviations from the pure reference (no source inventory was accessible, so the component set was derived from the docs' concept/reference structure):

- `icons/` role registry — requested: icons centralized in one library with assigned roles.
- `data/` collections + JSON data folder — requested: data collections integrable into the canvas, all data as JSON.
- `tokens/` management UI + typed `tokens.json` — requested: design-token management with all token types.
- `library/` — requested: component-library support.
- `utilities/` — requested: micro-tools/plugins (gradients, shapes, SVG filters).
