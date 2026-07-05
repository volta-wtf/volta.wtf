Slide rail for the slides archetype; put it in a narrow left `Panel` (width 148–180).

```jsx
<Panel side="left" width={164}>
  <Filmstrip
    slides={slides} selectedId={cur} onSelect={setCur}
    renderThumb={(s) => <div style={{ padding: 6, fontSize: 5 }}>{s.title}</div>}
  />
</Panel>
```
