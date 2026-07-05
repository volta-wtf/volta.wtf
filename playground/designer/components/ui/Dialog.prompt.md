Modal for real decisions (export, rename, delete); one primary action, sentence-case title.

```jsx
<Dialog open={open} onClose={close} title="Export frame" description="PNG at 2x — 960×640."
  footer={<>
    <Button variant="ghost" onClick={close}>Cancel</Button>
    <Button onClick={doExport}>Export</Button>
  </>}>
  …fields…
</Dialog>
```
