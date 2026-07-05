**InputOTP** — segmented input for verification codes. A hidden real input captures typing; slots mirror each character with an animated caret on the active slot.

```jsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```
