import React from "react";
import { cn } from "../lib/cn.js";

const OTPCtx = React.createContext(null);

/** InputOTP — segmented one-time-password input. */
export function InputOTP({ maxLength = 6, value, defaultValue = "", onChange, className = "", children, ...props }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const val = isControlled ? value : internal;
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);
  const setVal = (v) => { const clean = v.replace(/\D/g, "").slice(0, maxLength); if (!isControlled) setInternal(clean); onChange && onChange(clean); };
  return (
    <OTPCtx.Provider value={{ val, maxLength, focused }}>
      <div className={cn("ds-otp", className)} onClick={() => ref.current && ref.current.focus()} {...props}>
        <input ref={ref} inputMode="numeric" autoComplete="one-time-code" value={val}
          onChange={(e) => setVal(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ position: "absolute", opacity: 0, width: 1, height: 1, pointerEvents: "none" }} />
        {children}
      </div>
    </OTPCtx.Provider>
  );
}
export function InputOTPGroup({ className = "", ...props }) { return <div className={cn("ds-otp-group", className)} {...props} />; }
export function InputOTPSlot({ index, className = "", ...props }) {
  const ctx = React.useContext(OTPCtx);
  const char = ctx.val[index];
  const active = ctx.focused && (index === ctx.val.length || (index === ctx.maxLength - 1 && ctx.val.length === ctx.maxLength));
  return (
    <div data-active={active || undefined} className={cn("ds-otp-slot", className)} {...props}>
      {char}
      {active && !char && <div className="ds-otp-caret" />}
    </div>
  );
}
export function InputOTPSeparator({ className = "", ...props }) { return <div role="separator" className={cn("ds-otp-separator", className)} {...props}>-</div>; }
