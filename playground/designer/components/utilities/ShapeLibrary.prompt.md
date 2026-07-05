Shape insert grid; geometry comes from `data/shapes.json` (100×100 viewBox paths), never hand-drawn inline.

```jsx
<ShapeLibrary shapes={shapes} onInsert={(s) => addLayer({ type: 'shape', path: s.path, name: s.name })} />
```
