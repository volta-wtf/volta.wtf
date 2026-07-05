Infinite canvas: wheel pans, ⌘/ctrl+wheel zooms to cursor, background drag pans. World-coordinate elements (`Frame`, `ConnectionLayer`, `CursorChip`, `CommentPin`) go in as children; HUD chrome (`ZoomControls`, `FloatingToolbar`) goes in the `hud` prop so it stays anchored to the canvas box instead of panning/zooming with the world.

```jsx
const [sel, setSel] = React.useState(null);
const [viewState, setViewState] = React.useState({ zoom: 1, x: 120, y: 80 });
<Canvas
  view={viewState} onViewChange={setViewState}
  onBackgroundPointerDown={() => setSel(null)}
  hud={<ZoomControls view={viewState} onViewChange={setViewState} />}
>
  <Frame x={0} y={0} width={480} height={320} name="Hero" selected={sel==='hero'} onSelect={() => setSel('hero')} zoom={viewState.zoom} />
</Canvas>
```
