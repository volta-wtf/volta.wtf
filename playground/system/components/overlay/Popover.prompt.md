**Popover** — rich floating content anchored to a trigger; closes on outside-click.

```jsx
<Popover>
  <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
  <PopoverContent>
    <div style={{display:'grid',gap:8}}>
      <Label>Width</Label>
      <Input defaultValue="100%" />
    </div>
  </PopoverContent>
</Popover>
```
