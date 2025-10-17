import React, { CSSProperties } from 'react';

interface TextStyleProps {
  id: string;
  bg: string;
  type?: 'with-data' | 'only-data';
  children: React.ReactNode;
}

function TextStyle({ id, bg, type, children }: TextStyleProps) {
  // Handle different background types
  let style: CSSProperties & { [key: string]: any } = {};
  let className = '';

  if (bg.startsWith('#') || bg.startsWith('hsla')) {
    // Hex color - use CSS variable
    style = { '--bloc-color': bg };
  } else {
    // Named background - use CSS class
    className = `bg-${bg}`;
  }

  // const dataAttr = type ? { 'data-text': children } : {};
  const dataAttr = type ? { 'data-text': 'Aa' } : {};

  return (
    <div
      className={`bloc_ bg-origin-border! bg-cover! bg-primary/3 cursor-pointer aspect-8/4 _sm:aspect-8/4 lg:aspect-6/4 rounded-md border border-transparent hover:border-primary/20 transition-border duration-300 overflow-hidden flex items-center justify-center p-4 ${className}`}
      style={style}
    >
      <h2 className="type-demo-medium">
        <span className={`text-${id}`} {...dataAttr}>
          <span className="hidden">
            {children}
          </span>
          Aa
        </span>
      </h2>
    </div>
  );
}

export default TextStyle;