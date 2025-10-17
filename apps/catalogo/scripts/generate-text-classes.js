#!/usr/bin/env node

/**
 * Script para generar automáticamente textClasses.ts desde styles.css
 *
 * Este script:
 * 1. Lee styles.css para extraer las categorías y los imports de archivos CSS
 * 2. Procesa cada archivo CSS para extraer metadatos desde los comentarios
 * 3. Genera el archivo textClasses.ts con toda la información
 *
 * Propiedades detectadas:
 * - Obligatorias: id, name, description, category, tags, cssFile, previewText, background
 * - Opcionales: usesData (boolean), bestFor (array), reference (string o array), cssVariants (array)
 *
 * Uso:
 * - Desde apps/shadcn: npm run generate:text-classes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de archivos (relativas al directorio del script)
const appDir = path.dirname(__dirname);
const stylesPath = path.join(appDir, 'styles/styles.css');
const textClassesPath = path.join(appDir, 'data/textClasses.ts');
const textStylesDir = path.join(appDir, 'styles/text-styles');

function extractCategoriesFromStyles(stylesContent) {
  // Buscar el comentario que contiene las categorías
  const categoryMatch = stylesContent.match(/\/\*\s*textClassesCategories=\[([\s\S]*?)\];\s*\*\//);

  if (!categoryMatch) {
    console.error('No se encontraron las categorías en styles.css');
    return [];
  }

  // Extraer las categorías del array
  const categoriesStr = categoryMatch[1];
  const categories = categoriesStr
    .split(',')
    .map(cat => cat.trim().replace(/['"]/g, ''))
    .filter(cat => cat.length > 0);

  return categories;
}

function extractImportsFromStyles(stylesContent) {
  // Extraer todas las líneas @import
  const importRegex = /@import\s+['"](\.\/text-styles\/([^'"]+))['"]\s*;/g;
  const imports = [];
  let match;

  while ((match = importRegex.exec(stylesContent)) !== null) {
    const cssFile = match[2]; // nombre del archivo sin la ruta
    imports.push(cssFile);
  }

  return imports;
}

function extractMetadataFromCSS(cssContent, cssFile) {
  // Buscar el comentario que contiene el objeto completo
  const commentMatch = cssContent.match(/\/\*\s*([\s\S]*?)\*\//);

  if (!commentMatch) {
    console.warn(`No se encontraron comentarios en ${cssFile}`);
    return null;
  }

  const commentContent = commentMatch[1].trim();

  // Verificar si el comentario contiene un objeto JavaScript
  if (!commentContent.startsWith('{') || !commentContent.includes('}')) {
    console.warn(`No se encontraron metadatos en formato de objeto en ${cssFile}`);
    return null;
  }

  try {
    // Intentar evaluar directamente el contenido del comentario
    const metadata = eval(`(${commentContent})`);

    // Asegurar que el cssFile esté presente
    if (!metadata.cssFile) {
      metadata.cssFile = cssFile;
    }

    return metadata;
  } catch (error) {
    console.error(`Error parseando metadatos de ${cssFile}:`, error.message);

    // Si falla, intentar extraer solo la parte del objeto
    try {
      const objectMatch = commentContent.match(/\{[\s\S]*\}/);
      if (objectMatch) {
        const objectStr = objectMatch[0];
        const metadata = eval(`(${objectStr})`);

        if (!metadata.cssFile) {
          metadata.cssFile = cssFile;
        }

        console.log(`✅ Recuperado con extracción de objeto: ${metadata.name} (${cssFile})`);
        return metadata;
      }
    } catch (secondError) {
      console.error(`Segundo intento fallido para ${cssFile}:`, secondError.message);
    }

    return null;
  }
}

function generateTextClassesFile(categories, textClasses) {
  // Construir el contenido del archivo
  const categoriesSection = categories.map(cat => `  '${cat}'`).join(',\n');

  const textClassesSection = textClasses.map(tc => {
    // Construir propiedades opcionales
    let optionalProps = '';

    // Agregar usesData si está presente
    if (tc.usesData) {
      optionalProps += 'usesData: true,\n    ';
    }

    // Agregar bestFor si está presente
    if (tc.bestFor && Array.isArray(tc.bestFor)) {
      optionalProps += `bestFor: [${tc.bestFor.map(item => `'${item}'`).join(', ')}],\n    `;
    }

    // Agregar reference si está presente
    if (tc.reference) {
      if (Array.isArray(tc.reference)) {
        optionalProps += `reference: [${tc.reference.map(ref => `'${ref}'`).join(', ')}],\n    `;
      } else {
        optionalProps += `reference: '${tc.reference}',\n    `;
      }
    }

    // Agregar cssVariants si está presente
    if (tc.cssVariants && Array.isArray(tc.cssVariants)) {
      optionalProps += `cssVariants: [${tc.cssVariants.map(variant => `'${variant}'`).join(', ')}],\n    `;
    }

    return `  {
    id: '${tc.id}',
    name: '${tc.name}',
    description: '${tc.description}',
    category: '${tc.category}',
    tags: [${tc.tags.map(tag => `'${tag}'`).join(', ')}],
    cssFile: '${tc.cssFile}',
    previewText: '${tc.previewText}',
    ${optionalProps}background: '${tc.background}'
  }`;
  }).join(',\n');

  return `import { TextClass } from '../types';

export const textClassesCategories = [
${categoriesSection}
];

export const textClasses: TextClass[] = [
${textClassesSection}
];
`;
}

async function main() {
  try {
    console.log('🚀 Generando textClasses.ts desde styles.css...');

    // Leer styles.css
    if (!fs.existsSync(stylesPath)) {
      throw new Error(`No se encontró el archivo styles.css en: ${stylesPath}`);
    }

    const stylesContent = fs.readFileSync(stylesPath, 'utf8');
    console.log('✅ Leyendo styles.css');

    // Extraer categorías
    const categories = extractCategoriesFromStyles(stylesContent);
    console.log(`✅ Categorías extraídas: ${categories.length}`);

    // Extraer imports
    const imports = extractImportsFromStyles(stylesContent);
    console.log(`✅ Imports encontrados: ${imports.length}`);

        // Procesar cada archivo CSS
    const textClasses = [];
    const errorFiles = [];
    let processedCount = 0;
    let errorCount = 0;

    for (const cssFile of imports) {
      const cssPath = path.join(textStylesDir, cssFile);

      if (!fs.existsSync(cssPath)) {
        const errorInfo = {
          file: cssFile,
          error: 'Archivo no encontrado',
          path: cssPath
        };
        errorFiles.push(errorInfo);
        console.warn(`⚠️  Archivo no encontrado: ${cssPath}`);
        errorCount++;
        continue;
      }

      const cssContent = fs.readFileSync(cssPath, 'utf8');
      const metadata = extractMetadataFromCSS(cssContent, cssFile);

      if (metadata) {
        textClasses.push(metadata);
        processedCount++;

        // Mostrar propiedades opcionales detectadas
        const optionalProps = [];
        if (metadata.usesData) optionalProps.push('usesData');
        if (metadata.bestFor) optionalProps.push('bestFor');
        if (metadata.reference) optionalProps.push('reference');
        if (metadata.cssVariants) optionalProps.push('cssVariants');

        const optionalText = optionalProps.length > 0 ? ` [${optionalProps.join(', ')}]` : '';
        console.log(`✅ Procesado: ${metadata.name} (${cssFile})${optionalText}`);
      } else {
        const errorInfo = {
          file: cssFile,
          error: 'Error parseando metadatos',
          path: cssPath
        };
        errorFiles.push(errorInfo);
        errorCount++;
      }
    }

    // Generar archivo textClasses.ts
    const generatedContent = generateTextClassesFile(categories, textClasses);

    // Escribir archivo
    fs.writeFileSync(textClassesPath, generatedContent, 'utf8');

    console.log(`\n🎉 ¡Archivo generado exitosamente!`);
    console.log(`📄 Archivo: ${textClassesPath}`);
    console.log(`📊 Categorías: ${categories.length}`);
    console.log(`🎨 Estilos procesados: ${processedCount}`);
    console.log(`❌ Archivos con errores: ${errorCount}`);
    console.log(`📁 Total archivos revisados: ${imports.length}`);

    // Mostrar lista detallada de archivos con errores
    if (errorFiles.length > 0) {
      console.log(`\n❌ ARCHIVOS CON ERRORES (${errorFiles.length}):`);
      console.log('═'.repeat(50));

      const notFoundFiles = errorFiles.filter(e => e.error === 'Archivo no encontrado');
      const parseErrorFiles = errorFiles.filter(e => e.error === 'Error parseando metadatos');

      if (notFoundFiles.length > 0) {
        console.log(`\n📁 Archivos no encontrados (${notFoundFiles.length}):`);
        notFoundFiles.forEach((errorInfo, index) => {
          console.log(`   ${index + 1}. ${errorInfo.file}`);
        });
      }

      if (parseErrorFiles.length > 0) {
        console.log(`\n🔧 Archivos con errores de sintaxis (${parseErrorFiles.length}):`);
        parseErrorFiles.forEach((errorInfo, index) => {
          console.log(`   ${index + 1}. ${errorInfo.file}`);
        });

        console.log(`\n💡 SOLUCIONES SUGERIDAS:`);
        console.log(`   • Revisar que los comentarios tengan formato válido de objeto JavaScript`);
        console.log(`   • Verificar que no falten comas antes de propiedades como 'reference'`);
        console.log(`   • Asegurar que las llaves de apertura y cierre estén balanceadas`);
        console.log(`   • Ejemplo de formato correcto:`);
        console.log(`     /*`);
        console.log(`     {`);
        console.log(`         id: 'mi-estilo',`);
        console.log(`         name: 'Mi Estilo',`);
        console.log(`         description: 'Descripción del estilo',`);
        console.log(`         category: 'Categoria',`);
        console.log(`         tags: ['tag1', 'tag2'],`);
        console.log(`         cssFile: 'mi-estilo.css',`);
        console.log(`         previewText: 'Preview',`);
        console.log(`         cssVariants: ['variant1', 'variant2'], // opcional`);
        console.log(`         background: '#ffffff'`);
        console.log(`     }`);
        console.log(`     */`);
      }
    } else {
      console.log(`\n✨ ¡Todos los archivos se procesaron sin errores!`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Ejecutar script si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, extractCategoriesFromStyles, extractImportsFromStyles, extractMetadataFromCSS };