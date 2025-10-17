/**
 * Patrones para identificar diferentes tipos de variables CSS
 * Configuración centralizada para la detección de tipos de variables
 */

/**
 * Patrones para identificar diferentes tipos de variables CSS
 * @type {Object.<string, {namePatterns: RegExp[], valuePatterns: RegExp[]}>}
 */
export const VARIABLE_PATTERNS = {
  // Colores - patrones más amplios para detectar variables de color
  color: {
    namePatterns: [
      /^--color-/i,
      /^--tone-/i,
      /^--tint-/i,
      /^--bg-/i,
      /^--text-/i,
      /^--border-color/i,  // Más específico para border-color
      /^--shadow-color/i,  // Más específico para shadow-color
      /-color$/i,
      /-bg$/i,
      /-text$/i,
      // Patrones específicos para variables de color comunes
      /^--foreground$/i,
      /^--background$/i,
      /^--surface$/i,
      /^--primary$/i,
      /^--secondary$/i,
      /^--accent$/i,
      /^--muted$/i,
      /^--destructive$/i,
      /^--warning$/i,
      /^--success$/i,
      /^--info$/i,
      /^--border$/i,     // Border suele ser un color
      /^--ring$/i,       // Ring suele ser un color
      /^--input$/i,      // Input suele ser un color de fondo
      /-foreground$/i,
      /-background$/i,
      /-surface$/i,
      /-primary$/i,
      /-secondary$/i,
      /-accent$/i,
      /-muted$/i,
      /-destructive$/i,
      /-warning$/i,
      /-success$/i,
      /-info$/i
    ],
    valuePatterns: [
      /^#[0-9a-f]{3,8}$/i,              // Hex colors: #fff, #ffffff, #ffffff80
      /^oklch\(/i,                      // OKLCH: oklch(0.5 0.2 120)
      /^rgb\(/i,                        // RGB: rgb(255, 255, 255)
      /^rgba\(/i,                       // RGBA: rgba(255, 255, 255, 0.5)
      /^hsl\(/i,                        // HSL: hsl(120, 100%, 50%)
      /^hsla\(/i,                       // HSLA: hsla(120, 100%, 50%, 0.5)
      // Valores HSL sin función (para variables tint)
      /^\d+(\.\d+)?\s+\d+%\s+\d+%\s*(\d+%)?$/i,  // HSL valores: "240 100% 50%" o "240 100% 50% 50%"
      /^\d+(\.\d+)?\s+\d+%\s+\d+(\.\d+)?%?.*$/i, // HSL parciales: "222.2 84% 4.9% foreground)"
      /^var\(--.*color.*\)$/i,          // Referencias a otras variables de color
      /^var\(--.*tone.*\)$/i,           // Referencias a variables tone
      /^var\(--.*tint.*\)$/i,           // Referencias a variables tint
      /^var\(--.*foreground.*\)$/i,     // Referencias a variables foreground
      /^var\(--.*background.*\)$/i,     // Referencias a variables background
      /^var\(--.*surface.*\)$/i,        // Referencias a variables surface
      /^var\(--.*primary.*\)$/i,        // Referencias a variables primary
      /^var\(--.*secondary.*\)$/i,      // Referencias a variables secondary
      /^var\(--.*accent.*\)$/i,         // Referencias a variables accent
      /^var\(--.*muted.*\)$/i,          // Referencias a variables muted
      /^var\(--.*destructive.*\)$/i,    // Referencias a variables destructive
      /^var\(--.*warning.*\)$/i,        // Referencias a variables warning
      /^var\(--.*success.*\)$/i,        // Referencias a variables success
      /^var\(--.*info.*\)$/i,           // Referencias a variables info
      /^var\(--.*ambient.*\)$/i,        // Referencias a variables ambient
      /^(transparent|currentColor)$/i,   // Palabras clave de color CSS
      // Colores CSS estándar comunes (más completo)
      /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/i
    ]
  },

  // Espaciado - padding, margin, gap, etc.
  spacing: {
    namePatterns: [
      /^--spacing-/i,
      /^--gap-/i,
      /^--padding-/i,
      /^--margin-/i,
      /^--space-/i,
      /-spacing$/i,
      /-gap$/i,
      /-padding$/i,
      /-margin$/i,
      /-space$/i
    ],
    valuePatterns: [
      /^\d+(\.\d+)?(px|em|rem|%|vh|vw|ch|ex|cm|mm|in|pt|pc)$/i,
      /^calc\(/i,
      /^var\(--.*space.*\)$/i,
      /^var\(--.*gap.*\)$/i
    ]
  },

  // Tipografía - font-size, line-height, font-weight, etc.
  typography: {
    namePatterns: [
      /^--font-/i,
      /^--text-size/i,    // Más específico
      /^--text-weight/i,  // Más específico
      /^--line-height/i,
      /^--letter-spacing/i,
      /-font$/i,
      /-typography$/i
    ],
    valuePatterns: [
      /^\d+(\.\d+)?(px|em|rem|%|ex|ch|pt)$/i,  // Tamaños de fuente
      /^(normal|bold|bolder|lighter|[1-9]00)$/i, // Font weights específicos
      /^(serif|sans-serif|monospace|cursive|fantasy)$/i, // Font families genéricas
      /^"[^"]+"|'[^']+'$/,                     // Font families con comillas
      /^[a-z]+(\s*,\s*(serif|sans-serif|monospace|cursive|fantasy))$/i, // Font families con fallback
      /^(inherit|initial|unset|revert)$/i      // Valores CSS de herencia
    ]
  },

  // Bordes - border-width, border-radius, etc.
  border: {
    namePatterns: [
      /^--border-/i,
      /^--radius-/i,
      /^--rounded-/i,
      /-border$/i,
      /-radius$/i,
      /-rounded$/i
    ],
    valuePatterns: [
      /^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/i,
      /^(thin|medium|thick)$/i,
      /^(solid|dashed|dotted|double|groove|ridge|inset|outset|none)$/i
    ]
  },

  // Sombras - box-shadow, text-shadow, etc.
  shadow: {
    namePatterns: [
      /^--shadow-/i,
      /^--elevation-/i,
      /-shadow$/i,
      /-elevation$/i
    ],
    valuePatterns: [
      /^\d+(\.\d+)?(px|em|rem)\s+\d+(\.\d+)?(px|em|rem)/i, // Valores de sombra básicos
      /rgba?\(/i, // Valores con rgba/rgb (común en shadows)
      /^\d+(\.\d+)?(px|em|rem)\s+\d+(\.\d+)?(px|em|rem)\s+\d+(\.\d+)?(px|em|rem)/i, // x y blur
      /^none$/i
    ]
  }
};

/**
 * Lista de tipos de variables soportados
 * @type {string[]}
 */
export const VARIABLE_TYPES = Object.keys(VARIABLE_PATTERNS);

/**
 * Obtiene los patrones para un tipo específico de variable
 * @param {string} type - Tipo de variable ('color', 'spacing', etc.)
 * @returns {Object|null} - Patrones para el tipo o null si no existe
 */
export function getPatternsByType(type) {
  return VARIABLE_PATTERNS[type] || null;
}

/**
 * Verifica si un tipo de variable es válido
 * @param {string} type - Tipo a verificar
 * @returns {boolean} - true si el tipo es válido
 */
export function isValidVariableType(type) {
  return VARIABLE_TYPES.includes(type);
}