import React from "react";
import { cn } from "../lib/cn.js";
import { Bubble } from "./Bubble.jsx";

/** Message — a chat row: avatar + name + bubble, aligned by role. */
export function Message({ role = "assistant", name, avatar, className = "", children, ...props }) {
  const variant = role === "user" ? "user" : "assistant";
  return (
    <div className={cn("ds-message", role === "user" && "ds-message--user", className)} {...props}>
      {avatar}
      <div className="ds-message-content">
        {name && <span className="ds-message-name">{name}</span>}
        <Bubble variant={variant}>{children}</Bubble>
      </div>
    </div>
  );
}
