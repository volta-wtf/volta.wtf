/**
 * Switch — instant on/off toggle (28×16). Label sits left, switch right.
 */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional row label; renders label-left / switch-right, full width. */
  label?: React.ReactNode;
}
