Dropdown/context menu; items are data, separators are `'-'`. Position absolutely at the trigger or pointer.

```jsx
<Menu
  style={{ position: 'absolute', left: pt.x, top: pt.y }}
  items={[
    { id: 'copy', title: 'Copy', icon: 'duplicate', keys: ['mod','C'] },
    { id: 'paste', title: 'Paste', keys: ['mod','V'] },
    '-',
    { id: 'del', title: 'Delete', icon: 'delete', danger: true, keys: ['⌫'] },
  ]}
  onSelect={run}
/>
```
