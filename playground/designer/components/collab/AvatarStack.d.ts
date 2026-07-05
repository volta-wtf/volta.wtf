/**
 * AvatarStack — overlapping avatars with +N overflow (menubar presence).
 */
export interface AvatarStackProps extends React.HTMLAttributes<HTMLSpanElement> {
  users: Array<{ name: string; src?: string }>;
  /** @default 4 */
  max?: number;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Presence rings on. @default true */
  presence?: boolean;
}
