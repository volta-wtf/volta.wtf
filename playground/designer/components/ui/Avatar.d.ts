/**
 * Avatar — initials/image disc; presence ring color derives from the name.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  /** sm 20 · md 24 · lg 32. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Colored multiplayer ring. @default false */
  presence?: boolean;
}

/** Stable presence palette (ultramarine, terracotta, green, violet, amber). */
export declare const PRESENCE_COLORS: string[];
export declare function presenceColor(name: string): string;
