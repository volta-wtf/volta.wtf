Collapsible inspector section; title is a terse noun, body stacks fields at 4px gap.

```jsx
<Pane title="Layout">
  <PositionField values={pos} onChange={setPos} />
  <PositionField labels={['W','H']} values={size} onChange={setSize} />
</Pane>
<Pane title="Fill" actions={<IconButton name="add" label="Add fill" size="sm" />}>
  <ColorField value={fill} onChange={setFill} />
</Pane>
```
