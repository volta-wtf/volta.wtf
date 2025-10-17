/**
 * Ejemplos de variables CSS y cómo el sistema de detección las categoriza
 *
 * Este archivo demuestra las capacidades del variable-type-detector.js
 * y cómo genera previews para diferentes tipos de variables.
 */

import { analyzeVariable } from '../utils/variable-type-detector.js';

/**
 * Conjunto de variables de ejemplo para probar el sistema
 */
export const EXAMPLE_VARIABLES = {
  // === VARIABLES DE COLORES ===
  colors: {
    '--color-primary': '#3b82f6',
    '--color-red-500': '#ef4444',
    '--tone-neutral-100': '#f5f5f5',
    '--bg-surface': 'rgba(255, 255, 255, 0.9)',
    '--text-primary': 'hsl(220, 14%, 96%)',
    '--border-color': 'currentColor',
    '--shadow-color': 'transparent'
  },

  // === VARIABLES DE ESPACIADO ===
  spacing: {
    '--spacing-xs': '4px',
    '--gap-large': '2rem',
    '--padding-button': '12px 24px',
    '--margin-section': '3rem',
    '--space-between': 'calc(1rem + 2vw)'
  },

  // === VARIABLES DE TIPOGRAFÍA ===
  typography: {
    '--font-size-sm': '14px',
    '--font-weight-bold': '700',
    '--line-height-tight': '1.25',
    '--font-family-sans': 'Inter, sans-serif',
    '--letter-spacing-wide': '0.05em'
  },

  // === VARIABLES DE BORDES ===
  borders: {
    '--border-width': '1px',
    '--border-style': 'solid',
    '--radius-md': '8px',
    '--rounded-full': '9999px',
    '--border-input': '2px solid #e5e7eb'
  },

  // === VARIABLES DE SOMBRAS ===
  shadows: {
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '--elevation-high': '0 24px 38px 3px rgba(0, 0, 0, 0.14)',
    '--shadow-none': 'none'
  },

  // === VARIABLES MISCELÁNEAS (default) ===
  miscellaneous: {
    '--z-index-modal': '1000',
    '--transition-fast': '150ms ease-in-out',
    '--opacity-disabled': '0.6',
    '--cursor-pointer': 'pointer',
    '--custom-property': 'some-custom-value'
  }
};

/**
 * Analiza todas las variables de ejemplo y devuelve los resultados
 */
export function analyzeExampleVariables() {
  const results = {};

  Object.entries(EXAMPLE_VARIABLES).forEach(([category, variables]) => {
    results[category] = {};

    Object.entries(variables).forEach(([varName, value]) => {
      results[category][varName] = analyzeVariable(varName, value);
    });
  });

  return results;
}

/**
 * Genera un reporte de estadísticas de detección
 */
export function generateDetectionStats() {
  const results = analyzeExampleVariables();
  const stats = {
    total: 0,
    byType: {
      color: 0,
      spacing: 0,
      typography: 0,
      border: 0,
      shadow: 0,
      default: 0
    },
    accuracy: {
      expected: {},
      detected: {},
      matches: 0
    }
  };

  // Mapeo de categorías esperadas vs detectadas
  const expectedTypeMapping = {
    colors: 'color',
    spacing: 'spacing',
    typography: 'typography',
    borders: 'border',
    shadows: 'shadow',
    miscellaneous: 'default'
  };

  Object.entries(results).forEach(([category, variables]) => {
    const expectedType = expectedTypeMapping[category];

    Object.entries(variables).forEach(([varName, analysis]) => {
      stats.total++;
      stats.byType[analysis.type]++;

      if (analysis.type === expectedType) {
        stats.accuracy.matches++;
      }

      if (!stats.accuracy.expected[expectedType]) {
        stats.accuracy.expected[expectedType] = 0;
      }
      stats.accuracy.expected[expectedType]++;

      if (!stats.accuracy.detected[analysis.type]) {
        stats.accuracy.detected[analysis.type] = 0;
      }
      stats.accuracy.detected[analysis.type]++;
    });
  });

  stats.accuracy.percentage = (stats.accuracy.matches / stats.total) * 100;

  return stats;
}

/**
 * Función para probar el detector con variables personalizadas
 */
export function testCustomVariables(customVars) {
  const results = {};

  Object.entries(customVars).forEach(([varName, value]) => {
    results[varName] = analyzeVariable(varName, value);
  });

  return results;
}

/**
 * Demostración de uso en consola
 */
export function runDemo() {
  console.log('🎨 === DEMO: Variable Type Detector ===\n');

  const stats = generateDetectionStats();

  console.log('📊 Estadísticas de detección:');
  console.log(`Total de variables analizadas: ${stats.total}`);
  console.log(`Precisión de detección: ${stats.accuracy.percentage.toFixed(1)}%`);
  console.log('\nDistribución por tipo:');
  Object.entries(stats.byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} variables`);
  });

  console.log('\n🔍 Ejemplos de detección:');

  // Mostrar algunos ejemplos específicos
  const examples = [
    { name: '--color-primary', value: '#3b82f6' },
    { name: '--spacing-lg', value: '2rem' },
    { name: '--font-weight-bold', value: '700' },
    { name: '--border-radius', value: '8px' },
    { name: '--shadow-md', value: '0 4px 6px rgba(0,0,0,0.1)' },
    { name: '--z-index-modal', value: '1000' }
  ];

  examples.forEach(({ name, value }) => {
    const analysis = analyzeVariable(name, value);
    console.log(`  ${name} (${value}) → Tipo: ${analysis.type}`);
  });

  console.log('\n✨ Demo completada. Usa analyzeVariable(varName, value) para probar tus propias variables.');

  return stats;
}

// Ejecutar demo automáticamente si se importa en un entorno de desarrollo
if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
  // Solo ejecutar en desarrollo
  setTimeout(() => {
    console.log('🚀 Variable Type Detector cargado. Ejecuta runDemo() para ver la demostración.');
  }, 1000);
}