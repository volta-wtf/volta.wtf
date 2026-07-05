**Tabs** — organize content into switchable panels.

```jsx
<Tabs defaultValue="account" style={{width:400}}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings…</TabsContent>
  <TabsContent value="password">Password settings…</TabsContent>
</Tabs>
```
