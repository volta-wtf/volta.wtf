const fs = require('fs');
const path = require('path');

// Función helper para encontrar el archivo globals.css
function findGlobalsCSS() {
  const possiblePaths = [
    '../../../registry/styles/globals.css',
    '../../../../registry/styles/globals.css',
    '../../../apps/web/app/globals.css',
    '../../../apps/tmp/app/globals.css',
    '../examples/globals.basic.css',
    '../examples/globals.shadcn.css'
  ];

  for (const cssPath of possiblePaths) {
    const fullPath = path.resolve(__dirname, cssPath);
    if (fs.existsSync(fullPath)) {
      console.log(`📁 Encontrado globals.css en: ${cssPath}`);
      return fullPath;
    }
  }

  throw new Error('❌ No se pudo encontrar ningún archivo globals.css');
}

console.log('🧪 Debug Selector Test - Análisis de detección de selectores CSS\n');

// Leer el CSS
let cssPath;
let css;

try {
  cssPath = findGlobalsCSS();
  css = fs.readFileSync(cssPath, 'utf8');
} catch (error) {
  console.error(error.message);
  console.log('💡 Tip: Ejecuta este script desde el directorio packages/theme-editor/');
  console.log('💡 Comando: node src/test/debug-selector.js');
  process.exit(1);
}

console.log('🔍 Debug: Búsqueda de selectores hacia atrás');
console.log('📁 Archivo CSS:', path.relative(process.cwd(), cssPath));
console.log('📊 CSS length:', css.length);

// Buscar todas las ocurrencias de --background
const varName = '--background';
const escapedVarName = varName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
const varRegex = new RegExp(`(\\s*${escapedVarName}\\s*:\\s*)[^;\\n]+`, 'g');

let match;
const matches = [];

while ((match = varRegex.exec(css)) !== null) {
  matches.push({
    start: match.index,
    end: match.index + match[0].length,
    fullMatch: match[0],
    prefix: match[1],
    line: css.substring(0, match.index).split('\n').length
  });
}

console.log(`\n📍 Test: Encontradas ${matches.length} ocurrencias de ${varName}:`);

let testsPassed = 0;
let totalTests = matches.length;

matches.forEach((match, index) => {
  console.log(`\n🔍 Test ${index + 1}:`);
  console.log(`  Posición: ${match.start}-${match.end}`);
  console.log(`  Línea: ${match.line}`);
  console.log(`  Contenido: "${match.fullMatch.trim()}"`);

  // Buscar hacia atrás para encontrar el selector más cercano
  const beforeVariable = css.substring(0, match.start);

  console.log(`  Buscando selectores hacia atrás...`);

  // Buscar los selectores hacia atrás
  const rootMatch = beforeVariable.lastIndexOf(':root');
  const darkMatch = beforeVariable.lastIndexOf('.dark');

  console.log(`  Última ocurrencia de ':root': ${rootMatch}`);
  console.log(`  Última ocurrencia de '.dark': ${darkMatch}`);

  // Determinar cuál selector está más cerca
  let closestSelector = null;
  let closestPosition = -1;

  if (rootMatch !== -1 && rootMatch > closestPosition) {
    closestSelector = ':root';
    closestPosition = rootMatch;
  }

  if (darkMatch !== -1 && darkMatch > closestPosition) {
    closestSelector = '.dark';
    closestPosition = darkMatch;
  }

  console.log(`  Selector más cercano: ${closestSelector} en posición ${closestPosition}`);

  // Test: Verificar que se encontró un selector válido
  if (closestSelector && closestPosition !== -1) {
    console.log(`  ✅ Test ${index + 1}: Selector detectado correctamente`);
    testsPassed++;
  } else {
    console.log(`  ❌ Test ${index + 1}: No se pudo detectar selector`);
  }

  // Mostrar contexto alrededor del selector
  if (closestPosition !== -1) {
    const selectorContext = css.substring(closestPosition, closestPosition + 50);
    console.log(`  Contexto del selector: "${selectorContext}..."`);
  }
});

// Verificar si hay algún problema con los selectores
console.log('\n🔍 Verificación completa de selectores en el archivo:');
const rootPositions = [];
const darkPositions = [];

let pos = 0;
while ((pos = css.indexOf(':root', pos)) !== -1) {
  rootPositions.push(pos);
  pos++;
}

pos = 0;
while ((pos = css.indexOf('.dark', pos)) !== -1) {
  darkPositions.push(pos);
  pos++;
}

console.log(`Posiciones de ':root': ${rootPositions}`);
console.log(`Posiciones de '.dark': ${darkPositions}`);

// Resumen del test
console.log('\n📊 Resumen del Test:');
console.log(`✅ Tests pasados: ${testsPassed}/${totalTests}`);
console.log(`📈 Tasa de éxito: ${((testsPassed / totalTests) * 100).toFixed(1)}%`);

if (testsPassed === totalTests) {
  console.log('🎉 Todos los tests de detección de selectores pasaron!');
} else {
  console.log('⚠️  Algunos tests fallaron. Revisar la lógica de detección.');
}