**Sheet** — panel that slides in from an edge (`side`: right/left/top/bottom). Same API shape as Dialog.

```jsx
<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader><SheetTitle>Edit profile</SheetTitle><SheetDescription>Make changes to your profile here.</SheetDescription></SheetHeader>
    …content…
    <SheetFooter><SheetClose asChild><Button>Save</Button></SheetClose></SheetFooter>
  </SheetContent>
</Sheet>
```
