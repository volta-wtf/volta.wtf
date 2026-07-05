/**
 * DeviceFrame — generic device bezel (phone/tablet/laptop/desktop/watch).
 * Screen content renders at true device pixels, scaled down visually.
 */
export interface DeviceFrameProps {
  /** Device id from data/devices.json, or explicit {width, height, class}. @default 'phone' */
  device?: string | { width: number; height: number; class?: 'phone' | 'tablet' | 'laptop' | 'desktop' | 'watch' };
  /** Visual scale of the whole frame. @default 0.35 */
  scale?: number;
  /** Browser-bar URL text (laptop/desktop only). */
  url?: string;
  /** Caption under the device. */
  label?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Screen content at true device size. */
  children?: React.ReactNode;
}

/** Device id → {width, height, class} map (mirror of data/devices.json). */
export declare const DEVICE_SIZES: Record<string, { width: number; height: number; class: string }>;
