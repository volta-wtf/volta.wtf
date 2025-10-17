import { join } from 'path';
import { existsSync } from 'fs';
import { searchRecursively } from './file-utils.js';
import { CSS, FILES, DEV } from '../config/constants.js';

/**
 * Función simplificada para buscar globals.css SOLO en la app actual
 * @param {string} startDir - Directorio inicial de búsqueda (por defecto: process.cwd())
 * @returns {string} - Ruta al archivo globals.css encontrado
 * @throws {Error} - Si no se encuentra el archivo globals.css
 */
export function findGlobalsCss(startDir = process.cwd()) {
  console.log(`${DEV.LOG_PREFIXES.SEARCH} Buscando ${CSS.FILE_NAMES.GLOBALS} SOLO en la app actual: ${startDir}`);

  // Rutas prioritarias para la app actual únicamente (usando constantes)
  const possiblePaths = FILES.POSSIBLE_CSS_PATHS.map(path => join(startDir, path));

  // Verificar rutas directas
  for (const path of possiblePaths) {
    if (existsSync(path)) {
      console.log(`${DEV.LOG_PREFIXES.SUCCESS} Archivo ${CSS.FILE_NAMES.GLOBALS} encontrado en: ${path}`);
      return path;
    }
  }

  // Búsqueda recursiva limitada SOLO en la app actual
  console.log(`${DEV.LOG_PREFIXES.INFO} Búsqueda recursiva en la app actual...`);

  for (const searchDirName of FILES.SEARCH_DIRECTORIES) {
    const dirPath = join(startDir, searchDirName);
    if (existsSync(dirPath)) {
      const found = searchRecursively(dirPath, CSS.FILE_NAMES.GLOBALS, FILES.SEARCH_DEPTH);
      if (found) {
        console.log(`${DEV.LOG_PREFIXES.SUCCESS} Archivo ${CSS.FILE_NAMES.GLOBALS} encontrado: ${found}`);
        return found;
      }
    }
  }

  const pathsChecked = FILES.POSSIBLE_CSS_PATHS.slice(0, 4).map(path => `  - ${startDir}/${path}`).join('\n');

  throw new Error(`${DEV.LOG_PREFIXES.ERROR} No se encontró ${CSS.FILE_NAMES.GLOBALS} en la app actual: ${startDir}

📍 Ubicaciones verificadas:
${pathsChecked}

💡 Asegúrate de que el archivo ${CSS.FILE_NAMES.GLOBALS} existe en esta app específica.
💡 Para soporte multi-app/monorepo, usa las funciones en utils/monorepo-detector.js`);
}

/**
 * Verifica si existe un archivo globals.css en el directorio especificado
 * @param {string} dir - Directorio a verificar
 * @returns {boolean} - true si existe globals.css
 */
export function hasGlobalsCss(dir) {
  const possiblePaths = FILES.POSSIBLE_CSS_PATHS.slice(0, 4).map(path => join(dir, path));
  return possiblePaths.some(path => existsSync(path));
}

/**
 * Obtiene la ruta del globals.css sin lanzar error
 * @param {string} startDir - Directorio inicial de búsqueda
 * @returns {string|null} - Ruta al archivo o null si no se encuentra
 */
export function findGlobalsCssSafe(startDir = process.cwd()) {
  try {
    return findGlobalsCss(startDir);
  } catch (error) {
    console.warn(`${DEV.LOG_PREFIXES.WARNING} No se pudo encontrar ${CSS.FILE_NAMES.GLOBALS} en: ${startDir}`);
    return null;
  }
}