/**
 * Label — caption for a control, or an uppercase section eyebrow.
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Uppercase 11px tracked section label ("FILL", "LAYOUT"). @default false */
  eyebrow?: boolean;
  /** Muted suffix, e.g. "optional". */
  hint?: React.ReactNode;
  children?: React.ReactNode;
}
