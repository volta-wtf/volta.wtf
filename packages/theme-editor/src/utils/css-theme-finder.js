import { dirname, join, resolve, basename } from 'path';
import { existsSync, readFileSync } from 'fs';
import { findGlobalsCss } from './css-finder.js';
import { findMonorepoRoot } from './monorepo-detector.js';
import { DEV } from '../config/constants.js';

/** Cuenta variables en bloques :root / .dark / .light sin importar css-parser. */
function countThemeVariables(cssContent) {
  let count = 0;
  const blockRe = /(?::root|\.dark|\.light)\s*\{([^}]*)\}/g;
  let block;
  while ((block = blockRe.exec(cssContent)) !== null) {
    count += (block[1].match(/--[\w-]+\s*:/g) || []).length;
  }
  return count;
}

const SKIP_IMPORTS = new Set(['tailwindcss', 'tw-animate-css']);

/**
 * @param {string} cssContent
 * @returns {string[]}
 */
export function extractCssImports(cssContent) {
  const imports = [];
  // Soporta @import con modificadores Tailwind v4: layer(theme), supports(...), etc.
  const importRe = /@import\s+(?:url\(\s*)?['"]?([^'");\s]+)['"]?\s*\)?[^;]*;/g;
  let match;

  while ((match = importRe.exec(cssContent)) !== null) {
    const specifier = match[1].trim();
    if (!specifier || SKIP_IMPORTS.has(specifier) || specifier.startsWith('tailwindcss')) continue;
    imports.push(specifier);
  }

  return imports;
}

/**
 * Resuelve un import de paquete (@scope/pkg/subpath) usando package.json exports.
 * @param {string} specifier - p.ej. @registry/styles/shadcnui.css
 * @param {string} projectRoot
 * @returns {string|null}
 */
function resolvePackageImport(specifier, projectRoot) {
  const match = specifier.match(/^@([^/]+)\/([^/]+)\/(.+)$/);
  if (!match) return null;

  const [, scope, name, subpath] = match;
  const pkgDir = join(projectRoot, 'node_modules', `@${scope}`, name);
  const pkgJsonPath = join(pkgDir, 'package.json');

  if (existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
      const exportKey = subpath ? `./${subpath}` : '.';
      const target = pkg.exports?.[exportKey] ?? pkg.exports?.[`./${subpath}`];
      if (target) {
        const resolved = resolve(pkgDir, target);
        if (existsSync(resolved)) return resolved;
      }
      const direct = join(pkgDir, subpath);
      if (existsSync(direct)) return direct;
    } catch {
      // seguir con fallback monorepo
    }
  }

  const monoRoot = findMonorepoRoot(projectRoot);
  if (monoRoot) {
    const registryDir = join(monoRoot, 'registry', name);
    const registryPkg = join(registryDir, 'package.json');
    if (existsSync(registryPkg)) {
      try {
        const pkg = JSON.parse(readFileSync(registryPkg, 'utf8'));
        const exportKey = subpath ? `./${subpath}` : '.';
        const target = pkg.exports?.[exportKey];
        if (target) {
          const resolved = resolve(registryDir, target);
          if (existsSync(resolved)) return resolved;
        }
      } catch {
        // ignorar
      }
    }
  }

  return null;
}

/**
 * @param {string} specifier
 * @param {string} globalsPath
 * @param {string} projectRoot
 * @returns {string|null}
 */
function resolveCssImport(specifier, globalsPath, projectRoot) {
  if (specifier.startsWith('@')) {
    return resolvePackageImport(specifier, projectRoot);
  }

  if (specifier.startsWith('.')) {
    const resolved = resolve(dirname(globalsPath), specifier);
    return existsSync(resolved) ? resolved : null;
  }

  return null;
}

/**
 * Todos los archivos CSS con variables de tema (globals + imports resueltos).
 * @param {string} projectRoot
 * @returns {string[]}
 */
export function findThemeCssFiles(projectRoot) {
  if (process.env.THEME_EDITOR_CSS) {
    const candidates = [
      resolve(projectRoot, process.env.THEME_EDITOR_CSS),
      resolve(process.env.THEME_EDITOR_CSS),
    ];
    for (const path of candidates) {
      if (existsSync(path)) {
        console.log(`${DEV.LOG_PREFIXES.SUCCESS} THEME_EDITOR_CSS: ${path}`);
        return [path];
      }
    }
  }

  const globalsPath = findGlobalsCss(projectRoot);
  const globalsContent = readFileSync(globalsPath, 'utf8');
  const globalsVarCount = countThemeVariables(globalsContent);

  if (globalsVarCount > 0) {
    console.log(`${DEV.LOG_PREFIXES.SUCCESS} Variables en ${basename(globalsPath)} (${globalsVarCount})`);
    return [globalsPath];
  }

  console.log(
    `${DEV.LOG_PREFIXES.INFO} ${basename(globalsPath)} sin variables; resolviendo @import...`
  );

  const imports = extractCssImports(globalsContent);
  const themeFiles = [];

  for (const specifier of imports) {
    const resolved = resolveCssImport(specifier, globalsPath, projectRoot);
    if (!resolved) {
      console.log(`${DEV.LOG_PREFIXES.WARNING} No resuelto: ${specifier}`);
      continue;
    }

    const content = readFileSync(resolved, 'utf8');
    const count = countThemeVariables(content);

    console.log(`${DEV.LOG_PREFIXES.FILE} ${specifier} → ${resolved} (${count} vars)`);

    if (count > 0) {
      themeFiles.push(resolved);
    }
  }

  if (themeFiles.length > 0) {
    console.log(`${DEV.LOG_PREFIXES.SUCCESS} Archivos de tema: ${themeFiles.join(', ')}`);
    return themeFiles;
  }

  console.log(`${DEV.LOG_PREFIXES.WARNING} Sin imports con variables; usando ${globalsPath}`);
  return [globalsPath];
}

/**
 * Archivo CSS principal de tema (el primero con variables).
 * @param {string} projectRoot
 * @returns {string}
 */
export function findThemeCss(projectRoot) {
  return findThemeCssFiles(projectRoot)[0];
}
