/**
 * TokenList — grouped, filterable token manager (renders data/tokens.json).
 */
import type { DesignToken } from './TokenSwatch';

export interface TokenGroup { id: string; name: string; tokens: DesignToken[]; }

export interface TokenListProps extends React.HTMLAttributes<HTMLDivElement> {
  groups: TokenGroup[];
  /** Case-insensitive match on name/cssVar/$type. */
  filter?: string;
  /** @default true */
  showType?: boolean;
  onTokenClick?: (token: DesignToken) => void;
}
