Numeric property control — number + unit, mono, tabular. Drag the affix to scrub; ↑/↓ steps (⇧ ×10).

```jsx
<NumberField label="X" unit="px" defaultValue={128} />
<NumberField icon="rotate" unit="deg" min={-180} max={180} defaultValue={0} />
<NumberField icon="opacity" unit="%" min={0} max={100} defaultValue={100} />
```

Use for every number in the inspector. For X/Y or W/H pairs use `PositionField`.
