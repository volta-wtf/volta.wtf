// Shared demo data + JSON loader (plain script — runs before the JSX files).
window.EDITOR_DATA = {
  users: [
    { name: 'Maya Lindqvist' }, { name: 'Diego Ferrer' }, { name: 'Ana Kovač' },
    { name: 'Tom Okafor' }, { name: 'Iris Chen' },
  ],
  // Canvas frames for the Design screen
  frames: {
    cover: { x: 0, y: 0, w: 420, h: 300, name: 'Cover' },
    detail: { x: 480, y: 0, w: 300, h: 300, name: 'Detail' },
    card: { x: 0, y: 360, w: 260, h: 180, name: 'Product card' },
  },
  layers: [
    { id: 'cover', name: 'Cover', type: 'frame', children: [
      { id: 'cover-title', name: 'Title', type: 'text', binding: 'title' },
      { id: 'cover-media', name: 'Media', type: 'image' },
      { id: 'cover-bg', name: 'Backdrop', type: 'rectangle' },
    ]},
    { id: 'detail', name: 'Detail', type: 'frame', children: [
      { id: 'detail-img', name: 'Photo', type: 'image', binding: 'image' },
      { id: 'detail-price', name: 'Price', type: 'text', binding: 'price' },
    ]},
    { id: 'card', name: 'Product card', type: 'component', children: [
      { id: 'card-name', name: 'Name', type: 'text' },
      { id: 'card-cta', name: 'Buy button', type: 'shape' },
    ]},
  ],
  pages: [{ id: 'p1', name: 'Page 1' }, { id: 'p2', name: 'Exploration' }],
  slides: [
    { id: 's1', name: 'Title', kind: 'title', title: 'Designer', sub: 'Components for building design tools' },
    { id: 's2', name: 'Problem', kind: 'body', title: 'The canvas should disappear', bullets: ['Gray, quiet chrome', 'The work is the loudest thing', 'Every control 28px'] },
    { id: 's3', name: 'Data', kind: 'body', title: 'Collections on canvas', bullets: ['Bind a layer to a field', 'Repeat frames over records', 'Real content drives layout'] },
    { id: 's4', name: 'Close', kind: 'title', title: 'Keyboard first', sub: 'V · F · R · T — and ⌘K for the rest' },
  ],
  stickies: [
    { id: 'n1', x: 40, y: 40, color: 'oklch(0.92 0.06 95)', text: 'Idea: bind opacity to stock level' },
    { id: 'n2', x: 250, y: 90, color: 'oklch(0.90 0.05 150)', text: 'Ship the unit system first' },
    { id: 'n3', x: 120, y: 240, color: 'oklch(0.90 0.05 250)', text: '⌘K everything' },
  ],
  // Fallbacks if fetch() fails (file:// / offline)
  fallback: {
    products: {
      id: 'products', name: 'Products', icon: 'package',
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'price', label: 'Price', type: 'number', unit: '€' },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'category', label: 'Category', type: 'select' },
        { key: 'inStock', label: 'In stock', type: 'boolean' },
      ],
      records: [
        { id: 'p1', title: 'Arc Lounge Chair', price: 640, category: 'Seating', inStock: true },
        { id: 'p2', title: 'Slab Coffee Table', price: 420, category: 'Tables', inStock: true },
        { id: 'p3', title: 'Cone Floor Lamp', price: 210, category: 'Lighting', inStock: false },
        { id: 'p4', title: 'Grid Shelving Unit', price: 890, category: 'Storage', inStock: true },
        { id: 'p5', title: 'Puck Side Table', price: 180, category: 'Tables', inStock: true },
        { id: 'p6', title: 'Fold Desk Lamp', price: 120, category: 'Lighting', inStock: false },
      ],
    },
    blocks: [
      { id: 'navbar', name: 'Navbar', icon: 'menu', height: 64 },
      { id: 'hero', name: 'Hero', icon: 'star', height: 420 },
      { id: 'features', name: 'Features', icon: 'component', height: 320 },
      { id: 'gallery', name: 'Gallery', icon: 'image', height: 360 },
      { id: 'quote', name: 'Quote', icon: 'quote', height: 240 },
      { id: 'cta', name: 'CTA band', icon: 'play', height: 200 },
      { id: 'footer', name: 'Footer', icon: 'menu', height: 220 },
    ],
    keybindings: { groups: [
      { id: 'tools', name: 'Tools', commands: [
        { id: 'tool.select', title: 'Select', icon: 'select', keys: ['V'] },
        { id: 'tool.frame', title: 'Frame', icon: 'frame', keys: ['F'] },
        { id: 'tool.rectangle', title: 'Rectangle', icon: 'rectangle', keys: ['R'] },
        { id: 'tool.text', title: 'Text', icon: 'text', keys: ['T'] },
      ]},
      { id: 'file', name: 'File', commands: [
        { id: 'file.palette', title: 'Command palette', icon: 'search', keys: ['mod', 'K'] },
        { id: 'file.export', title: 'Export…', icon: 'download', keys: ['mod', 'shift', 'E'] },
      ]},
    ]},
    interactions: {
      triggers: [{ id: 'click', name: 'On click' }, { id: 'hover', name: 'While hovering' }],
      actions: [{ id: 'navigate', name: 'Navigate to' }, { id: 'overlay', name: 'Open overlay' }],
      transitions: [{ id: 'instant', name: 'Instant' }, { id: 'smart', name: 'Smart animate' }, { id: 'push', name: 'Push' }],
      easings: [{ id: 'ease-standard', name: 'Standard' }, { id: 'ease-out', name: 'Ease out' }],
      durations: { default: 240, min: 0, max: 2000, step: 20 },
    },
  },
};

// Load real JSON when served over http; merge onto fallbacks.
window.EDITOR_LOAD = function (cb) {
  var out = {
    products: window.EDITOR_DATA.fallback.products,
    blocks: window.EDITOR_DATA.fallback.blocks,
    keybindings: window.EDITOR_DATA.fallback.keybindings,
    interactions: window.EDITOR_DATA.fallback.interactions,
    shapes: [],
    gradients: [],
  };
  var jobs = [
    ['../../data/collections/products.json', function (d) { out.products = d; }],
    ['../../data/blocks.json', function (d) { out.blocks = d.blocks; }],
    ['../../data/keybindings.json', function (d) { out.keybindings = d; }],
    ['../../data/interactions.json', function (d) { out.interactions = d; }],
    ['../../data/shapes.json', function (d) { out.shapes = d.shapes; }],
    ['../../data/gradients.json', function (d) { out.gradients = d.presets; }],
  ];
  var left = jobs.length;
  jobs.forEach(function (j) {
    fetch(j[0]).then(function (r) { return r.json(); }).then(j[1]).catch(function () {})
      .finally(function () { left -= 1; if (left === 0) cb(out); });
  });
};
