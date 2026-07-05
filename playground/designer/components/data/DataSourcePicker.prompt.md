Binding control for the inspector's Data pane; result feeds `BoundField` + repeat-over-records.

```jsx
const [bind, setBind] = React.useState({ collection: 'products', field: 'title' });
<DataSourcePicker collections={cols} value={bind} onChange={setBind} fieldType="text" />
```
