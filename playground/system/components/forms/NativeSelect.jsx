import React from "react";
import { cn } from "../lib/cn.js";

/** NativeSelect — styled native <select> (lighter than the Radix Select). */
export function NativeSelect({ className = "", children, ...props }) {
  return <select className={cn("ds-native-select", className)} {...props}>{children}</select>;
}
