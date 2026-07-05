Role-based icon component — the single entry point for every glyph in the system; use a semantic role name, never a pasted SVG.

```jsx
<Icon name="visible" />                 {/* role → Eye */}
<Icon name="select" size={14} />        {/* dense row */}
<Icon name="delete" title="Delete" />   {/* accessible */}
```

- Requires `<script src="https://unpkg.com/lucide@0.525.0/dist/umd/lucide.js"></script>` before render.
- Roles live in `roles.js` / `data/icon-roles.json` (~85 roles grouped: Tools, Layers, Panels, Fields, Data, Transform, Text, Properties, Chrome). Falls back to raw Lucide PascalCase names; unknown names render a dashed placeholder.
- Sizes: 16 default · 14 dense rows · 12 micro (auto-bumps stroke to 2). Color: inherits `currentColor` — set `color` on the parent.
