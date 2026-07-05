**Card** — surface for grouping related content. Compose the sub-parts in order.

```jsx
<Card style={{width:360}}>
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one click.</CardDescription>
  </CardHeader>
  <CardContent>…form fields…</CardContent>
  <CardFooter style={{justifyContent:'space-between'}}>
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```
