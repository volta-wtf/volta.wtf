Top app bar (48px) for every editor archetype. Wordmark is plain type — never draw a logo.

```jsx
<Menubar
  doc="Q3 campaign" docMeta="saved 2m ago"
  center={<Tabs items={['Design','Data','Prototype']} value={mode} onChange={setMode} />}
  right={<>
    <IconButton name="play" label="Present" />
    <Button size="sm">Share</Button>
  </>}
/>
```
