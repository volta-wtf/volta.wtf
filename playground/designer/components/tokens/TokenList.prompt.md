The token manager body — pair with a Panel + search Input for the full "variables" panel.

```jsx
const [q, setQ] = React.useState('');
// tokens = await fetch('data/tokens.json').json()
<Panel side="right" header={<Input size="sm" placeholder="Search tokens…" value={q} onChange={(e) => setQ(e.target.value)} />}>
  <TokenList groups={tokens.groups} filter={q} />
</Panel>
```
