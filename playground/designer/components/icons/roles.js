// ------------------------------------------------------------------
// Icon role registry — runtime copy of data/icon-roles.json.
// Semantic role → Lucide glyph (PascalCase, lucide@0.525.0).
// Components reference ROLES, never raw glyph names. Keep in sync
// with the JSON (the JSON is the documented source of truth).
// ------------------------------------------------------------------

export const ICON_ROLE_GROUPS = {
  Tools: {
    select: 'MousePointer2', move: 'Move', hand: 'Hand', frame: 'Frame',
    rectangle: 'Square', ellipse: 'Circle', line: 'Minus', polygon: 'Pentagon',
    star: 'Star', pen: 'PenTool', pencil: 'Pencil', text: 'Type',
    image: 'Image', comment: 'MessageSquare', crop: 'Crop',
    eyedropper: 'Pipette', measure: 'Ruler', 'zoom-in': 'ZoomIn', 'zoom-out': 'ZoomOut',
  },
  Layers: {
    layers: 'Layers', group: 'Group', component: 'Component', shape: 'Shapes',
    visible: 'Eye', hidden: 'EyeOff', locked: 'Lock', unlocked: 'LockOpen',
    expand: 'ChevronRight', collapse: 'ChevronDown', drag: 'GripVertical',
  },
  Panels: {
    'panel-layers': 'Layers', 'panel-assets': 'Blocks', 'panel-tokens': 'SwatchBook',
    'panel-data': 'Database', 'panel-plugins': 'Puzzle', pages: 'File',
    settings: 'Settings2', search: 'Search',
  },
  Fields: {
    'field-text': 'Type', 'field-richtext': 'AlignLeft', 'field-number': 'Hash',
    'field-boolean': 'ToggleLeft', 'field-image': 'Image', 'field-select': 'List',
    'field-date': 'Calendar', 'field-color': 'Palette', 'field-url': 'Link',
  },
  Data: {
    data: 'Database', collection: 'Table2', record: 'Rows3',
    bind: 'Link2', unbind: 'Unlink', refresh: 'RefreshCw',
  },
  Transform: {
    'align-left': 'AlignStartVertical', 'align-center-h': 'AlignCenterVertical', 'align-right': 'AlignEndVertical',
    'align-top': 'AlignStartHorizontal', 'align-center-v': 'AlignCenterHorizontal', 'align-bottom': 'AlignEndHorizontal',
    'distribute-h': 'AlignHorizontalDistributeCenter', 'distribute-v': 'AlignVerticalDistributeCenter',
    rotate: 'RotateCw', 'flip-h': 'FlipHorizontal2', 'flip-v': 'FlipVertical2', radius: 'Radius',
  },
  Text: {
    bold: 'Bold', italic: 'Italic', underline: 'Underline', strikethrough: 'Strikethrough',
    'text-left': 'AlignLeft', 'text-center': 'AlignCenter', 'text-right': 'AlignRight',
    'line-height': 'UnfoldVertical', 'letter-spacing': 'UnfoldHorizontal',
  },
  Properties: {
    fill: 'PaintBucket', stroke: 'Brush', opacity: 'Blend', gradient: 'Droplet',
    effects: 'Sparkles', adjust: 'SlidersHorizontal',
  },
  Devices: {
    'device-desktop': 'Monitor', 'device-laptop': 'Laptop', 'device-tablet': 'Tablet',
    'device-phone': 'Smartphone', 'device-watch': 'Watch',
  },
  Prototype: {
    click: 'MousePointerClick', connection: 'Spline', transition: 'ArrowLeftRight',
    delay: 'Timer', easing: 'TrendingUp',
  },
  Chrome: {
    add: 'Plus', remove: 'Minus', close: 'X', check: 'Check',
    'chevron-up': 'ChevronUp', 'chevron-down': 'ChevronDown', 'chevron-left': 'ChevronLeft', 'chevron-right': 'ChevronRight',
    'chevrons-updown': 'ChevronsUpDown', more: 'Ellipsis', menu: 'Menu',
    duplicate: 'Copy', delete: 'Trash2', edit: 'SquarePen',
    undo: 'Undo2', redo: 'Redo2', history: 'History',
    download: 'Download', upload: 'Upload', play: 'Play',
    link: 'Link', external: 'ExternalLink',
    info: 'Info', warning: 'TriangleAlert', error: 'CircleAlert', help: 'CircleHelp',
    keyboard: 'Keyboard', theme: 'SunMoon', sidebar: 'PanelLeft', inspector: 'PanelRight',
    'zoom-fit': 'Maximize', code: 'Code', grid: 'LayoutGrid', folder: 'Folder',
    'file-text': 'FileText', package: 'Package', users: 'Users', quote: 'Quote',
    calendar: 'Calendar', clock: 'Clock',
  },
};

// Flat map: role → glyph
export const ICON_ROLES = Object.assign({}, ...Object.values(ICON_ROLE_GROUPS));
