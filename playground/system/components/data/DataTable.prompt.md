**DataTable** — a full table experience over `Table`: click sortable headers to sort, filter by a column, select rows, and page through. Define `columns` with optional `cell` renderers.

```jsx
<DataTable
  filterKey="email"
  selectable
  columns={[
    { key: 'status', header: 'Status', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'amount', header: 'Amount', align: 'right', cell: r => `$${r.amount.toFixed(2)}` },
  ]}
  data={[
    { status: 'success', email: 'ken99@example.com', amount: 316 },
    { status: 'pending', email: 'abe45@example.com', amount: 242 },
  ]}
/>
```
