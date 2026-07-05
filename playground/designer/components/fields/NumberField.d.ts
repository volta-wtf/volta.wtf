/**
 * NumberField — numeric value + unit; scrubbable affix, keyboard stepping.
 */
export interface NumberFieldProps {
  /** Affix glyph text: "X", "Y", "W", "H", "R"… (or use `icon`). */
  label?: React.ReactNode;
  /** Icon role for the affix (e.g. "rotate", "radius", "opacity"). */
  icon?: string;
  /** Unit suffix: "px" | "%" | "deg" | "ms" | "fr" | "€"… */
  unit?: string;
  /** Controlled value; omit and use defaultValue for uncontrolled. */
  value?: number;
  /** @default 0 */
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  /** ↑/↓ step; ⇧ multiplies ×10. Scrub: 2px drag = 1 step. @default 1 */
  step?: number;
  /** Accessible name / affix tooltip. */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}
