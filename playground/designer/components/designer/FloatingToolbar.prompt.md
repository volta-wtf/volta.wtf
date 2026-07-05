Floating pill toolbar over the canvas — whiteboard/slides archetypes (lg icons welcome). It's HUD chrome: pass it via `Canvas`'s `hud` prop (or place it in any position:relative wrapper), never as a world child.

```jsx
<Canvas hud={
  <FloatingToolbar>
    <IconButton name="select" label="Select — V" size="lg" active />
    <IconButton name="pen" label="Marker — P" size="lg" />
    <Separator orientation="vertical" />
    <IconButton name="comment" label="Comment — C" size="lg" />
  </FloatingToolbar>
}>
  …world…
</Canvas>
```
