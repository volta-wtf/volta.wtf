/**
 * Constantes centralizadas del Theme Editor
 */

// ---- Configuración de Red ----
export const NETWORK = {
  DEFAULT_PORT: 4444,
  DEFAULT_HOST: 'localhost',
  DEFAULT_PROTOCOL: 'http',

  // URLs completas por defecto
  get DEFAULT_SERVER_URL() {
    const port = process.env.THEME_EDITOR_PORT || this.DEFAULT_PORT;
    return `${this.DEFAULT_PROTOCOL}://${this.DEFAULT_HOST}:${port}`;
  },

  get DEFAULT_SCRIPT_URL() {
    return `${this.DEFAULT_SERVER_URL}/theme-editor.js`;
  }
};

// ---- Endpoints de API ----
export const API_ENDPOINTS = {
  SAVE_CSS: '/save-css',
  DEBUG_CSS: '/debug-css',
  DEBUG_STYLESHEETS: '/debug-stylesheets',
  GET_VARIABLES: '/api/variables',
  STATUS: '/status'
};

// ---- Configuración de UI ----
export const UI = {
  NOTIFICATION_DURATION: 3000, // ms
  LOADING_DEBOUNCE: 100, // ms

  COLORS: {
    SUCCESS: '#10b981',
    ERROR: '#ef4444',
    WARNING: '#f59e0b',
    INFO: '#3b82f6'
  }
};

// ---- Configuración de CSS ----
export const CSS = {
  VARIABLE_PATTERNS: {
    CUSTOM_PROPERTY: /--[\w-]+/g,
    VARIABLE_DECLARATION: /--[\w-]+\s*:\s*[^;]+/g
  },

  SELECTORS: {
    ROOT: ':root',
    DARK: '.dark',
    LIGHT: '.light'
  },

  FILE_NAMES: {
    GLOBALS: 'globals.css',
    THEME_EDITOR_SCRIPT: 'theme-editor.js'
  }
};

// ---- Configuración de Desarrollo ----
export const DEV = {
  MAX_PREVIEW_VARIABLES: 10,
  MAX_CSS_PREVIEW_LENGTH: 500,
  BUILD_TIMEOUT: 30000, // ms

  LOG_PREFIXES: {
    SUCCESS: '✅',
    ERROR: '❌',
    WARNING: '⚠️',
    INFO: '🔍',
    SAVE: '💾',
    THEME: '🎨',
    PORT: '🔌',
    FILE: '📄',
    SEARCH: '🎯'
  }
};

// ---- Configuración de Archivos ----
export const FILES = {
  SEARCH_DEPTH: 2,
  SEARCH_DIRECTORIES: ['src', 'app', 'styles'],

  POSSIBLE_CSS_PATHS: [
    // Next.js App Router (más común)
    'src/app/globals.css',
    'app/globals.css',
    // Ubicaciones tradicionales
    'src/styles/globals.css',
    'styles/globals.css',
    // Otras ubicaciones comunes
    'src/globals.css',
    'public/globals.css',
    'assets/globals.css',
    'src/assets/globals.css'
  ]
};