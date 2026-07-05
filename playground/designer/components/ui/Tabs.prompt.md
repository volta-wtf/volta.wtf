Segmented control for 2–4 sibling views (Design/Prototype, Fill/Stroke).

```jsx
const [tab, setTab] = React.useState('design');
<Tabs items={[{value:'design',label:'Design'},{value:'prototype',label:'Prototype'}]} value={tab} onChange={setTab} full />
```
