Paired numeric row — the X/Y and W/H workhorse.

```jsx
const [pos, setPos] = React.useState([128, 64]);
<PositionField values={pos} onChange={setPos} />
<PositionField labels={['W','H']} values={[480, 320]} units={['px','px']} />
```
