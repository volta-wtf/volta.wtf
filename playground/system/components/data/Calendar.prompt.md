**Calendar** — standalone month grid with prev/next navigation and single-date selection. States: today (accent), selected (primary), outside-month (dimmed), disabled.

```jsx
<Calendar defaultSelected={new Date()} onSelect={(d) => console.log(d)} />
```
