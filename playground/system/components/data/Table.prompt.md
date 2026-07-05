**Table** — rows and columns of data. Compose semantically; set `data-state="selected"` on a `TableRow` for the selected state.

```jsx
<Table>
  <TableCaption>A list of recent invoices.</TableCaption>
  <TableHeader>
    <TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead><TableHead style={{textAlign:'right'}}>Amount</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>INV001</TableCell><TableCell><Badge>Paid</Badge></TableCell><TableCell style={{textAlign:'right'}}>$250.00</TableCell></TableRow>
  </TableBody>
</Table>
```
