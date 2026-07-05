**DropdownMenu** — menu of actions from a trigger; closes on select, outside-click, or Escape.

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><Icon name="settings" /> Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuItem variant="destructive"><Icon name="delete" /> Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```
