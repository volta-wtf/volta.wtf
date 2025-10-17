#!/usr/bin/env node

/**
 * Ejemplo de uso de setClassNames() - Sistema de Estilos Mixtos
 * Demuestra cómo usar sintaxis familiar de CSS Modules junto con helpers
 */

import { injectDynamicStyles, setClassNames } from '../client/dynamic-styles.js';
import { cls, cn } from '../utils/class-names.js';
import { styles } from '../client/panel-styles.js';

console.log('🎨 Ejemplo de uso: setClassNames() - Sintaxis Mixta\n');

// ===================================
// ANTES de setClassNames()
// ===================================

console.log('📋 ANTES de setClassNames():');
console.log(`   styles.tabBar es un objeto: ${typeof styles.tabBar}`);
console.log(`   Propiedades: ${Object.keys(styles.tabBar).join(', ')}`);
console.log(`   styles.tabBar.display = "${styles.tabBar.display}"`);
console.log(`   String(styles.tabBar) = "${String(styles.tabBar)}"`);

// ===================================
// EJECUTAR setClassNames()
// ===================================

console.log('\n🔄 Ejecutando setClassNames()...');
setClassNames();

// ===================================
// DESPUÉS de setClassNames()
// ===================================

console.log('\n✅ DESPUÉS de setClassNames():');
console.log(`   styles.tabBar ahora es: ${typeof styles.tabBar}`);
console.log(`   String(styles.tabBar) = "${String(styles.tabBar)}"`);
console.log(`   styles.tabBar.display = "${styles.tabBar.display}" (¡mantiene propiedades!)`);
console.log(`   styles.tabBar.flexShrink = "${styles.tabBar.flexShrink}"`);

// ===================================
// EJEMPLOS DE USO PRÁCTICO
// ===================================

console.log('\n🚀 Ejemplos de uso en React/JSX:\n');

// Ejemplo 1: Sintaxis familiar con styles.className
console.log('📌 Sintaxis familiar (como CSS Modules):');
console.log(`   <div className={styles.tabBar}>  → className="${styles.tabBar}"`);
console.log(`   <div className={styles.panel}>   → className="${styles.panel}"`);
console.log(`   <button className={styles.tab}>  → className="${styles.tab}"`);

// Ejemplo 2: Mantiene compatibilidad con style={}
console.log('\n📌 Mantiene compatibilidad con estilos inline:');
console.log(`   <div style={styles.tabBar}>      → style={{ display: "${styles.tabBar.display}", ... }}`);
console.log(`   styles.tabBar.display: "${styles.tabBar.display}"`);
console.log(`   styles.tabBar.gap: "${styles.tabBar.gap}"`);

// Ejemplo 3: Helpers siguen funcionando
console.log('\n📌 Helpers siguen funcionando igual:');
console.log(`   cls('panel')                    → "${cls('panel')}"`);
console.log(`   cn('tab', { active: true })     → "${cn('tab', { active: true })}"`);
console.log(`   cn('variable', { modified: false }) → "${cn('variable', { modified: false })}"`);

// Ejemplo 4: Combinaciones
console.log('\n📌 Combinaciones y template literals:');
console.log(`   \`wrapper \${styles.panel}\`        → "wrapper ${styles.panel}"`);
console.log(`   \`\${styles.tab} custom-class\`     → "${styles.tab} custom-class"`);

// ===================================
// COMPARACIÓN CON SINTAXIS ANTERIOR
// ===================================

console.log('\n🔄 Comparación de sintaxis:\n');

const examples = [
  {
    description: 'Clase básica',
    before: `className={cls('tabBar')}`,
    after: `className={styles.tabBar}`,
    result: String(styles.tabBar)
  },
  {
    description: 'Con modificadores',
    before: `className={cn('tab', { active: true })}`,
    after: `className={styles.tab} // + lógica condicional`,
    result: cn('tab', { active: true })
  },
  {
    description: 'Estilos inline',
    before: `style={styles.tabBar}`,
    after: `style={styles.tabBar} // ¡Igual!`,
    result: `{ display: "${styles.tabBar.display}", ... }`
  }
];

examples.forEach(({ description, before, after, result }) => {
  console.log(`📋 ${description}:`);
  console.log(`   Antes: ${before}`);
  console.log(`   Ahora: ${after}`);
  console.log(`   Resultado: "${result}"`);
  console.log('');
});

// ===================================
// VENTAJAS DEL SISTEMA
// ===================================

console.log('🎯 Ventajas del sistema:\n');
console.log('   ✅ Sintaxis familiar: styles.className como CSS Modules');
console.log('   ✅ Compatibilidad: style={styles.className} sigue funcionando');
console.log('   ✅ Flexibilidad: Puedes usar helpers cuando los necesites');
console.log('   ✅ Migración: Cambio gradual sin romper código existente');
console.log('   ✅ Intellisense: Autocompletado familiar para developers');

// ===================================
// SETUP RECOMENDADO
// ===================================

console.log('\n⚙️  Setup recomendado en React:\n');
console.log('```javascript');
console.log('import { injectDynamicStyles, setClassNames } from "./dynamic-styles.js";');
console.log('import { styles } from "./panel-styles.js";');
console.log('');
console.log('React.useEffect(() => {');
console.log('  injectDynamicStyles();  // Inyectar CSS al DOM');
console.log('  setClassNames();        // Configurar sintaxis mixta');
console.log('}, []);');
console.log('');
console.log('// Usar en componentes:');
console.log('<div className={styles.tabBar}>        // ✓ Familiar');
console.log('<div style={styles.tabBar}>            // ✓ Compatible');
console.log('<div className={cls("panel")}>         // ✓ Helper');
console.log('<div className={cn("tab", { active })}>// ✓ Condicional');
console.log('```');

console.log('\n🎉 ¡Sistema de estilos mixtos configurado correctamente!');