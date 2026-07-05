/**
 * SelectField — inspector row: label + quiet select.
 */
export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: React.ReactNode;
  options: Array<string | { value: string; label: string }>;
}
