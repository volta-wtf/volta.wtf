**ContextMenu** — appears at the pointer on right-click of its trigger area.

```jsx
<ContextMenu>
  <ContextMenuTrigger style={{border:'1px dashed var(--border)',borderRadius:8,padding:40,textAlign:'center'}}>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Back <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuItem>Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```
