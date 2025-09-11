#!/usr/bin/env node

const { symlinkSync, existsSync, readdirSync, statSync } = require('fs');
const { join, resolve, relative } = require('path');

// Directorios base
const monorepoRoot = resolve(__dirname);
const configFilesDir = join(monorepoRoot, 'packages/config-files');
const appsDir = join(monorepoRoot, 'apps');
const sitesDir = join(monorepoRoot, 'sites');

/**
 * Crea symlinks solo si el archivo no existe en el destino
 */
function createSymlinkIfNotExists(sourceDir, sourceFile, targetDir, targetFile) {
  const sourcePath = join(sourceDir, sourceFile);
  const targetPath = join(targetDir, targetFile);

  // Verificar si el archivo de origen existe
  if (!existsSync(sourcePath)) {
    console.log(`  ❌ No existe archivo fuente: ${sourceFile}`);
    return false;
  }

  // Si el archivo destino ya existe, no hacer nada
  if (existsSync(targetPath)) {
    console.log(`  ⏭️  Ya existe: ${targetFile}`);
    return false;
  }

  // Crear symlink con ruta relativa
  try {
    const relativePath = relative(targetDir, sourcePath);
    symlinkSync(relativePath, targetPath);
    console.log(`  ✅ Symlink creado: ${targetFile} -> ${relativePath}`);
    return true;
  } catch (error) {
    console.log(`  ❌ Error creando symlink ${targetFile}:`, error.message);
    return false;
  }
}

/**
 * Procesa un directorio (apps o sites) y crea symlinks para archivos de configuración
 */
function setupSymlinksForDirectory(type, targetDir, sourceDir) {
  console.log(`\n📂 Procesando ${type}:`);

  if (!existsSync(sourceDir)) {
    console.log(`⚠️  No existe directorio de configuración: ${sourceDir}`);
    return;
  }

  if (!existsSync(targetDir)) {
    console.log(`⚠️  No existe directorio destino: ${targetDir}`);
    return;
  }

  // Obtener archivos de configuración disponibles
  const configFiles = readdirSync(sourceDir).filter(file => {
    const filePath = join(sourceDir, file);
    return statSync(filePath).isFile();
  });

  if (configFiles.length === 0) {
    console.log(`⚠️  No hay archivos de configuración en: ${sourceDir}`);
    return;
  }

  console.log(`📋 Archivos de configuración disponibles: ${configFiles.join(', ')}`);

  // Obtener directorios de apps/sites
  const directories = readdirSync(targetDir).filter(dir => {
    const dirPath = join(targetDir, dir);
    return statSync(dirPath).isDirectory();
  });

  if (directories.length === 0) {
    console.log(`⚠️  No hay directorios en: ${targetDir}`);
    return;
  }

  // Crear symlinks para cada directorio
  let totalCreated = 0;
  let totalSkipped = 0;

  directories.forEach(dirName => {
    const appDir = join(targetDir, dirName);
    console.log(`\n  📁 ${type}/${dirName}:`);

    configFiles.forEach(configFile => {
      const created = createSymlinkIfNotExists(sourceDir, configFile, appDir, configFile);
      if (created) {
        totalCreated++;
      } else {
        totalSkipped++;
      }
    });
  });

  console.log(`\n📊 Resumen ${type}: ${totalCreated} creados, ${totalSkipped} omitidos`);
}

/**
 * Función principal
 */
function setupConfigSymlinks() {
  console.log('🔗 Configurando symlinks de archivos de configuración...');
  console.log('💡 Solo se crean symlinks si el archivo no existe en destino');
  console.log(`📁 Monorepo root: ${monorepoRoot}`);

  // Procesar apps
  setupSymlinksForDirectory('apps', appsDir, join(configFilesDir, 'apps'));

  // Procesar sites
  setupSymlinksForDirectory('sites', sitesDir, join(configFilesDir, 'sites'));

  console.log('\n🎉 Proceso completado');
  console.log('💡 Los symlinks creados funcionarán tanto en desarrollo como en Vercel');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  setupConfigSymlinks();
}

module.exports = { setupConfigSymlinks };
