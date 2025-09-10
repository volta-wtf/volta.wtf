#!/usr/bin/env node

const { cpSync, existsSync, mkdirSync, readdirSync, statSync, rmSync } = require('fs');
const { join } = require('path');

// Este script se ejecuta desde el directorio de la aplicación que usa @repo/assets
const appDir = process.cwd();
const publicDir = join(appDir, 'public');
const sharedDir = join(publicDir, 'shared');

// Buscar el directorio shared dentro del paquete assets
const assetsDir = join(appDir, 'node_modules/@repo/assets/shared');

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

console.log('🔍 Copiando assets desde @repo/assets/shared...');
console.log(`📁 App dir: ${appDir}`);
console.log(`📦 Shared assets dir: ${assetsDir}`);

if (!existsSync(assetsDir)) {
  console.error('❌ No se encontró el directorio shared en node_modules/@repo/assets/shared');
  console.error('   Asegúrate de que @repo/assets esté instalado como dependencia');
  process.exit(1);
}

// Crear directorio public si no existe
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
  console.log(`📁 Creado directorio public`);
}

// Eliminar directorio shared si existe
if (existsSync(sharedDir)) {
  rmSync(sharedDir, { recursive: true, force: true });
  console.log(`🗑️  Eliminado directorio shared existente`);
}

// Crear directorio shared
mkdirSync(sharedDir, { recursive: true });

// Copiar solo los directorios de assets
copyAssetDirectories(assetsDir, sharedDir);

console.log('🎉 Assets copiados exitosamente desde @repo/assets');
console.log('💡 Los assets ahora están disponibles en /shared/');
