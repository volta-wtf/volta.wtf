Icon-only square button for toolbars, pane headers and rows; `label` is required and becomes the tooltip.

```jsx
<IconButton name="select" label="Select — V" active />
<IconButton name="visible" label="Hide layer" size="sm" />
<IconButton name="more" label="More options" tooltip={false} />
```

`active` = selection-blue tool state. `inverse` for dark floating toolbars. Never place raw `<Icon>` inside a bare `<button>` — use this.
