**Accordion** — stacked, expandable sections. `type="single" collapsible` allows closing the open item; `type="multiple"` allows several open at once.

```jsx
<Accordion type="single" collapsible defaultValue="a1" style={{width:400}}>
  <AccordionItem value="a1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>
```
