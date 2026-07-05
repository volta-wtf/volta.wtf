**Select** — dropdown single-select. Compound API mirroring shadcn/ui: `Select` > `SelectTrigger` (+ `SelectValue`) and `SelectContent` > `SelectGroup`/`SelectLabel`/`SelectItem`/`SelectSeparator`.

```jsx
<Select defaultValue="apple">
  <SelectTrigger style={{width:180}}><SelectValue placeholder="Fruit" /></SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry" disabled>Blueberry</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```
