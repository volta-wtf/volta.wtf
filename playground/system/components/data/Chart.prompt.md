**Chart** — `ChartContainer` takes a `config` (`{ key: { label, color } }`) that sets `--color-<key>` CSS vars; `Chart` renders a bar or line chart from `data`; `ChartLegend` reads the config. Colors should come from the `--chart-1…5` tokens. Hovering a group shows a tooltip.

```jsx
<ChartContainer config={{
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile:  { label: 'Mobile',  color: 'var(--chart-2)' },
}}>
  <Chart type="bar" data={[
    { label: 'Jan', desktop: 186, mobile: 80 },
    { label: 'Feb', desktop: 305, mobile: 200 },
    { label: 'Mar', desktop: 237, mobile: 120 },
  ]} />
  <ChartLegend />
</ChartContainer>
```
