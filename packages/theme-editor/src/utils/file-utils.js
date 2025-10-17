import { join } from 'path';
import { readdirSync, statSync } from 'fs';

/**
 * Función auxiliar para búsqueda recursiva limitada de archivos
 * @param {string} dir - Directorio donde buscar
 * @param {string} filename - Nombre del archivo a buscar
 * @param {number} maxDepth - Profundidad máxima de búsqueda
 * @returns {string|null} - Ruta del archivo encontrado o null
 */
export function searchRecursively(dir, filename, maxDepth) {
  if (maxDepth <= 0) return null;

  try {
    const items = readdirSync(dir);

    // Buscar el archivo en el directorio actual
    if (items.includes(filename)) {
      const filePath = join(dir, filename);
      if (statSync(filePath).isFile()) {
        return filePath;
      }
    }

    // Buscar en subdirectorios
    for (const item of items) {
      const itemPath = join(dir, item);
      try {
        if (statSync(itemPath).isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          const found = searchRecursively(itemPath, filename, maxDepth - 1);
          if (found) return found;
        }
      } catch (error) {
        // Ignorar errores de permisos en subdirectorios
        continue;
      }
    }
  } catch (error) {
    // Ignorar errores de permisos
    return null;
  }

  return null;
}

/**
 * Busca múltiples archivos de manera recursiva
 * @param {string} dir - Directorio donde buscar
 * @param {string[]} filenames - Array de nombres de archivos a buscar
 * @param {number} maxDepth - Profundidad máxima de búsqueda
 * @returns {Object} - Objeto con nombres de archivo como claves y rutas como valores
 */
export function searchMultipleFiles(dir, filenames, maxDepth) {
  const results = {};

  for (const filename of filenames) {
    const found = searchRecursively(dir, filename, maxDepth);
    if (found) {
      results[filename] = found;
    }
  }

  return results;
}

/**
 * Busca archivos por patrón/extensión
 * @param {string} dir - Directorio donde buscar
 * @param {string} pattern - Patrón de archivo (ej: "*.css", "globals.*")
 * @param {number} maxDepth - Profundidad máxima de búsqueda
 * @returns {string[]} - Array de rutas encontradas
 */
export function searchByPattern(dir, pattern, maxDepth) {
  const results = [];

  if (maxDepth <= 0) return results;

  try {
    const items = readdirSync(dir);

    // Convertir patrón a regex simple
    const regex = new RegExp(
      pattern
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.*')
    );

    // Buscar archivos que coincidan con el patrón
    for (const item of items) {
      const itemPath = join(dir, item);

      try {
        const stat = statSync(itemPath);

        if (stat.isFile() && regex.test(item)) {
          results.push(itemPath);
        } else if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          // Buscar recursivamente en subdirectorios
          const subResults = searchByPattern(itemPath, pattern, maxDepth - 1);
          results.push(...subResults);
        }
      } catch (error) {
        // Ignorar errores de permisos
        continue;
      }
    }
  } catch (error) {
    // Ignorar errores de permisos en directorio
  }

  return results;
}