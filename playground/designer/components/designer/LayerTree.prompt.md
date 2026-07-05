The layers panel list; hover reveals lock/eye, hidden layers dim, bindings show as blue badges.

```jsx
<LayerTree
  layers={[
    { id: 'hero', name: 'Hero', type: 'frame', children: [
      { id: 't1', name: 'Title', type: 'text', binding: 'title' },
      { id: 'img', name: 'Cover', type: 'image', hidden: true },
    ]},
  ]}
  selectedId={sel} onSelect={setSel}
  onToggleHidden={toggleHidden} onToggleLocked={toggleLocked}
/>
```
