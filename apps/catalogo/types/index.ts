import { CSSProperties } from 'react';

export type Section = 'text-styles' | 'text-classes' | 'frame-styles' | 'gradients';

export interface BaseStyle {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isCustom?: boolean;
  isModified?: boolean;
}

export interface FrameStyle extends BaseStyle {
  material: string;
  cssClass: string;
  style: CSSProperties;
}

export interface TextStyle extends BaseStyle {
  previewText: string;
  cssClass: string;
  style: CSSProperties;
  usesDataText?: boolean;
  before?: {
    content?: string;
    [key: string]: any;
  };
  after?: {
    content?: string;
    [key: string]: any;
  };
}

export interface TextClass extends BaseStyle {
  cssFile: string;
  previewText: string;
  bestFor?: string[];
  reference?: string[];
  usesData?: boolean;
  background?: string;
  cssVariants?: string[];
}

export interface Gradient extends BaseStyle {
  gradient: string;
  colors: string[];
  usage: string;
  inspiration: string;
}

export interface Shadow {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius?: number; // Only for box-shadow
  color: string;
  enabled: boolean;
}
