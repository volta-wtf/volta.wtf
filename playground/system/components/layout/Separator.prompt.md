**Separator** — visually or semantically divides content. Use `orientation="vertical"` inside a flex row (give the row a height).

```jsx
<Separator />
<div style={{display:'flex',height:20,alignItems:'center',gap:12}}>
  <span>Blog</span><Separator orientation="vertical" /><span>Docs</span>
</div>
```
