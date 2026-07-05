Docked side panel — body scrolls, header/footer pin. Compose Panes (right/inspector) or LayerTree (left) inside.

```jsx
<Panel side="right" header={<Tabs full items={['Design','Data']} value={t} onChange={setT} />}>
  <Pane title="Layout">…fields…</Pane>
  <Pane title="Fill">…</Pane>
</Panel>
```
