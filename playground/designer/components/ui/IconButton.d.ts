/**
 * IconButton — square icon-only control (toolbars, panel headers, rows).
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon role from the registry (e.g. "select", "visible", "more"). */
  name: string;
  /** Required accessible label; doubles as the tooltip. */
  label: string;
  /** md = 28px, sm = 24px, lg = 36px. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Selected-tool state: selection-blue tint. @default false */
  active?: boolean;
  /** For dark floating toolbars. @default false */
  inverse?: boolean;
  /** Show the CSS tooltip on hover. @default true */
  tooltip?: boolean;
}
