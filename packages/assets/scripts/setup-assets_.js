#!/usr/bin/env node

const { symlinkSync, existsSync, mkdirSync, rmSync } = require('fs');
const { join } = require('path');

// Este script se ejecuta desde el directorio de la aplicación que usa @repo/assets
const appDir = process.cwd();
const publicDir = join(appDir, 'public');
const sharedDir = join(publicDir, 'shared');

// Buscar el directorio shared dentro del paquete assets
const assetsDir = join(appDir, 'node_modules/@repo/assets/shared');

console.log('🔗 Configurando symlink para desarrollo...');
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

// Eliminar directorio/symlink shared existente si existe
if (existsSync(sharedDir)) {
  console.log(`🗑️  Eliminando directorio/symlink shared existente`);
  rmSync(sharedDir, { recursive: true, force: true });
}

// Crear symlink al directorio assets
try {
  symlinkSync(assetsDir, sharedDir, 'dir');
  console.log(`✅ Symlink creado: public/shared -> node_modules/@repo/assets/shared`);
} catch (error) {
  console.error(`❌ Error creando symlink:`, error.message);
  process.exit(1);
}

console.log('\n🎉 Symlink configurado para desarrollo');
console.log('💡 Para producción, usa: pnpm run build (que ejecuta copy-assets.js)');
