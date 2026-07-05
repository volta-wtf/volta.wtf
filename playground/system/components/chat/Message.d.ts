import * as React from "react";
/**
 * Message — a chat row (avatar + name + bubble) aligned by role.
 */
export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "assistant" | "user";
  name?: string;
  avatar?: React.ReactNode;
}
export function Message(props: MessageProps): JSX.Element;
