Zoom HUD; pass it to `Canvas`'s `hud` prop (it anchors bottom-right of the canvas box and must NOT pan/zoom with the world).

```jsx
<Canvas view={viewState} onViewChange={setViewState}
  hud={<ZoomControls view={viewState} onViewChange={setViewState} onFit={fitToFrames} />}>
  …frames…
</Canvas>
```
