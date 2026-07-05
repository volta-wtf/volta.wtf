**Checkbox** — binary toggle with checked / unchecked / indeterminate / disabled states. Pair with a `Label`.

```jsx
<div style={{display:'flex',gap:8,alignItems:'center'}}>
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">Accept terms</Label>
</div>
<Checkbox checked="indeterminate" />
<Checkbox disabled />
```
