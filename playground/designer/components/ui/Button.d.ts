/**
 * Button — standard action control.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default 'primary' */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  /** md = 28px, sm = 24px, lg = 32px. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}
