Inspector pane content for prototype mode; easing/duration reuse the motion tokens.

```jsx
// vocab = await fetch('data/interactions.json').json()
<Pane title="Interaction">
  <InteractionEditor vocab={vocab} value={ix} onChange={setIx} targets={['Detail', 'Checkout']} />
</Pane>
```
