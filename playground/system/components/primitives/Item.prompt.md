**Item** — a composable row for lists/settings: leading media, title + description, trailing actions. `variant`: default / outline / muted.

```jsx
<Item variant="outline">
  <ItemMedia variant="icon"><Icon name="folder" /></ItemMedia>
  <ItemContent>
    <ItemTitle>Project files</ItemTitle>
    <ItemDescription>128 files · updated 2h ago</ItemDescription>
  </ItemContent>
  <ItemActions><Button variant="ghost" size="icon" aria-label="More"><Icon name="more-horizontal" /></Button></ItemActions>
</Item>
```
