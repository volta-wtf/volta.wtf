import { readFileSync } from 'fs';
import { basename } from 'path';
import { findThemeCssFiles } from './css-theme-finder.js';
import { getThemeEditorProjectRoot } from './project-root.js';

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
          file: 'theme.css',
          baseName: `--${baseName}`,
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
export function extractVariablesFromGlobalsCss(startDir = getThemeEditorProjectRoot()) {
  try {
    const themeCssPaths = findThemeCssFiles(startDir);
    const variables = {};
    const sources = {};

    for (const themeCssPath of themeCssPaths) {
      const cssContent = readFileSync(themeCssPath, 'utf-8');
      const parsed = parseVariablesFromCSS(cssContent);
      const fileName = basename(themeCssPath);

      Object.entries(parsed.variables).forEach(([varName, value]) => {
        variables[varName] = value;
        sources[varName] = {
          ...parsed.sources[varName],
          file: fileName,
          filePath: themeCssPath,
        };
      });
    }

    const filePath = themeCssPaths.join(', ');
    console.log(`✅ Extraídas ${Object.keys(variables).length} variables de: ${filePath}`);

    return {
      variables,
      sources,
      filePath
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
export function getVariablesFromFileSystem(startDir = getThemeEditorProjectRoot()) {
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