#!/usr/bin/env node

/**
 * Script de conveniencia para ejecutar las pruebas del detector de variables
 *
 * Uso:
 *   node src/test/variables-test.js
 *   npm run test:variables
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testsPath = join(__dirname, 'variable-detection-tests.js');

console.log('🚀 Ejecutando pruebas del detector de variables...\n');

try {
  // Importar y ejecutar las pruebas
  await import(testsPath);
} catch (error) {
  console.error('❌ Error ejecutando las pruebas:', error.message);
  process.exit(1);
}