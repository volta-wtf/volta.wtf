**Attachment** — compact chip for an uploaded file or image; pass `src` for an image thumbnail or `icon` for a file glyph. Provide `onRemove` to show the dismiss button.

```jsx
<Attachment name="proposal.pdf" size="2.4 MB" icon="file" onRemove={() => {}} />
<Attachment name="cover.png" size="880 KB" src="/cover.png" />
```
