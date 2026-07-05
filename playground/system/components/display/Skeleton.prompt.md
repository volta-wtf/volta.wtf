**Skeleton** — pulsing placeholder shown while content loads. Set dimensions via style.

```jsx
<div style={{display:'flex',gap:12,alignItems:'center'}}>
  <Skeleton style={{width:40,height:40,borderRadius:'50%'}} />
  <div style={{display:'grid',gap:8}}>
    <Skeleton style={{width:160,height:12}} />
    <Skeleton style={{width:120,height:12}} />
  </div>
</div>
```
