**NavigationMenu** — top-of-page navigation whose items can open rich dropdown panels.

```jsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div style={{display:'grid',gap:8,width:340}}>
          <NavigationMenuLink href="#" title="Introduction">Re-usable components built with Radix and Tailwind.</NavigationMenuLink>
          <NavigationMenuLink href="#" title="Installation">How to install dependencies and structure your app.</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```
