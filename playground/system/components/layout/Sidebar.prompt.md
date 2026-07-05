**Sidebar** — full collapsible app-shell sidebar. Wrap the whole layout in `SidebarProvider`; put page content in `SidebarInset`. `SidebarTrigger` toggles collapse.

```jsx
<SidebarProvider style={{height:400,border:'1px solid var(--border)',borderRadius:8,overflow:'hidden'}}>
  <Sidebar>
    <SidebarHeader>…brand…</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem><SidebarMenuButton isActive><Icon name="home" /> Dashboard</SidebarMenuButton></SidebarMenuItem>
          <SidebarMenuItem><SidebarMenuButton><Icon name="inbox" /> Inbox</SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <header style={{padding:12}}><SidebarTrigger /></header>
    …page…
  </SidebarInset>
</SidebarProvider>
```
