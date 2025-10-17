import { Gradient } from '../gallery/types';

export const gradientCategories = [
  'All',
  'Nature',
  'Tech',
  'Creative',
  'Luxury',
  'Travel',
  'Wellness',
  'Custom',
  'Modified'
];

export const gradients: Gradient[] = [
  {
    id: '1',
    name: 'Sunset Bloom',
    description: 'A warm gradient that captures the essence of a perfect sunset',
    gradient: 'linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3)',
    colors: ['#ff6b6b', '#feca57', '#ff9ff3'],
    inspiration: 'Golden hour sunsets and blooming flowers',
    usage: 'Perfect for wellness apps, lifestyle brands, and creative portfolios',
    category: 'Nature',
    tags: ['warm', 'organic', 'wellness']
  },
  {
    id: '2',
    name: 'Ocean Depths',
    description: 'Deep blue tones reminiscent of diving into crystal clear waters',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2, #6b73ff)',
    colors: ['#667eea', '#764ba2', '#6b73ff'],
    inspiration: 'Deep ocean trenches and mysterious underwater worlds',
    usage: 'Ideal for tech companies, meditation apps, and professional services',
    category: 'Tech',
    tags: ['cool', 'professional', 'tech']
  },
  {
    id: '3',
    name: 'Forest Whisper',
    description: 'Natural greens that evoke peaceful forest walks',
    gradient: 'linear-gradient(135deg, #56ab2f, #a8e6cf, #88d8a3)',
    colors: ['#56ab2f', '#a8e6cf', '#88d8a3'],
    inspiration: 'Morning mist through dense forest canopies',
    usage: 'Great for eco-friendly brands, health apps, and outdoor companies',
    category: 'Nature',
    tags: ['green', 'eco', 'health']
  },
  {
    id: '4',
    name: 'Cosmic Dance',
    description: 'Vibrant purples and pinks that capture the beauty of nebulae',
    gradient: 'linear-gradient(135deg, #a8edea, #fed6e3, #d299c2)',
    colors: ['#a8edea', '#fed6e3', '#d299c2'],
    inspiration: 'Distant galaxies and colorful cosmic phenomena',
    usage: 'Perfect for creative agencies, entertainment brands, and art platforms',
    category: 'Creative',
    tags: ['vibrant', 'artistic', 'cosmic']
  },
  {
    id: '5',
    name: 'Golden Hour',
    description: 'Warm amber tones that capture the magic of dawn',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c, #4facfe)',
    colors: ['#f093fb', '#f5576c', '#4facfe'],
    inspiration: 'The first light of dawn breaking through clouds',
    usage: 'Excellent for luxury brands, photography portfolios, and lifestyle apps',
    category: 'Luxury',
    tags: ['warm', 'premium', 'photography']
  },
  {
    id: '6',
    name: 'Arctic Aurora',
    description: 'Cool blues and teals inspired by northern lights',
    gradient: 'linear-gradient(135deg, #74b9ff, #0984e3, #6c5ce7)',
    colors: ['#74b9ff', '#0984e3', '#6c5ce7'],
    inspiration: 'Aurora borealis dancing across arctic skies',
    usage: 'Ideal for technology brands, finance apps, and modern websites',
    category: 'Tech',
    tags: ['cool', 'modern', 'finance']
  },
  {
    id: '7',
    name: 'Desert Mirage',
    description: 'Warm earth tones that shimmer like heat waves',
    gradient: 'linear-gradient(135deg, #fab1a0, #e17055, #fdcb6e)',
    colors: ['#fab1a0', '#e17055', '#fdcb6e'],
    inspiration: 'Endless desert dunes under scorching sun',
    usage: 'Perfect for travel brands, adventure apps, and cultural organizations',
    category: 'Travel',
    tags: ['warm', 'adventure', 'travel']
  },
  {
    id: '8',
    name: 'Lavender Dreams',
    description: 'Soft purples and blues for a dreamy, calming effect',
    gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7, #fd79a8)',
    colors: ['#a29bfe', '#6c5ce7', '#fd79a8'],
    inspiration: 'Lavender fields swaying in gentle summer breeze',
    usage: 'Great for wellness brands, beauty products, and mindfulness apps',
    category: 'Wellness',
    tags: ['soft', 'calming', 'beauty']
  },
  {
    id: '9',
    name: 'Emerald Flow',
    description: 'Vibrant green to blue transition that flows like fresh spring water',
    gradient: 'linear-gradient(to right, #84ff3d, #2eabff)',
    colors: ['#84ff3d', '#2eabff'],
    inspiration: 'Crystal clear mountain streams flowing through emerald forests',
    usage: 'Perfect for environmental brands, fitness apps, and fresh product launches',
    category: 'Nature',
    tags: ['fresh', 'vibrant', 'energy']
  },
  {
    id: '10',
    name: 'Sunrise Glow',
    description: 'Warm yellow to pink gradient capturing the first light of dawn',
    gradient: 'linear-gradient(#fee140, #fa709a)',
    colors: ['#fee140', '#fa709a'],
    inspiration: 'The gentle warmth of sunrise painting the sky in golden hues',
    usage: 'Ideal for lifestyle brands, morning routines apps, and positive messaging',
    category: 'Nature',
    tags: ['warm', 'optimistic', 'morning']
  },
  {
    id: '11',
    name: 'Aqua Pure',
    description: 'Clean, single-tone aqua for minimalist and pure designs',
    gradient: 'linear-gradient(#09f1b8, #09f1b8)',
    colors: ['#09f1b8'],
    inspiration: 'Crystal clear tropical waters and pure simplicity',
    usage: 'Great for clean interfaces, medical apps, and minimalist designs',
    category: 'Tech',
    tags: ['clean', 'minimal', 'pure']
  },
  {
    id: '12',
    name: 'Cotton Candy',
    description: 'Sweet pink and blue blend reminiscent of carnival treats',
    gradient: 'linear-gradient(142deg, #3fa1fb 0%, #fc46a8 100%)',
    colors: ['#3fa1fb', '#fc46a8'],
    inspiration: 'Fluffy cotton candy at summer carnivals and sweet childhood memories',
    usage: 'Perfect for entertainment brands, children apps, and playful interfaces',
    category: 'Creative',
    tags: ['sweet', 'playful', 'fun']
  },
  {
    id: '13',
    name: 'Aurora Dance',
    description: 'Multi-directional gradient with animated aurora-like movement',
    gradient: 'linear-gradient(-45deg, #09f1b8, #00a2ff, #ff00d2, #54B2C7)',
    colors: ['#09f1b8', '#00a2ff', '#ff00d2', '#54B2C7'],
    inspiration: 'Dancing northern lights across the arctic night sky',
    usage: 'Excellent for dynamic backgrounds, tech presentations, and modern interfaces',
    category: 'Tech',
    tags: ['animated', 'dynamic', 'modern']
  },
  {
    id: '14',
    name: 'Rainbow Bridge',
    description: 'Vibrant multi-color spectrum that spans the entire color wheel',
    gradient: 'linear-gradient(to right, #09f1b8, #00a2ff, #ff00d2, #fed90f)',
    colors: ['#09f1b8', '#00a2ff', '#ff00d2', '#fed90f'],
    inspiration: 'Natural rainbows bridging earth and sky after spring storms',
    usage: 'Perfect for diversity campaigns, creative portfolios, and celebration themes',
    category: 'Creative',
    tags: ['colorful', 'diverse', 'celebration']
  },
  {
    id: '15',
    name: 'Glass Frost',
    description: 'Subtle transparent overlay with frosted glass effect',
    gradient: 'linear-gradient(0deg, transparent 5%, rgba(255, 255, 255, .4))',
    colors: ['transparent', 'rgba(255, 255, 255, .4)'],
    inspiration: 'Morning frost on glass windows creating ethereal patterns',
    usage: 'Ideal for overlay effects, modal backgrounds, and glass morphism designs',
    category: 'Tech',
    tags: ['transparent', 'subtle', 'modern']
  },
  {
    id: '16',
    name: 'Crystal Layers',
    description: 'Complex layered glass effect with multiple transparency levels',
    gradient: 'linear-gradient(0deg, rgba(255, 255, 255, .1) 25%, rgba(255, 255, 255, .0) 30%, rgba(255, 255, 255, .0) 30%, rgba(255, 255, 255, .4) 70%, rgba(255, 255, 255, .6))',
    colors: ['rgba(255, 255, 255, .1)', 'rgba(255, 255, 255, .4)', 'rgba(255, 255, 255, .6)'],
    inspiration: 'Complex crystal formations with multiple refractive layers',
    usage: 'Perfect for premium interfaces, luxury brands, and sophisticated overlays',
    category: 'Luxury',
    tags: ['premium', 'complex', 'sophisticated']
  },
  {
    id: '17',
    name: 'Golden Rays',
    description: 'Repeating gold pattern with light and shadow interplay',
    gradient: 'repeating-linear-gradient(5deg, var(--gold) 0%, var(--light-shadow) 23%, var(--gold) 31%)',
    colors: ['var(--gold)', 'var(--light-shadow)'],
    inspiration: 'Sunlight filtering through venetian blinds creating golden stripes',
    usage: 'Excellent for luxury brands, award ceremonies, and premium presentations',
    category: 'Luxury',
    tags: ['gold', 'premium', 'elegant']
  },
  {
    id: '18',
    name: 'Golden Depths',
    description: 'Rich golden pattern with deep shadow contrasts',
    gradient: 'repeating-linear-gradient(105deg, var(--gold) 0%, var(--dark-shadow) 5%, var(--gold) 12%)',
    colors: ['var(--gold)', 'var(--dark-shadow)'],
    inspiration: 'Ancient golden artifacts with deep carved shadows',
    usage: 'Perfect for luxury products, historical themes, and premium branding',
    category: 'Luxury',
    tags: ['gold', 'rich', 'historical']
  },
  {
    id: '19',
    name: 'Pride Spectrum',
    description: 'Full rainbow spectrum with precise color band divisions',
    gradient: 'linear-gradient(#fd004c 16.7%, #fe9000 16.7%, #fe9000 33.4%, #fff020 33.4%, #fff020 50.1%, #3edf4b 50.1%, #3edf4b 66.8%, #3363ff 66.8%, #3363ff 83.5%, #b102b7 83.5%)',
    colors: ['#fd004c', '#fe9000', '#fff020', '#3edf4b', '#3363ff', '#b102b7'],
    inspiration: 'Natural rainbow with distinct color bands and perfect transitions',
    usage: 'Ideal for diversity initiatives, pride campaigns, and inclusive branding',
    category: 'Creative',
    tags: ['rainbow', 'inclusive', 'celebration']
  },
  {
    id: '20',
    name: 'Geometric Stripes',
    description: 'Multi-colored diagonal stripes with geometric precision',
    gradient: 'linear-gradient(219deg, var(--color-1) 0%, var(--color-1) 19%, transparent 19%, transparent 20%, var(--color-2) 20%, var(--color-2) 39%, transparent 39%, transparent 40%, var(--color-3) 40%, var(--color-3) 59%, transparent 59%, transparent 60%, var(--color-4) 60%, var(--color-4) 79%, transparent 79%, transparent 80%, var(--color-5) 80%)',
    colors: ['var(--color-1)', 'var(--color-2)', 'var(--color-3)', 'var(--color-4)', 'var(--color-5)'],
    inspiration: 'Geometric abstract art with precise angular divisions',
    usage: 'Perfect for modern art galleries, design studios, and creative portfolios',
    category: 'Creative',
    tags: ['geometric', 'modern', 'artistic']
  },
  {
    id: '21',
    name: 'Mystic Purple',
    description: 'Deep purple tones with mystical pink accents',
    gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7, #fd79a8)',
    colors: ['#a29bfe', '#6c5ce7', '#fd79a8'],
    inspiration: 'Mystical twilight skies filled with purple clouds and pink horizons',
    usage: 'Great for spiritual apps, meditation platforms, and mystical branding',
    category: 'Wellness',
    tags: ['mystical', 'spiritual', 'twilight']
  },
  {
    id: '22',
    name: 'Electric Storm',
    description: 'High-energy electric blue with storm-like intensity',
    gradient: 'linear-gradient(45deg, #667eea, #764ba2, #6b73ff)',
    colors: ['#667eea', '#764ba2', '#6b73ff'],
    inspiration: 'Lightning strikes illuminating storm clouds in electric blue',
    usage: 'Perfect for gaming platforms, energy drinks, and high-tech products',
    category: 'Tech',
    tags: ['electric', 'intense', 'gaming']
  },
  {
    id: '23',
    name: 'Coral Reef',
    description: 'Vibrant coral and ocean blue mimicking underwater ecosystems',
    gradient: 'linear-gradient(120deg, #ff9a9e, #fecfef, #fecfef)',
    colors: ['#ff9a9e', '#fecfef'],
    inspiration: 'Thriving coral reefs with their vibrant pink and blue colors',
    usage: 'Ideal for marine conservation, travel apps, and tropical themes',
    category: 'Nature',
    tags: ['coral', 'marine', 'tropical']
  },
  {
    id: '24',
    name: 'Cyber Neon',
    description: 'Futuristic neon gradient perfect for cyberpunk aesthetics',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
    colors: ['#667eea', '#764ba2', '#f093fb'],
    inspiration: 'Neon lights in futuristic cityscapes and cyberpunk atmospheres',
    usage: 'Perfect for gaming interfaces, tech startups, and futuristic designs',
    category: 'Tech',
    tags: ['neon', 'futuristic', 'cyberpunk']
  },
  {
    id: '25',
    name: 'Summer Sunset',
    description: 'Warm summer evening colors with golden hour magic',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140, #f093fb)',
    colors: ['#fa709a', '#fee140', '#f093fb'],
    inspiration: 'Perfect summer sunsets with warm golden light and pink clouds',
    usage: 'Great for travel brands, vacation apps, and lifestyle photography',
    category: 'Travel',
    tags: ['summer', 'sunset', 'vacation']
  },
  {
    id: '26',
    name: 'Forest Morning',
    description: 'Fresh morning greens with dew-kissed natural tones',
    gradient: 'linear-gradient(135deg, #56ab2f, #a8e6cf, #88d8a3)',
    colors: ['#56ab2f', '#a8e6cf', '#88d8a3'],
    inspiration: 'Early morning forest walks with fresh dew on green leaves',
    usage: 'Perfect for eco brands, health apps, and outdoor adventures',
    category: 'Nature',
    tags: ['fresh', 'morning', 'eco']
  },
  {
    id: '27',
    name: 'Royal Velvet',
    description: 'Rich royal purple with luxurious velvet-like depth',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2, #a29bfe)',
    colors: ['#667eea', '#764ba2', '#a29bfe'],
    inspiration: 'Royal velvet curtains in ancient palaces with deep purple tones',
    usage: 'Ideal for luxury brands, premium services, and royal themes',
    category: 'Luxury',
    tags: ['royal', 'luxury', 'premium']
  },
  {
    id: '28',
    name: 'Arctic Ice',
    description: 'Cool arctic tones with crystalline ice-like transparency',
    gradient: 'linear-gradient(135deg, #74b9ff, #0984e3, #a29bfe)',
    colors: ['#74b9ff', '#0984e3', '#a29bfe'],
    inspiration: 'Pristine arctic glaciers with crystalline blue ice formations',
    usage: 'Perfect for clean tech, winter sports, and arctic expeditions',
    category: 'Nature',
    tags: ['arctic', 'cool', 'pristine']
  },
  {
    id: '29',
    name: 'Vintage Gold',
    description: 'Warm vintage gold with antique brass undertones',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c, #fed90f)',
    colors: ['#f093fb', '#f5576c', '#fed90f'],
    inspiration: 'Antique gold jewelry with warm brass and copper accents',
    usage: 'Great for vintage brands, antique shops, and heritage products',
    category: 'Luxury',
    tags: ['vintage', 'antique', 'heritage']
  }
];