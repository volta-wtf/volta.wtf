/**
 * Tests para el sistema de detección de variables CSS
 *
 * Para ejecutar estas pruebas:
 * node packages/theme-editor/src/test/variable-detection-tests.js
 */

import { detectVariableType, analyzeVariable } from '../utils/variable-type-detector.js';
import { generateVariablePreview } from '../utils/variable-preview-generator.js';

// Colores para output en consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Casos de prueba organizados por tipo esperado
 */
const TEST_CASES = {
  color: [
    ['--color-primary', '#3b82f6'],
    ['--color-red-500', '#ef4444'],
    ['--tone-neutral-100', '#f5f5f5'],
    ['--bg-surface', 'rgba(255, 255, 255, 0.9)'],
    ['--text-primary', 'hsl(220, 14%, 96%)'],
    ['--border-color', 'currentColor'],
    ['--shadow-color', 'transparent'],
    ['--accent-color', 'blue'],
    ['--theme-bg', 'white']
  ],

  spacing: [
    ['--spacing-xs', '4px'],
    ['--gap-large', '2rem'],
    ['--padding-button', '12px 24px'],
    ['--margin-section', '3rem'],
    ['--space-between', 'calc(1rem + 2vw)'],
    ['--gutter-width', '1.5rem'],
    ['--container-padding', '20px']
  ],

  typography: [
    ['--font-size-sm', '14px'],
    ['--font-weight-bold', '700'],
    ['--line-height-tight', '1.25'],
    ['--font-family-sans', 'Inter, sans-serif'],
    ['--letter-spacing-wide', '0.05em'],
    ['--text-size-lg', '18px'],
    ['--heading-font', 'Roboto, sans-serif']
  ],

  border: [
    ['--border-width', '1px'],
    ['--border-style', 'solid'],
    ['--radius-md', '8px'],
    ['--rounded-full', '9999px'],
    ['--border-input', '2px solid #e5e7eb'],
    ['--outline-width', '2px']
  ],

  shadow: [
    ['--shadow-sm', '0 1px 2px 0 rgba(0, 0, 0, 0.05)'],
    ['--shadow-lg', '0 10px 15px -3px rgba(0, 0, 0, 0.1)'],
    ['--elevation-high', '0 24px 38px 3px rgba(0, 0, 0, 0.14)'],
    ['--shadow-none', 'none'],
    ['--drop-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)']
  ],

  default: [
    ['--z-index-modal', '1000'],
    ['--transition-fast', '150ms ease-in-out'],
    ['--opacity-disabled', '0.6'],
    ['--cursor-pointer', 'pointer'],
    ['--custom-property', 'some-custom-value'],
    ['--animation-duration', '300ms'],
    ['--transform-scale', 'scale(1.1)']
  ]
};

/**
 * Ejecuta una prueba individual
 */
function runSingleTest(varName, value, expectedType) {
  try {
    const detectedType = detectVariableType(varName, value);
    const isCorrect = detectedType === expectedType;

    const status = isCorrect ?
      `${colors.green}✅ PASS${colors.reset}` :
      `${colors.red}❌ FAIL${colors.reset}`;

    const expectedStr = `${colors.cyan}${expectedType}${colors.reset}`;
    const detectedStr = isCorrect ?
      `${colors.green}${detectedType}${colors.reset}` :
      `${colors.red}${detectedType}${colors.reset}`;

    console.log(`${status} ${varName} (${value})`);
    console.log(`     Expected: ${expectedStr}, Got: ${detectedStr}`);

    return isCorrect;
  } catch (error) {
    console.log(`${colors.red}💥 ERROR${colors.reset} ${varName}: ${error.message}`);
    return false;
  }
}

/**
 * Ejecuta todas las pruebas
 */
function runAllTests() {
  console.log(`${colors.bright}${colors.blue}🧪 EJECUTANDO PRUEBAS DEL DETECTOR DE VARIABLES${colors.reset}\n`);

  let totalTests = 0;
  let passedTests = 0;
  const results = {};

  Object.entries(TEST_CASES).forEach(([expectedType, testCases]) => {
    console.log(`${colors.bright}${colors.magenta}📂 Probando tipo: ${expectedType.toUpperCase()}${colors.reset}`);

    let typeTests = 0;
    let typePassed = 0;

    testCases.forEach(([varName, value]) => {
      const passed = runSingleTest(varName, value, expectedType);
      typeTests++;
      totalTests++;

      if (passed) {
        typePassed++;
        passedTests++;
      }
    });

    const typeAccuracy = ((typePassed / typeTests) * 100).toFixed(1);
    const typeColor = typePassed === typeTests ? colors.green :
                     typePassed > typeTests * 0.7 ? colors.yellow : colors.red;

    console.log(`${typeColor}   ${typePassed}/${typeTests} pruebas pasaron (${typeAccuracy}%)${colors.reset}\n`);

    results[expectedType] = {
      total: typeTests,
      passed: typePassed,
      accuracy: typeAccuracy
    };
  });

  // Resumen final
  const overallAccuracy = ((passedTests / totalTests) * 100).toFixed(1);
  const summaryColor = passedTests === totalTests ? colors.green :
                      passedTests > totalTests * 0.8 ? colors.yellow : colors.red;

  console.log(`${colors.bright}${colors.blue}📊 RESUMEN FINAL${colors.reset}`);
  console.log(`${summaryColor}${passedTests}/${totalTests} pruebas pasaron (${overallAccuracy}%)${colors.reset}\n`);

  // Detalles por tipo
  console.log(`${colors.bright}Detalles por tipo:${colors.reset}`);
  Object.entries(results).forEach(([type, stats]) => {
    const icon = {
      color: '🎨',
      spacing: '📏',
      typography: '✏️',
      border: '🔲',
      shadow: '🌑',
      default: '📄'
    }[type] || '❓';

    console.log(`${icon} ${type}: ${stats.passed}/${stats.total} (${stats.accuracy}%)`);
  });

  return { totalTests, passedTests, overallAccuracy, results };
}

/**
 * Prueba el análisis completo de variables (incluyendo previews)
 */
function testVariableAnalysis() {
  console.log(`\n${colors.bright}${colors.blue}🔍 PROBANDO ANÁLISIS COMPLETO DE VARIABLES${colors.reset}\n`);

  const sampleVariables = [
    ['--color-primary', '#3b82f6'],
    ['--spacing-lg', '2rem'],
    ['--font-weight-bold', '700'],
    ['--border-radius', '8px'],
    ['--shadow-md', '0 4px 6px rgba(0,0,0,0.1)']
  ];

  sampleVariables.forEach(([varName, value]) => {
    try {
      const analysis = analyzeVariable(varName, value);
      console.log(`${colors.cyan}${varName}${colors.reset} (${value})`);
      console.log(`  Tipo: ${colors.yellow}${analysis.type}${colors.reset}`);
      console.log(`  Preview: ${analysis.preview ? '✅ Generado' : '❌ Sin preview'}`);
      console.log(`  Tooltip: ${analysis.preview?.tooltip || 'N/A'}`);
      console.log('');
    } catch (error) {
      console.log(`${colors.red}Error analizando ${varName}: ${error.message}${colors.reset}`);
    }
  });
}

/**
 * Prueba casos edge/límite
 */
function testEdgeCases() {
  console.log(`${colors.bright}${colors.blue}⚠️  PROBANDO CASOS LÍMITE${colors.reset}\n`);

  const edgeCases = [
    ['', ''],
    ['--valid-var', ''],
    ['', '#ff0000'],
    ['--color-', '#ff0000'],
    ['--weird-var', 'calc(100% - 20px)'],
    ['--multi-unit', '10px 20px 30px 40px'],
    ['--css-var-ref', 'var(--other-var)']
  ];

  edgeCases.forEach(([varName, value]) => {
    try {
      const type = detectVariableType(varName, value);
      console.log(`${colors.green}✅${colors.reset} "${varName}" + "${value}" → ${type}`);
    } catch (error) {
      console.log(`${colors.red}❌${colors.reset} "${varName}" + "${value}" → Error: ${error.message}`);
    }
  });
}

/**
 * Función principal
 */
function main() {
  console.clear();
  console.log(`${colors.bright}${colors.blue}🚀 PRUEBAS DEL SISTEMA DE DETECCIÓN DE VARIABLES CSS${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}=================================================${colors.reset}\n`);

  const startTime = Date.now();

  // Ejecutar pruebas principales
  const mainResults = runAllTests();

  // Ejecutar pruebas de análisis
  testVariableAnalysis();

  // Ejecutar casos límite
  testEdgeCases();

  const endTime = Date.now();
  const duration = endTime - startTime;

  console.log(`\n${colors.bright}${colors.blue}⏱️  TIEMPO TOTAL: ${duration}ms${colors.reset}`);

  // Resultado final
  if (mainResults.passedTests === mainResults.totalTests) {
    console.log(`${colors.bright}${colors.green}🎉 ¡TODAS LAS PRUEBAS PASARON!${colors.reset}\n`);
  } else {
    console.log(`${colors.bright}${colors.yellow}⚠️  ALGUNAS PRUEBAS FALLARON. Revisar la lógica de detección.${colors.reset}\n`);
  }

  return mainResults;
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  runAllTests,
  testVariableAnalysis,
  testEdgeCases,
  main,
  TEST_CASES
};