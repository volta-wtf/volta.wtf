Gradient micro-tool: live preview, typed stops, angle, preset chips, click-to-copy CSS. `GradientCss(value)` is exported for applying the result anywhere.

```jsx
// presets = (await fetch('data/gradients.json').json()).presets
<GradientEditor presets={presets} onChange={(g) => setFill(GradientCss(g))} />
```
