import * as React from "react";
/**
 * InputOTP — segmented one-time-password / code input, faithful to shadcn/ui.
 */
export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}
export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> { index: number; }
export function InputOTP(props: InputOTPProps): JSX.Element;
export function InputOTPGroup(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function InputOTPSlot(props: InputOTPSlotProps): JSX.Element;
export function InputOTPSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
