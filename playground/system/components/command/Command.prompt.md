**Command** — searchable command list (cmdk). Typing in `CommandInput` filters items by their text/`keywords`.

```jsx
<Command style={{maxWidth:420,border:'1px solid var(--border)'}}>
  <CommandInput placeholder="Type a command…" />
  <CommandList>
    <CommandGroup heading="Suggestions">
      <CommandItem><Icon name="calendar" /> Calendar</CommandItem>
      <CommandItem><Icon name="search" /> Search</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```
