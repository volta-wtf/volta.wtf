Single-line text input; pair with `Label`, use `quiet` inside dense panels and `mono` for names/values.

```jsx
<Label htmlFor="n">Layer name</Label>
<Input id="n" quiet mono defaultValue="Frame 12" />
<Input placeholder="Search layers…" size="sm" />
```

For numbers-with-units use `fields/NumberField` instead.
