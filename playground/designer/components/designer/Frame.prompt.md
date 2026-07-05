Artboard on the canvas; selection shows the blue outline + corner handles. Wire `onMove`/`onResize` to your layer state to make it live.

```jsx
<Frame
  x={f.x} y={f.y} width={f.w} height={f.h} name={f.name} zoom={viewState.zoom}
  selected={sel === f.id}
  onSelect={() => setSel(f.id)}
  onMove={({x, y}) => patch(f.id, { x, y })}
  onResize={(box) => patch(f.id, box)}
>
  …frame content…
</Frame>
```
