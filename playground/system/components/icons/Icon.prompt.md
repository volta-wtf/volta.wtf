**Icon** — renders a single glyph from the design system's Lucide-based registry. Use anywhere you need a system, product, or context icon; base components already use it internally.

```jsx
<Icon name="check" size={16} />
<Icon name="customer" size={20} className="text-muted" />
<Icon name="trend-up" size={24} strokeWidth={2} />
```

Layers (all Lucide): **Pictos** (system UI — `check`, `close`, `chevron-down`, `search`, `settings`…), **Icons** (product — `customer`, `invoice`, `project`, `task`…), **Context** (functional — `play`, `mail`, `lock`, `chart-bar`…). See `iconData.js` for the full list. In production, swap for `lucide-react` and import by name.
