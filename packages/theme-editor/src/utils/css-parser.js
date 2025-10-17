import { readFileSync } from 'fs';
import { findGlobalsCss } from './css-finder.js';

/**
 * Parsea variables CSS de un archivo de texto
 * Detecta variables de múltiples temas y contextos
 * @param {string} cssContent - Contenido del archivo CSS
 * @returns {Object} - { variables: {}, sources: {} }
 */
export function parseVariablesFromCSS(cssContent) {
  const variables = {};
  const sources = {};

  // Buscar bloques de diferentes selectores
  const selectorPatterns = [
    { regex: /:root\s*\{([^{}]*)\}/g, selector: ':root', type: 'root' },
    { regex: /\.dark\s*\{([^{}]*)\}/g, selector: '.dark', type: 'dark-theme' },
    { regex: /\.light\s*\{([^{}]*)\}/g, selector: '.light', type: 'light-theme' }
  ];

  selectorPatterns.forEach(({ regex, selector, type }) => {
    let match;
    while ((match = regex.exec(cssContent)) !== null) {
      const declarations = match[1];
      const varRegex = /--([\w-]+)\s*:\s*([^;]+);?/g;

      let varMatch;
      while ((varMatch = varRegex.exec(declarations)) !== null) {
        const baseName = varMatch[1];
        const varValue = varMatch[2].trim();

        // Crear clave única para cada contexto/tema
        const varKey = selector === ':root'
          ? `--${baseName}`
          : `--${baseName}@${type}`;

        variables[varKey] = varValue;
        sources[varKey] = {
          selector,
          type,
          file: 'globals.css',
          baseName: `--${baseName}`, // Nombre base sin sufijo de tema
          isThemeSpecific: selector !== ':root'
        };
      }
    }
  });

  return { variables, sources };
}

/**
 * Lee y parsea variables CSS del archivo globals.css
 * @param {string} startDir - Directorio de inicio (opcional)
 * @returns {Object} - { variables: {}, sources: {}, filePath: string }
 */
export function extractVariablesFromGlobalsCss(startDir = process.cwd()) {
  try {
    // Usar css-finder para encontrar el archivo
    const globalsCssPath = findGlobalsCss(startDir);

    // Leer el contenido del archivo
    const cssContent = readFileSync(globalsCssPath, 'utf-8');

    // Parsear variables
    const { variables, sources } = parseVariablesFromCSS(cssContent);

    // Agregar información del archivo a los sources
    Object.keys(sources).forEach(varName => {
      sources[varName].filePath = globalsCssPath;
    });

    console.log(`✅ Extraídas ${Object.keys(variables).length} variables de: ${globalsCssPath}`);

    return {
      variables,
      sources,
      filePath: globalsCssPath
    };
  } catch (error) {
    console.error('❌ Error extrayendo variables del sistema de archivos:', error.message);
    return {
      variables: {},
      sources: {},
      filePath: null,
      error: error.message
    };
  }
}

/**
 * Obtiene todas las variables CSS de forma segura
 * @param {string} startDir - Directorio de inicio
 * @returns {Object} - Resultado con variables o información de error
 */
export function getVariablesFromFileSystem(startDir = process.cwd()) {
  const result = extractVariablesFromGlobalsCss(startDir);

  if (result.error) {
    console.warn(`⚠️ No se pudieron extraer variables: ${result.error}`);
    return {
      variables: {},
      sources: {},
      error: result.error
    };
  }

  return result;
}