**Carousel** — steps through slides; prev/next disable at the ends.

```jsx
<Carousel style={{maxWidth:320,margin:'0 24px'}}>
  <CarouselContent>
    {[1,2,3,4,5].map(n => (
      <CarouselItem key={n}>
        <Card><CardContent style={{display:'flex',alignItems:'center',justifyContent:'center',height:160,fontSize:36,fontWeight:600}}>{n}</CardContent></Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```
