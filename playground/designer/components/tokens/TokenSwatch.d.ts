/**
 * TokenSwatch — $type-aware preview cell for a design token.
 */
export interface DesignToken {
  name: string;
  $type: 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'number' | 'duration' | 'cubicBezier' | 'shadow';
  $value: unknown;
  /** Runtime binding, e.g. "--background". Preferred for rendering. */
  cssVar?: string;
  $description?: string;
}

export interface TokenSwatchProps {
  token: DesignToken;
}
