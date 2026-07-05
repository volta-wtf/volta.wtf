SVG-filter plugin stack: each preset in `data/filters.json` is a list of raw filter primitives rendered into a real `<filter>`; toggles compose them (`filter: url(#a) url(#b)`).

```jsx
// presets = (await fetch('data/filters.json').json()).presets
<FilterStack presets={presets} />
<FilterStack presets={presets} enabledIds={on} onToggle={toggle} preview={<img src={cover} width="120" />} />
```
