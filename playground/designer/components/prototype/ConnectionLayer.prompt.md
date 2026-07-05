Prototype noodles between frames; coordinates are world-space (same space as Frame x/y).

```jsx
<Canvas view={viewState} onViewChange={setViewState}>
  {frames}
  <ConnectionLayer connections={[
    { id: 'c1', from: { x: f1.x + f1.w, y: f1.y + 60 }, to: { x: f2.x, y: f2.y + 40 } },
  ]} />
</Canvas>
```
