Sectioned tile grid for the assets/insert panel.

```jsx
<AssetGrid title="Shapes" count={shapes.length}>
  {shapes.map((s) => <LibraryItem key={s.id} name={s.name} thumb={…} onInsert={() => insert(s)} />)}
</AssetGrid>
```
