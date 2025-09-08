const { symlinkSync, existsSync, unlinkSync, readFileSync, mkdirSync, rmSync } = require('fs');
const { join } = require('path');
const { glob } = require('glob');

const rootDir = join(__dirname, '..');
const assetsDir = join(rootDir, 'packages/assets');

console.log('🔗 Configurando symlinks para desarrollo...');

// Buscar todas las aplicaciones que usen @repo/assets
async function setupSymlinks() {
  const packageJsonFiles = await glob('apps/*/package.json', { cwd: rootDir });

  const appsWithAssets = [];

  for (const packageJsonPath of packageJsonFiles) {
    const fullPath = join(rootDir, packageJsonPath);
    const content = readFileSync(fullPath, 'utf8');

    if (content.includes('"@repo/assets"')) {
      const appName = packageJsonPath.split('/')[1];
      appsWithAssets.push(appName);
    }
  }

  if (appsWithAssets.length === 0) {
    console.log('⚠️  No se encontraron aplicaciones que usen @repo/assets');
    return;
  }

  // Crear symlinks para desarrollo
  for (const appName of appsWithAssets) {
    const appDir = join(rootDir, 'apps', appName);
    const publicDir = join(appDir, 'public');
    const sharedDir = join(publicDir, 'shared');

    // Crear directorio public si no existe
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
      console.log(`📁 Creado directorio public para ${appName}`);
    }

    // Eliminar directorio/symlink shared existente si existe
    if (existsSync(sharedDir)) {
      console.log(`🗑️  Eliminando directorio/symlink shared existente en ${appName}`);
      rmSync(sharedDir, { recursive: true, force: true });
    }

    // Crear symlink al directorio assets
    try {
      symlinkSync(assetsDir, sharedDir, 'dir');
      console.log(`✅ Symlink creado: ${appName}/public/shared -> packages/assets`);
    } catch (error) {
      console.error(`❌ Error creando symlink para ${appName}:`, error.message);
    }
  }

  console.log('\n🎉 Symlinks configurados para desarrollo');
  console.log('💡 Para producción, usa: pnpm run build (que ejecuta copy-assets.js)');
}

setupSymlinks().catch(console.error);
