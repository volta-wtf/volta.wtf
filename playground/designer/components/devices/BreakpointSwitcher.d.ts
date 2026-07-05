/**
 * BreakpointSwitcher — desktop/laptop/tablet/phone viewport toggle.
 */
export interface BreakpointOption { id: string; icon?: string; label?: string; }

export interface BreakpointSwitcherProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** @default desktop · laptop · tablet · phone */
  breakpoints?: BreakpointOption[];
  value: string;
  onChange?: (id: string) => void;
}
