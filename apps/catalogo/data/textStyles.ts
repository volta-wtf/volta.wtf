import { TextStyle } from '../gallery/types';

export const textStyleCategories = [
  'All',
  'Retro',
  'Luxury',
  'Colorful',
  'Metallic',
  'Effects',
  'Minimal',
  'Decorative',
  'Custom',
  'Modified'
];

export const textStyles: TextStyle[] = [
  {
    id: '1',
    name: 'Neon Glow',
    description: 'Electric neon text with a vibrant glow effect',
    previewText: 'Neon',
    style: {
      color: '#00ffff',
      textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
      letterSpacing: '2px'
    },
    category: 'Retro',
    tags: ['neon', 'glow', 'cyberpunk'],
    cssClass: 'neon-glow'
  },
  {
    id: '2',
    name: 'Gold Emboss',
    description: 'Luxurious gold embossed text with depth',
    previewText: 'Gold',
    style: {
      color: '#daa520',
      textShadow: '2px 2px 0px #b8860b, 4px 4px 0px rgba(0,0,0,0.2)',
      letterSpacing: '1px'
    },
    category: 'Luxury',
    tags: ['gold', 'emboss', 'premium'],
    cssClass: 'gold-emboss'
  },
  {
    id: '3',
    name: 'Rainbow Gradient',
    description: 'Colorful rainbow gradient text effect',
    previewText: 'Rainbow',
    style: {
      background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '1px'
    },
    category: 'Colorful',
    tags: ['rainbow', 'gradient', 'colorful'],
    cssClass: 'gradient-rainbow'
  },
  {
    id: '4',
    name: 'Chrome Metallic',
    description: 'Shiny chrome metallic text with reflections',
    previewText: 'Chrome',
    style: {
      background: 'linear-gradient(180deg, #eee 0%, #999 50%, #777 51%, #555 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '1px'
    },
    category: 'Metallic',
    tags: ['chrome', 'metal', 'shiny'],
    cssClass: 'chrome-metallic'
  },
  {
    id: '5',
    name: 'Fire Burn',
    description: 'Fiery burning text with flame effect',
    previewText: 'Fire',
    style: {
      color: '#ff4500',
      textShadow: '0 0 5px #ff4500, 0 0 10px #ff4500, 0 0 15px #ff6347, 0 0 20px #ff6347',
      letterSpacing: '2px'
    },
    category: 'Effects',
    tags: ['fire', 'flame', 'hot'],
    cssClass: 'fire-burn'
  },
  {
    id: '6',
    name: 'Ice Crystal',
    description: 'Cool ice crystal text with frozen effect',
    previewText: 'Ice',
    style: {
      color: '#87ceeb',
      textShadow: '0 0 5px #87ceeb, 0 0 10px #87ceeb, 0 0 15px #4682b4',
      letterSpacing: '2px'
    },
    category: 'Effects',
    tags: ['ice', 'cold', 'crystal'],
    cssClass: 'ice-crystal'
  },
  {
    id: '7',
    name: 'Retro Wave',
    description: '80s synthwave style text with pink and cyan',
    previewText: 'Retro',
    style: {
      background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 0 10px #ff00ff',
      letterSpacing: '2px'
    },
    category: 'Retro',
    tags: ['synthwave', '80s', 'retro'],
    cssClass: 'retro-wave'
  },
  {
    id: '8',
    name: 'Outline Stroke',
    description: 'Bold outline text with transparent fill',
    previewText: 'Outline',
    style: {
      color: 'transparent',
      WebkitTextStroke: '2px #333',
      letterSpacing: '1px'
    },
    category: 'Minimal',
    tags: ['outline', 'stroke', 'minimal'],
    cssClass: 'outline-stroke'
  },
  {
    id: '9',
    name: 'Neon Border',
    description: 'Neon text with glowing border effect using pseudo-elements',
    previewText: 'Neon',
    category: 'Effects',
    tags: ['neon', 'border', 'glow', 'pseudo'],
    cssClass: 'neon-border',
    style: {
      position: 'relative',
      color: '#00ffff',
      textShadow: '0 0 10px #00ffff',
      letterSpacing: '2px',
      zIndex: '1'
    },
    before: {
      content: '',
      position: 'absolute',
      top: '-5px',
      left: '-5px',
      right: '-5px',
      bottom: '-5px',
      border: '2px solid #00ffff',
      borderRadius: '8px',
      boxShadow: '0 0 20px #00ffff',
      pointerEvents: 'none',
      zIndex: '-1'
    }
  },
  {
    id: '10',
    name: 'Double Text',
    description: 'Text with shadow copy using after pseudo-element',
    previewText: 'Double',
    category: 'Effects',
    tags: ['double', 'shadow', 'pseudo'],
    cssClass: 'double-text',
    style: {
      position: 'relative',
      color: '#333',
      zIndex: '0'
    },
    after: {
      content: 'Double',
      position: 'absolute',
      top: '2px',
      left: '2px',
      color: '#ff6347',
      opacity: '0.7',
      zIndex: '-1'
    }
  },
  {
    id: '11',
    name: 'Decorative Brackets',
    description: 'Text with decorative brackets using pseudo-elements',
    previewText: 'Fancy',
    category: 'Decorative',
    tags: ['decorative', 'brackets', 'pseudo'],
    cssClass: 'decorative-brackets',
    style: {
      position: 'relative',
      color: '#8b5cf6',
      letterSpacing: '2px',
      fontWeight: 'bold'
    },
    before: {
      content: '❮',
      position: 'absolute',
      left: '-30px',
      color: '#06b6d4',
      fontSize: '1.2em',
      fontWeight: 'bold'
    },
    after: {
      content: '❯',
      position: 'absolute',
      right: '-30px',
      color: '#06b6d4',
      fontSize: '1.2em',
      fontWeight: 'bold'
    }
  },
  {
    id: '12',
    name: 'Glowing Background',
    description: 'Text with glowing background using before pseudo-element',
    previewText: 'Glow',
    category: 'Effects',
    tags: ['glow', 'background', 'pseudo'],
    cssClass: 'glowing-background',
    style: {
      position: 'relative',
      color: '#ffffff',
      fontWeight: 'bold',
      letterSpacing: '1px',
      zIndex: '1'
    },
    before: {
      content: '',
      position: 'absolute',
      top: '-10px',
      left: '-10px',
      right: '-10px',
      bottom: '-10px',
      background: 'radial-gradient(circle, #ff6b6b, #4ecdc4)',
      borderRadius: '10px',
      filter: 'blur(8px)',
      opacity: '0.8',
      zIndex: '-1'
    }
  },
  {
    id: '13',
    name: 'Underline Stripe',
    description: 'Text with animated underline using after pseudo-element',
    previewText: 'Stripe',
    category: 'Decorative',
    tags: ['underline', 'stripe', 'pseudo'],
    cssClass: 'underline-stripe',
    style: {
      position: 'relative',
      color: '#2d3748',
      fontWeight: 'bold',
      letterSpacing: '1px'
    },
    after: {
      content: '',
      position: 'absolute',
      bottom: '-5px',
      left: '0',
      right: '0',
      height: '3px',
      background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1)',
      borderRadius: '2px'
    }
  },
  {
    id: '14',
    name: 'Lighting Effect',
    description: 'Dynamic lighting effect with animated gradient using data-text',
    previewText: 'Lighting',
    category: 'Effects',
    tags: ['lighting', 'animation', 'pseudo', 'data-text'],
    cssClass: 'text-lighting',
    usesDataText: true,
    style: {
      position: 'relative',
      zIndex: '0',
      background: 'black',
      filter: 'brightness(150%) contrast(1.7)',
      mixBlendMode: 'lighten'
    },
    before: {
      content: 'attr(data-text)',
      position: 'absolute',
      zIndex: '1',
      left: '0',
      color: 'white',
      filter: 'blur(0.01em)'
    },
    after: {
      content: 'attr(data-text)',
      position: 'absolute',
      zIndex: '2',
      background: 'radial-gradient(circle, white, transparent 25%) center / 25% 25%, radial-gradient(circle, white, black 25%) center / 12.5% 12.5%',
      animation: 'light 5s linear infinite',
      mixBlendMode: 'color-dodge',
      top: '0.075em',
      left: '0',
      color: 'transparent'
    }
  },
  {
    id: '15',
    name: 'Glass Effect',
    description: 'Translucent glass effect with reflections using data-text',
    previewText: 'Glass',
    category: 'Effects',
    tags: ['glass', 'reflection', 'pseudo', 'data-text'],
    cssClass: 'text-glass',
    usesDataText: true,
    style: {
      position: 'relative',
      zIndex: '0',
      background: 'linear-gradient(45deg, white, #ffffff8f, #ffffffc4, #ffffff73, white)',
      filter: 'brightness(150%) contrast(1.5)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    },
    before: {
      content: 'attr(data-text)',
      position: 'absolute',
      zIndex: '1',
      background: 'radial-gradient(circle, #ffffff, transparent 62%) center/11% 26%, radial-gradient(circle, #ffffff, #ffffff00 25%) center/11.5% 26.5%',
      filter: 'blur(0.01em)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    }
  },
  {
    id: '16',
    name: 'RGB Split',
    description: 'Color channel separation effect using data-text',
    previewText: 'RGB',
    category: 'Glitch',
    tags: ['rgb', 'split', 'glitch', 'pseudo', 'data-text'],
    cssClass: 'text-rgb-split',
    usesDataText: true,
    style: {
      position: 'relative',
      display: 'inline-block',
      color: '#00FF00',
      letterSpacing: '0.06em',
      zIndex: '0'
    },
    before: {
      content: 'attr(data-text)',
      position: 'absolute',
      color: '#0000FF',
      top: '0.03em',
      left: '0.03em',
      transition: '1s',
      mixBlendMode: 'plus-lighter',
      zIndex: '1'
    },
    after: {
      content: 'attr(data-text)',
      position: 'absolute',
      color: '#FF0000',
      top: '-0.03em',
      left: '-0.03em',
      transition: '1s',
      mixBlendMode: 'plus-lighter',
      zIndex: '1'
    }
  },
  {
    id: '17',
    name: 'Striped Layers',
    description: 'Layered striped pattern effect using data-text',
    previewText: 'Stripes',
    category: 'Pattern',
    tags: ['stripes', 'layers', 'pattern', 'pseudo', 'data-text'],
    cssClass: 'text-striped-layers',
    usesDataText: true,
    style: {
      position: 'relative',
      display: 'inline-block',
      color: '#cf1b1b',
      letterSpacing: '0.06em',
      zIndex: '0'
    },
    before: {
      content: 'attr(data-text)',
      position: 'absolute',
      color: 'transparent',
      top: '0px',
      left: '0px',
      transition: '1s',
      backgroundImage: 'repeating-linear-gradient(45deg, transparent 0, transparent 2px, white 2px, white 4px)',
      backgroundClip: 'text'
    },
    after: {
      content: 'attr(data-text)',
      position: 'absolute',
      color: 'transparent',
      top: '0px',
      left: '0px',
      transition: '1s',
      backgroundImage: 'repeating-linear-gradient(135deg, transparent 0, transparent 2px, white 2px, white 4px)',
      backgroundClip: 'text',
      zIndex: '-1'
    }
  },
  {
    id: '18',
    name: '3D Light',
    description: '3D effect with light and shadow using data-text',
    previewText: '3D',
    category: '3D',
    tags: ['3d', 'light', 'shadow', 'pseudo', 'data-text'],
    cssClass: 'text-3d-light',
    usesDataText: true,
    style: {
      position: 'relative',
      zIndex: '0',
      color: 'aqua',
      textShadow: '0 0 0.01em, 0 0 0.01em, 0 0 0.01em'
    },
    before: {
      content: 'attr(data-text)',
      position: 'absolute',
      left: '0.1em',
      color: 'rgba(0, 0, 0, .6)',
      width: 'max-content',
      filter: 'blur(5px)',
      opacity: '0.6',
      zIndex: '-1',
      textShadow: '0 0 0.01em, 0 0 0.01em, 0 0 0.01em'
    },
    after: {
      content: 'attr(data-text)',
      position: 'absolute',
      left: '0',
      color: 'rgba(0, 0, 0, .14)',
      textShadow: '0 0 0.01em, 0 0 0.01em, 0 0 0.01em'
    }
  }
];