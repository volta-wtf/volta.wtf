#!/usr/bin/env node

const { cpSync, existsSync, mkdirSync, readdirSync, statSync, rmSync, unlinkSync, lstatSync } = require('fs');
const { join } = require('path');

// Este script se ejecuta desde el directorio de la aplicación que usa @registry/assets
const appDir = process.cwd();
const publicDir = join(appDir, 'public');
const sharedDir = join(publicDir, 'shared');

// Buscar el directorio shared dentro del paquete assets
const assetsDir = join(appDir, 'node_modules/@registry/assets/shared');

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

console.log('🔍 Copiando assets desde @registry/assets/shared...');
console.log(`📁 App dir: ${appDir}`);
console.log(`📦 Shared assets dir: ${assetsDir}`);
console.log(`🔍 Node version: ${process.version}`);
console.log(`🔍 Platform: ${process.platform}`);
console.log(`🔍 Working directory: ${process.cwd()}`);

if (!existsSync(assetsDir)) {
  console.error('❌ No se encontró el directorio shared en node_modules/@registry/assets/shared');
  console.error('   Asegúrate de que @registry/assets esté instalado como dependencia');
  process.exit(1);
}

// Verificar que el directorio padre existe
const parentDir = join(appDir, '..');
console.log(`🔍 Directorio padre: ${parentDir}`);
console.log(`🔍 ¿Existe el directorio padre? ${existsSync(parentDir)}`);

// Crear directorio public si no existe
console.log(`🔍 Verificando directorio public: ${publicDir}`);
console.log(`🔍 ¿Existe el directorio public? ${existsSync(publicDir)}`);

if (!existsSync(publicDir)) {
  try {
    console.log(`📁 Creando directorio public: ${publicDir}`);
    mkdirSync(publicDir, { recursive: true });
    console.log(`✅ Directorio public creado exitosamente`);

    // Verificar que se creó correctamente
    if (existsSync(publicDir)) {
      console.log(`✅ Verificación: directorio public existe`);
    } else {
      console.error(`❌ Error: directorio public no se creó correctamente`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Error creando directorio public:`, error.message);
    console.error(`   Directorio: ${publicDir}`);
    console.error(`   Directorio padre: ${parentDir}`);
    console.error(`   ¿Existe padre? ${existsSync(parentDir)}`);
    console.error(`   Error completo:`, error);
    process.exit(1);
  }
} else {
  console.log(`✅ Directorio public ya existe`);
}

// Eliminar directorio/symlink shared si existe
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

// Copiar directamente los assets al directorio shared
console.log(`🔍 Copiando assets directamente a: ${sharedDir}`);
console.log(`🔍 ¿Existe el directorio public ahora? ${existsSync(publicDir)}`);

try {
  // Usar cpSync con recursive: true para crear el directorio automáticamente
  cpSync(assetsDir, sharedDir, { recursive: true, force: true });
  console.log(`✅ Assets copiados exitosamente usando cpSync`);

  // Verificar que se creó correctamente
  if (existsSync(sharedDir)) {
    console.log(`✅ Verificación: directorio shared existe`);

    // Verificar que tiene contenido
    const items = readdirSync(sharedDir);
    console.log(`✅ Contenido del directorio shared: ${items.join(', ')}`);
  } else {
    console.error(`❌ Error: directorio shared no se creó correctamente`);
    process.exit(1);
  }
} catch (error) {
  console.error(`❌ Error copiando assets:`, error.message);
  console.error(`   Directorio público: ${publicDir}`);
  console.error(`   Directorio compartido: ${sharedDir}`);
  console.error(`   ¿Existe public? ${existsSync(publicDir)}`);
  console.error(`   Error completo:`, error);
  process.exit(1);
}

console.log('🎉 Assets copiados exitosamente desde @registry/assets');
console.log('💡 Los assets ahora están disponibles en /shared/');
