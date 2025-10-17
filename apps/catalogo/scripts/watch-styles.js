#!/usr/bin/env node

/**
 * File watcher para regenerar textClasses.ts automáticamente
 *
 * Este script:
 * 1. Monitorea cambios en la carpeta styles/
 * 2. Detecta modificaciones en archivos CSS
 * 3. Regenera automáticamente textClasses.ts
 * 4. Incluye debouncing para evitar ejecuciones múltiples
 *
 * Uso: npm run watch:text-classes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { main as generateTextClasses } from './generate-text-classes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const WATCH_DIR = path.join(path.dirname(__dirname), 'styles');
const DEBOUNCE_DELAY = 1000; // 1 segundo de debounce

let debounceTimer = null;
let isGenerating = false;

function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '👀';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

async function regenerateTextClasses(eventType, filename) {
  if (isGenerating) {
    log('Generación en progreso, ignorando cambio...');
    return;
  }

  // Filtrar solo archivos CSS relevantes
  if (!filename || (!filename.endsWith('.css') && filename !== 'styles.css')) {
    return;
  }

  log(`Cambio detectado: ${eventType} en ${filename}`);

  try {
    isGenerating = true;
    log('🔄 Regenerando textClasses.ts...');

    await generateTextClasses();

    log('✨ textClasses.ts regenerado exitosamente!', 'success');
  } catch (error) {
    log(`Error regenerando textClasses.ts: ${error.message}`, 'error');
  } finally {
    isGenerating = false;
  }
}

function debouncedRegenerate(eventType, filename) {
  // Limpiar timer anterior
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Establecer nuevo timer
  debounceTimer = setTimeout(() => {
    regenerateTextClasses(eventType, filename);
  }, DEBOUNCE_DELAY);
}

function startWatching() {
  if (!fs.existsSync(WATCH_DIR)) {
    log(`Error: La carpeta ${WATCH_DIR} no existe`, 'error');
    process.exit(1);
  }

  log(`🔍 Monitoreando cambios en: ${WATCH_DIR}`);
  log('📝 Archivos monitoreados: *.css, styles.css');
  log('⏱️  Debounce: 1 segundo');
  log('🔄 Presiona Ctrl+C para detener\n');

  // Monitorear la carpeta principal
  const watcher = fs.watch(WATCH_DIR, { recursive: true }, (eventType, filename) => {
    if (filename) {
      log(`Archivo ${eventType}: ${filename}`);
      debouncedRegenerate(eventType, filename);
    }
  });

  // Manejar errores del watcher
  watcher.on('error', (error) => {
    log(`Error en file watcher: ${error.message}`, 'error');
  });

  // Manejar cierre graceful
  process.on('SIGINT', () => {
    log('\n🛑 Deteniendo file watcher...');
    watcher.close();
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    log('👋 File watcher detenido. ¡Hasta luego!');
    process.exit(0);
  });

  // Generar una vez al inicio
  log('🚀 Generación inicial...');
  generateTextClasses()
    .then(() => {
      log('✅ Generación inicial completada\n', 'success');
    })
    .catch((error) => {
      log(`❌ Error en generación inicial: ${error.message}`, 'error');
    });
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  startWatching();
}

export { startWatching };