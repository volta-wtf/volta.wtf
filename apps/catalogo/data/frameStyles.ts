import { FrameStyle } from '@/types';

export const frameStyleCategories = [
  'All',
  'Modern',
  'Industrial',
  'Retro',
  'Natural',
  'Luxury',
  'Textile',
  'Liquid',
  'Futuristic',
  'Custom',
  'Modified'
];

export const frameStyles: FrameStyle[] = [
  {
    id: '1',
    name: 'Glass Morphism',
    description: 'Modern glass effect with blur and transparency',
    style: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '16px'
    },
    category: 'Modern',
    tags: ['glass', 'blur', 'transparent'],
    cssClass: 'glass-morphism',
    material: 'Glass'
  },
  {
    id: '2',
    name: 'Metallic Steel',
    description: 'Industrial steel frame with metallic shine',
    style: {
      background: 'linear-gradient(145deg, #b8b8b8, #e8e8e8)',
      border: '2px solid #999',
      borderRadius: '8px',
      boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.8), inset -2px -2px 5px rgba(0,0,0,0.3)'
    },
    category: 'Industrial',
    tags: ['metal', 'steel', 'industrial'],
    cssClass: 'metallic-steel',
    material: 'Metal'
  },
  {
    id: '3',
    name: 'Neon Border',
    description: 'Glowing neon border with electric effect',
    style: {
      background: 'rgba(0, 0, 0, 0.8)',
      border: '2px solid #00ffff',
      borderRadius: '12px',
      boxShadow: '0 0 10px #00ffff, inset 0 0 10px rgba(0, 255, 255, 0.1)'
    },
    category: 'Retro',
    tags: ['neon', 'glow', 'cyberpunk'],
    cssClass: 'neon-border',
    material: 'Energy'
  },
  {
    id: '4',
    name: 'Wood Grain',
    description: 'Natural wood texture with grain pattern',
    style: {
      background: 'linear-gradient(90deg, #8B4513 0%, #CD853F 25%, #8B4513 50%, #CD853F 75%, #8B4513 100%)',
      border: '3px solid #654321',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
    },
    category: 'Natural',
    tags: ['wood', 'natural', 'organic'],
    cssClass: 'wood-grain',
    material: 'Wood'
  },
  {
    id: '5',
    name: 'Crystal Diamond',
    description: 'Prismatic crystal effect with rainbow reflections',
    style: {
      background: 'linear-gradient(45deg, rgba(255,255,255,0.9), rgba(255,255,255,0.1))',
      border: '2px solid rgba(255,255,255,0.5)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 0 20px rgba(255,255,255,0.2)'
    },
    category: 'Luxury',
    tags: ['crystal', 'diamond', 'luxury'],
    cssClass: 'crystal-diamond',
    material: 'Crystal'
  },
  {
    id: '6',
    name: 'Fabric Textile',
    description: 'Soft fabric texture with woven pattern',
    style: {
      background: 'linear-gradient(45deg, #e6e6e6 25%, transparent 25%, transparent 75%, #e6e6e6 75%), linear-gradient(45deg, #e6e6e6 25%, transparent 25%, transparent 75%, #e6e6e6 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 10px 10px',
      backgroundColor: '#f0f0f0',
      border: '2px solid #ccc',
      borderRadius: '12px'
    },
    category: 'Textile',
    tags: ['fabric', 'textile', 'soft'],
    cssClass: 'fabric-textile',
    material: 'Fabric'
  },
  {
    id: '7',
    name: 'Liquid Mercury',
    description: 'Flowing liquid metal with chrome reflection',
    style: {
      background: 'radial-gradient(ellipse at center, #c0c0c0 0%, #808080 50%, #404040 100%)',
      border: '1px solid #606060',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1)'
    },
    category: 'Liquid',
    tags: ['mercury', 'liquid', 'chrome'],
    cssClass: 'liquid-mercury',
    material: 'Liquid'
  },
  {
    id: '8',
    name: 'Holographic Foil',
    description: 'Iridescent holographic surface with color shifting',
    style: {
      background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
      backgroundSize: '400% 400%',
      animation: 'gradient 3s ease infinite',
      border: '2px solid rgba(255,255,255,0.3)',
      borderRadius: '16px',
      boxShadow: '0 0 20px rgba(255,0,255,0.3)'
    },
    category: 'Futuristic',
    tags: ['hologram', 'iridescent', 'futuristic'],
    cssClass: 'holographic-foil',
    material: 'Hologram'
  }
];