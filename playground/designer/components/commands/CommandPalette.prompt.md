⌘K palette; absolute overlay inside the app shell (nearest positioned ancestor). Wire the commands, don't fake rows.

```jsx
const [open, setOpen] = React.useState(false);
React.useEffect(() => {
  const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true); } };
  window.addEventListener('keydown', h);
  return () => window.removeEventListener('keydown', h);
}, []);
<CommandPalette groups={kb.groups} open={open} onClose={() => setOpen(false)} onRun={run} />
```
