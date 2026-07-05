Spreadsheet view of one collection (`data/collections/<id>.json`); header shows field-type icons.

```jsx
// col = await fetch('data/collections/products.json').json()
<CollectionTable collection={col} maxRecords={5} onRecordClick={setActiveRecord} />
```
