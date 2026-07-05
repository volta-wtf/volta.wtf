**Toaster / toast()** — transient notifications (Sonner style). Render `<Toaster />` once near the app root, then call `toast()` from anywhere.

```jsx
<Toaster />
<Button onClick={() => toast({ title: 'Event created', description: 'Sunday at 9:00 AM' })}>
  Show toast
</Button>
```
