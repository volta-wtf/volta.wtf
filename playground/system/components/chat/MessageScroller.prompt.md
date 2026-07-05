**MessageScroller** — wraps a `Message` list; auto-scrolls to the newest message unless the user has scrolled up to read history. Give it a fixed height.

```jsx
<MessageScroller style={{height:280,padding:12}}>
  <Message role="assistant" …>Hi!</Message>
  <Message role="user" …>Hello</Message>
</MessageScroller>
```
