**Button** — the primary action control. Six variants, four sizes; `disabled` dims to 50% and blocks pointer events. Use `size="icon"` for icon-only buttons and include an `aria-label`.

```jsx
<Button>Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive"><Icon name="delete" /> Delete</Button>
<Button variant="outline" size="sm">Small</Button>
<Button variant="ghost" size="icon" aria-label="Settings"><Icon name="settings" /></Button>
<Button variant="link">Learn more</Button>
```

Variants: `default` (primary), `secondary`, `destructive`, `outline`, `ghost`, `link`. Sizes: `default` (h-9), `sm` (h-8), `lg` (h-10), `icon` (square).
