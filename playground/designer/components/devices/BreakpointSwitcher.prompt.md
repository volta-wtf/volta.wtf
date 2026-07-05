Viewport toggle for the web builder's menubar center; exactly one active.

```jsx
const [bp, setBp] = React.useState('laptop');
<BreakpointSwitcher value={bp} onChange={setBp} />
```
