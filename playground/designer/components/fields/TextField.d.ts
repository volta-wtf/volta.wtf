/**
 * TextField — inspector row: label + quiet text input.
 */
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  /** Mono for names/ids. @default false */
  mono?: boolean;
}
