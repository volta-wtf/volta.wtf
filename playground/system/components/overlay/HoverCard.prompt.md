**HoverCard** — sighted users hover to preview content behind a link (not keyboard-critical info).

```jsx
<HoverCard>
  <HoverCardTrigger asChild><Button variant="link">@nextjs</Button></HoverCardTrigger>
  <HoverCardContent>
    <div style={{display:'flex',gap:12}}>
      <Avatar><AvatarFallback>VC</AvatarFallback></Avatar>
      <div><div style={{fontWeight:600}}>@nextjs</div><div style={{fontSize:14,color:'var(--muted-foreground)'}}>The React Framework – created and maintained by @vercel.</div></div>
    </div>
  </HoverCardContent>
</HoverCard>
```
