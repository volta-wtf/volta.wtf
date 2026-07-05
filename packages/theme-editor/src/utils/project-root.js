import { join, resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { THEME_EDITOR_PORT_TO_APP } from '../config/constants.js';
import { hasGlobalsCss } from './css-finder.js';
import { findMonorepoRoot } from './monorepo-detector.js';

/**
 * Busca el package.json de una app Next (no el del theme-editor).
 * @param {string} startDir
 * @returns {string|null}
 */
export function findAppPackageRoot(startDir) {
  let dir = resolve(startDir);

  for (let i = 0; i < 12; i++) {
    const pkgPath = join(dir, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
        if (pkg.name === '@studio/theme-editor') {
          dir = join(dir, '..');
          continue;
        }
        const deps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
          ...pkg.peerDependencies,
        };
        if (deps.next) {
          return dir;
        }
      } catch {
        // ignorar package.json inválido
      }
    }
    const parent = join(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }

  return null;
}

/**
 * Raíz de la app cuyo CSS debe editar esta instancia del theme-editor.
 * Prioridad: THEME_EDITOR_PROJECT_ROOT → app Next en cwd → app por puerto en monorepo.
 */
export function getThemeEditorProjectRoot() {
  if (process.env.THEME_EDITOR_PROJECT_ROOT) {
    return resolve(process.env.THEME_EDITOR_PROJECT_ROOT);
  }

  const fromCwd = findAppPackageRoot(process.cwd());
  if (fromCwd && hasGlobalsCss(fromCwd)) {
    return fromCwd;
  }

  const port = parseInt(process.env.THEME_EDITOR_PORT || '', 10);
  const appRelative = port && THEME_EDITOR_PORT_TO_APP[port];
  if (appRelative) {
    const monoRoot =
      findMonorepoRoot(process.cwd()) ||
      (fromCwd ? findMonorepoRoot(fromCwd) : null);
    if (monoRoot) {
      const candidate = join(monoRoot, appRelative);
      if (hasGlobalsCss(candidate)) {
        return resolve(candidate);
      }
    }
  }

  return resolve(fromCwd || process.cwd());
}
