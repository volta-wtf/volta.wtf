import React from 'react';

export const DEVICE_SIZES = {
  'phone-sm': { width: 320, height: 568, class: 'phone' },
  phone: { width: 390, height: 844, class: 'phone' },
  'phone-lg': { width: 430, height: 932, class: 'phone' },
  tablet: { width: 768, height: 1024, class: 'tablet' },
  'tablet-lg': { width: 834, height: 1194, class: 'tablet' },
  laptop: { width: 1280, height: 832, class: 'laptop' },
  'laptop-lg': { width: 1440, height: 900, class: 'laptop' },
  desktop: { width: 1920, height: 1080, class: 'desktop' },
  watch: { width: 184, height: 224, class: 'watch' },
};

/**
 * DeviceFrame — generic neutral device bezel around screen content.
 * `device` is an id from data/devices.json (or {width, height, class}).
 * Content renders at TRUE device size, scaled by `scale`.
 */
export function DeviceFrame({ device = 'phone', scale = 0.35, url, label, className = '', style, children }) {
  const d = typeof device === 'string' ? (DEVICE_SIZES[device] || DEVICE_SIZES.phone) : device;
  const cls = d.class || 'phone';
  const isBrowser = cls === 'laptop' || cls === 'desktop';
  return (
    <figure className={`dsr-device ${className}`.trim()} style={{ margin: 0, ...style }}>
      <div
        className={`dsr-device__shell dsr-device__shell--${cls}`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center', marginBottom: (d.height + (isBrowser ? 28 : 24)) * (scale - 1) }}
      >
        {isBrowser ? (
          <div className="dsr-device__browserbar">
            <span className="dsr-device__dots"><i className="dsr-device__dot"></i><i className="dsr-device__dot"></i><i className="dsr-device__dot"></i></span>
            <span className="dsr-device__url">{url || 'preview.local'}</span>
            <span style={{ width: 33 }}></span>
          </div>
        ) : null}
        <div className="dsr-device__screen" style={{ width: d.width, height: d.height }}>
          {children}
        </div>
      </div>
      {label ? <figcaption className="dsr-device__label">{label}</figcaption> : null}
    </figure>
  );
}
