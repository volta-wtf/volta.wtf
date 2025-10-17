
import { join } from 'path';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';

/**
 * Detecta si el proyecto usa @workspace/ui o está en un monorepo
 * @param {string} startDir - Directorio inicial de búsqueda
 * @returns {boolean} - true si detecta uso de @workspace/ui
 */
export function detectWorkspaceUIUsage(startDir) {
    try {
        // Buscar package.json en el directorio actual y algunos niveles arriba
        let currentDir = startDir;
        for (let i = 0; i < 3; i++) {
            const packageJsonPath = join(currentDir, 'package.json');
            if (existsSync(packageJsonPath)) {
                try {
                    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
                    const deps = {
                        ...packageJson.dependencies,
                        ...packageJson.devDependencies,
                        ...packageJson.peerDependencies
                    };

                    // Verificar si usa @workspace/ui o similar
                    if (deps['@workspace/ui'] || deps['@workspace/theme'] || deps['@workspace/design-system']) {
                        return true;
                    }

                    // Verificar imports en archivos comunes
                    const commonFiles = ['layout.tsx', 'layout.jsx', '_app.tsx', '_app.jsx', 'app.tsx', 'app.jsx'];
                    for (const file of commonFiles) {
                        const filePath = join(currentDir, 'src', file);
                        const altFilePath = join(currentDir, file);

                        for (const path of [filePath, altFilePath]) {
                            if (existsSync(path)) {
                                const content = readFileSync(path, 'utf8');
                                if (content.includes('@workspace/ui') || content.includes('packages/ui') || content.includes('registry')) {
                                    return true;
                                }
                            }
                        }
                    }

                } catch (e) {
                    // Ignorar errores de parsing
                }
            }

            const parentDir = join(currentDir, '..');
            if (parentDir === currentDir) break;
            currentDir = parentDir;
        }

        // Detección adicional: verificar si estamos en un monorepo con packages/ui o registry
        let checkDir = startDir;
        for (let i = 0; i < 3; i++) {
            // Si existe registry/styles/globals.css, probablemente es nuestro monorepo (nueva estructura)
            const registryGlobalsPath = join(checkDir, 'registry/styles/globals.css');
            if (existsSync(registryGlobalsPath)) {
                console.log('🔍 Detectado monorepo por estructura: encontrado registry/styles/globals.css');
                return true;
            }

            // Si existe packages/ui/src/styles/globals.css, probablemente es nuestro monorepo (estructura anterior)
            const uiGlobalsPath = join(checkDir, 'packages/ui/src/styles/globals.css');
            if (existsSync(uiGlobalsPath)) {
                console.log('🔍 Detectado monorepo por estructura: encontrado packages/ui/src/styles/globals.css');
                return true;
            }

            // También verificar si existe registry/package.json con nombre @workspace/ui
            const registryPackageJsonPath = join(checkDir, 'registry/package.json');
            if (existsSync(registryPackageJsonPath)) {
                try {
                    const registryPackageJson = JSON.parse(readFileSync(registryPackageJsonPath, 'utf8'));
                    if (registryPackageJson.name && (
                        registryPackageJson.name.includes('@workspace/ui') ||
                        registryPackageJson.name.includes('ui') ||
                        registryPackageJson.name.includes('design-system')
                    )) {
                        console.log(`🔍 Detectado monorepo por package UI en registry: ${registryPackageJson.name}`);
                        return true;
                    }
                } catch (e) {
                    // Ignorar errores de parsing
                }
            }

            // También verificar si existe packages/ui/package.json con nombre @workspace/ui
            const uiPackageJsonPath = join(checkDir, 'packages/ui/package.json');
            if (existsSync(uiPackageJsonPath)) {
                try {
                    const uiPackageJson = JSON.parse(readFileSync(uiPackageJsonPath, 'utf8'));
                    if (uiPackageJson.name && (
                        uiPackageJson.name.includes('@workspace/ui') ||
                        uiPackageJson.name.includes('ui') ||
                        uiPackageJson.name.includes('design-system')
                    )) {
                        console.log(`🔍 Detectado monorepo por package UI: ${uiPackageJson.name}`);
                        return true;
                    }
                } catch (e) {
                    // Ignorar errores de parsing
                }
            }

            const parentDir = join(checkDir, '..');
            if (parentDir === checkDir) break;
            checkDir = parentDir;
        }

        return false;
    } catch (error) {
        console.warn('⚠️  Error detectando uso de @workspace/ui:', error.message);
        return false;
    }
}

/**
 * Encuentra el directorio raíz del monorepo basado en el directorio actual
 * @param {string} startDir - Directorio inicial
 * @returns {string|null} - Directorio raíz del monorepo o null si no se encuentra
 */
export function findMonorepoRoot(startDir) {
    if (startDir.includes('/apps/') || startDir.includes('/packages/')) {
        const parts = startDir.split('/');
        const rootIndex = Math.max(
            parts.lastIndexOf('apps') - 1,
            parts.lastIndexOf('packages') - 1
        );
        if (rootIndex > 0) {
            return parts.slice(0, rootIndex + 1).join('/');
        }
    }

    // También buscar hacia arriba hasta encontrar package.json con workspaces
    let currentDir = startDir;
    for (let i = 0; i < 3; i++) {
        const packageJsonPath = join(currentDir, 'package.json');
        if (existsSync(packageJsonPath)) {
            try {
                const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
                if (packageJson.workspaces || packageJson.packages) {
                    return currentDir;
                }
            } catch (e) {
                // Ignorar errores de parsing
            }
        }
        const parentDir = join(currentDir, '..');
        if (parentDir === currentDir) break;
        currentDir = parentDir;
    }

    return null;
}

/**
 * Busca globals.css en toda la estructura del monorepo (para uso futuro)
 * @param {string} monorepoRoot - Directorio raíz del monorepo
 * @returns {string|null} - Ruta al globals.css encontrado o null
 */
export function findGlobalsCssInMonorepo(monorepoRoot) {
    const possiblePaths = [
        // Prioridad: registry (nueva estructura)
        join(monorepoRoot, 'registry/styles/globals.css'),

        // Prioridad: packages/ui (estructura anterior)
        join(monorepoRoot, 'packages/ui/src/styles/globals.css'),
        join(monorepoRoot, 'packages/ui/styles/globals.css'),

        // Otras ubicaciones de packages
        join(monorepoRoot, 'packages/theme/src/styles/globals.css'),
        join(monorepoRoot, 'packages/styles/src/globals.css'),
        join(monorepoRoot, 'packages/design-system/src/styles/globals.css')
    ];

    // Verificar rutas directas primero
    for (const path of possiblePaths) {
        if (existsSync(path)) {
            console.log(`📁 Archivo globals.css encontrado en monorepo: ${path}`);
            return path;
        }
    }

    // Buscar en packages/*
    const packagesDir = join(monorepoRoot, 'packages');
    if (existsSync(packagesDir)) {
        console.log('🔍 Buscando en directorio packages/...');
        try {
            const packageDirs = readdirSync(packagesDir).filter(dir => {
                const dirPath = join(packagesDir, dir);
                return statSync(dirPath).isDirectory();
            });

            for (const packageDir of packageDirs) {
                const packagePaths = [
                    join(packagesDir, packageDir, 'src/styles/globals.css'),
                    join(packagesDir, packageDir, 'styles/globals.css'),
                    join(packagesDir, packageDir, 'src/app/globals.css'),
                    join(packagesDir, packageDir, 'app/globals.css')
                ];

                for (const path of packagePaths) {
                    if (existsSync(path)) {
                        console.log(`📁 Archivo globals.css encontrado en package "${packageDir}": ${path}`);
                        return path;
                    }
                }
            }
        } catch (error) {
            console.warn('⚠️  Error al buscar en directorio packages:', error.message);
        }
    }

    // Buscar en apps/*
    const appsDir = join(monorepoRoot, 'apps');
    if (existsSync(appsDir)) {
        console.log('🔍 Buscando en directorio apps/...');
        try {
            const appDirs = readdirSync(appsDir).filter(dir => {
                const dirPath = join(appsDir, dir);
                return statSync(dirPath).isDirectory();
            });

            for (const appDir of appDirs) {
                const appPaths = [
                    join(appsDir, appDir, 'src/styles/globals.css'),
                    join(appsDir, appDir, 'styles/globals.css'),
                    join(appsDir, appDir, 'src/app/globals.css'),
                    join(appsDir, appDir, 'app/globals.css')
                ];

                for (const path of appPaths) {
                    if (existsSync(path)) {
                        console.log(`📁 Archivo globals.css encontrado en app "${appDir}": ${path}`);
                        return path;
                    }
                }
            }
        } catch (error) {
            console.warn('⚠️  Error al buscar en directorio apps:', error.message);
        }
    }

    return null;
}
