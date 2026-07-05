**Resizable** — split layout with a draggable divider. Set `direction`; add `withHandle` for a visible grip.

```jsx
<ResizablePanelGroup direction="horizontal" style={{height:200,border:'1px solid var(--border)',borderRadius:8}}>
  <ResizablePanel defaultSize={40}><div style={{padding:16}}>One</div></ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60}><div style={{padding:16}}>Two</div></ResizablePanel>
</ResizablePanelGroup>
```
