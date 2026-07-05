**AlertDialog** — interrupts with a confirmation the user must act on (no dismiss-on-outside-click). Use for destructive/irreversible actions.

```jsx
<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="outline">Delete account</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone. This will permanently delete your account.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
