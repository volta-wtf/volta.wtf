Native select, styled; for enum properties (blend mode, font weight, breakpoint…).

```jsx
<Select options={['Normal', 'Multiply', 'Screen']} defaultValue="Normal" quiet size="sm" />
<Select options={[{ value: 'px', label: 'Pixels' }, { value: '%', label: 'Percent' }]} />
```

For field-type-aware editing inside the inspector use `fields/SelectField`.
