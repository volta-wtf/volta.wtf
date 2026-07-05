/**
 * Checkbox — 16px square with CSS check; supports indeterminate via ref.
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional row label rendered beside the box. */
  label?: React.ReactNode;
}
