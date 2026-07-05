**RadioGroup** — mutually-exclusive options. Compose `RadioGroupItem` with `Label`s.

```jsx
<RadioGroup defaultValue="comfortable">
  <div style={{display:'flex',gap:8,alignItems:'center'}}>
    <RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label>
  </div>
  <div style={{display:'flex',gap:8,alignItems:'center'}}>
    <RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>
```
