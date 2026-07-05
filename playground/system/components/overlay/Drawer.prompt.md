**Drawer** — slides up from the bottom with a drag handle; good for mobile. Same compound API as Dialog/Sheet.

```jsx
<Drawer>
  <DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader><DrawerTitle>Move goal</DrawerTitle><DrawerDescription>Set your daily activity goal.</DrawerDescription></DrawerHeader>
    <DrawerFooter><Button>Submit</Button><DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose></DrawerFooter>
  </DrawerContent>
</Drawer>
```
