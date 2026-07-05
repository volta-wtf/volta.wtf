**Input** — single-line text field. Supports every native `type`. Pair with `Label`. Set `aria-invalid` for the invalid state and `disabled` to dim.

```jsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />
<Input aria-invalid placeholder="Invalid" />
<Input disabled placeholder="Disabled" />
```
