/**
 * Slider — native range input.
 */
export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min?: number | string;
  max?: number | string;
  step?: number | string;
}
