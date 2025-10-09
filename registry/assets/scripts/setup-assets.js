#!/usr/bin/env node

const { symlinkSync, existsSync, mkdirSync, rmSync, unlinkSync, lstatSync } = require('fs');
const { join } = require('path');

// Este script se ejecuta desde el directorio de la aplicación que usa @registry/assets
const appDir = process.cwd();
const publicDir = join(appDir, 'public');
const sharedDir = join(publicDir, 'shared');

// Buscar el directorio shared dentro del paquete assets
const assetsDir = join(appDir, 'node_modules/@registry/assets/shared');

console.log('🔗 Configurando symlink para desarrollo...');
console.log(`📁 App dir: ${appDir}`);
console.log(`📦 Shared assets dir: ${assetsDir}`);

if (!existsSync(assetsDir)) {
  console.error('❌ No se encontró el directorio shared en node_modules/@registry/assets/shared');
  console.error('   Asegúrate de que @registry/assets esté instalado como dependencia');
  process.exit(1);
}

// Crear directorio public si no existe
if (!existsSync(publicDir)) {
  try {
    mkdirSync(publicDir, { recursive: true });
    console.log(`📁 Creado directorio public`);
  } catch (error) {
    console.error(`❌ Error creando directorio public:`, error.message);
    process.exit(1);
  }
}

// Eliminar directorio/symlink shared existente si existe
if (existsSync(sharedDir)) {
  try {
    console.log(`🔍 Verificando tipo de archivo en: ${sharedDir}`);
    const stats = lstatSync(sharedDir); // lstatSync no sigue symlinks
    console.log(`🔍 Es directorio: ${stats.isDirectory()}`);
    console.log(`🔍 Es symlink: ${stats.isSymbolicLink()}`);
    console.log(`🔍 Es archivo: ${stats.isFile()}`);

    // Usar unlinkSync para symlinks, rmSync para directorios
    if (stats.isSymbolicLink()) {
      console.log(`🔗 Eliminando symlink: ${sharedDir}`);
      unlinkSync(sharedDir);
    } else {
      console.log(`📁 Eliminando directorio: ${sharedDir}`);
      rmSync(sharedDir, { recursive: true, force: true });
    }
    console.log(`🗑️  Eliminado directorio/symlink shared existente`);
  } catch (error) {
    console.error(`❌ Error eliminando directorio shared:`, error.message);
    console.error(`   Error completo:`, error);
    process.exit(1);
  }
}

// Crear symlink al directorio assets
try {
  symlinkSync(assetsDir, sharedDir, 'dir');
  console.log(`✅ Symlink creado: public/shared -> node_modules/@registry/assets/shared`);
} catch (error) {
  console.error(`❌ Error creando symlink:`, error.message);
  process.exit(1);
}

console.log('\n🎉 Symlink configurado para desarrollo');
console.log('💡 Para producción, usa: pnpm run build (que ejecuta copy-assets.js)');
