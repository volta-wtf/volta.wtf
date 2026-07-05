/**
 * TokenRow — one design token as a manager row.
 */
import type { DesignToken } from './TokenSwatch';

export interface TokenRowProps {
  token: DesignToken;
  /** Show the $type badge. @default true */
  showType?: boolean;
  onClick?: () => void;
}
