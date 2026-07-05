**Message** — one turn in a conversation. `role="user"` right-aligns and reverses avatar/bubble; `assistant` left-aligns. Pass an `Avatar` as `avatar`.

```jsx
<Message role="assistant" name="Claude" avatar={<Avatar><AvatarFallback>C</AvatarFallback></Avatar>}>
  Sure — here's a summary.
</Message>
<Message role="user" name="You" avatar={<Avatar><AvatarFallback>Y</AvatarFallback></Avatar>}>
  Thanks!
</Message>
```
