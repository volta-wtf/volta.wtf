const { cpSync, existsSync, mkdirSync, readFileSync, unlinkSync, readdirSync, statSync, rmSync } = require('fs');
const { join } = require('path');
const { glob } = require('glob');

const rootDir = join(__dirname, '..');
const assetsDir = join(rootDir, 'packages/assets');

// Función para copiar solo directorios de assets (excluyendo archivos del paquete)
function copyAssetDirectories(sourceDir, targetDir) {
  const items = readdirSync(sourceDir);

  for (const item of items) {
    const sourcePath = join(sourceDir, item);
    const targetPath = join(targetDir, item);
    const stat = statSync(sourcePath);

    // Solo copiar directorios (icons, logos, etc.) y excluir archivos del paquete
    if (stat.isDirectory()) {
      cpSync(sourcePath, targetPath, { recursive: true });
      console.log(`  ✅ Copiado directorio: ${item}`);
    } else if (!['index.ts', 'package.json'].includes(item)) {
      // Solo copiar archivos que no sean del paquete
      cpSync(sourcePath, targetPath);
      console.log(`  ✅ Copiado archivo: ${item}`);
    } else {
      console.log(`  ⏭️  Omitido archivo del paquete: ${item}`);
    }
  }
}

console.log('🔍 Buscando aplicaciones que usen @repo/assets...');

// Buscar todos los package.json en apps/
async function copyAssets() {
  const packageJsonFiles = await glob('apps/*/package.json', { cwd: rootDir });

  const appsWithAssets = [];

  for (const packageJsonPath of packageJsonFiles) {
    const fullPath = join(rootDir, packageJsonPath);
    const content = readFileSync(fullPath, 'utf8');

    if (content.includes('"@repo/assets"')) {
      const appName = packageJsonPath.split('/')[1];
      appsWithAssets.push(appName);
      console.log(`✅ Encontrada: ${appName}`);
    }
  }

  if (appsWithAssets.length === 0) {
    console.log('⚠️  No se encontraron aplicaciones que usen @repo/assets');
    return;
  }

  console.log(`\n📦 Copiando assets a ${appsWithAssets.length} aplicación(es)...`);

  // Copiar assets a cada aplicación
  for (const appName of appsWithAssets) {
    const appDir = join(rootDir, 'apps', appName);
    const publicDir = join(appDir, 'public');
    const sharedDir = join(publicDir, 'shared');

    // Crear directorio public si no existe
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
      console.log(`📁 Creado directorio public para ${appName}`);
    }

    // Eliminar symlink/directorio shared si existe
    if (existsSync(sharedDir)) {
      rmSync(sharedDir, { recursive: true, force: true });
      console.log(`🗑️  Eliminado symlink/directorio shared en ${appName}`);
    }

    // Crear directorio shared
    mkdirSync(sharedDir, { recursive: true });

    // Copiar solo los directorios de assets (excluyendo archivos del paquete)
    copyAssetDirectories(assetsDir, sharedDir);
  }

  console.log('\n🎉 Assets copiados exitosamente a todas las aplicaciones');
}

copyAssets().catch(console.error);
