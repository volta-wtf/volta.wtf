import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";
import { globby } from "globby";
import matter from "gray-matter";
import { CATEGORIES_CONFIG, type CategoryConfig } from "../catalog.config";

const WEB_ROOT = process.cwd();

// Constante para controlar la generación de archivos index.css
const GENERATE_CSS_INDEXES = true;

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/(^-|-$)/g, "");
}
function titleFromFilename(fp: string) {
  const base = path.basename(fp, path.extname(fp));
  return base.replace(/[-_]/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
}

async function collectMarkdown(conf: CategoryConfig) {
  const files = await globby(conf.markdownGlob ?? [], { cwd: WEB_ROOT });
  return files.map((rel) => {
    const abs = path.join(WEB_ROOT, rel);
    const file = fs.readFileSync(abs, "utf8");
    const { data } = matter(file);
    const title = data?.title ?? titleFromFilename(abs);
    const slug = toSlug(path.basename(abs, path.extname(abs)));
    const mdPath = rel;
    return { title, slug, mdPath, sourceFile: rel };
  });
}

async function collectComponents(conf: CategoryConfig) {
  const files = await globby(conf.componentsGlobs ?? [], { cwd: WEB_ROOT });
  return files.map((rel) => {
    const name = path.basename(rel).replace(/\.(tsx|jsx|ts|js)$/i, "");
    const title = name.replace(/[-_]/g, " ");
    const slug = toSlug(name);
    return { title, slug, componentName: name, sourceFile: rel };
  });
}

function extractMetadataFromCSS(cssContent: string, cssFile: string) {
  // Buscar el comentario que contiene el objeto de metadatos
  const commentMatch = cssContent.match(/\/\*\s*([\s\S]*?)\*\//);

  if (!commentMatch) {
    console.warn(`⚠️  No se encontraron metadatos en ${cssFile}`);
    return null;
  }

  const commentContent = commentMatch[1]?.trim();

  // Verificar si el comentario contiene un objeto JavaScript
  if (!commentContent || !commentContent.startsWith('{') || !commentContent.includes('}')) {
    console.warn(`⚠️  Formato de metadatos inválido en ${cssFile}`);
    return null;
  }

  try {
    // Limpiar el contenido: eliminar coma final si existe
    let cleanedContent = commentContent.trim();
    // Si termina con coma después del cierre de llave, eliminarla
    cleanedContent = cleanedContent.replace(/}\s*,\s*$/, '}');

    // Evaluar el contenido del comentario como objeto JavaScript
    const metadata = eval(`(${cleanedContent})`);

    // Asegurar que el cssFile esté presente
    if (!metadata.cssFile) {
      metadata.cssFile = cssFile;
    }

    return metadata;
  } catch (error) {
    console.error(`❌ Error parseando metadatos de ${cssFile}:`, (error as Error).message);
    return null;
  }
}

function detectUsesData(cssContent: string): boolean {
  // Detectar si el CSS usa attr(data-text)
  return cssContent.includes('attr(data-text)');
}

function extractCSSVariantsFromContent(cssContent: string, mainClassName: string): string[] {
  // Extraer variantes del CSS (clases modificadoras como .clear, .inverse, etc.)
  const variants: string[] = [];
  // Escapar caracteres especiales en el nombre de la clase para regex
  const escapedClassName = mainClassName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const variantRegex = new RegExp(`\\.${escapedClassName}\\.(\\w+)`, 'g');
  let match: RegExpExecArray | null;

  while ((match = variantRegex.exec(cssContent)) !== null) {
    const variant = match[1];
    if (variant && !variants.includes(variant)) {
      variants.push(variant);
    }
  }

  return variants;
}

async function collectClasses(conf: CategoryConfig) {
  const files = await globby(conf.classesGlobs ?? [], { cwd: WEB_ROOT });
  const items: any[] = [];

  // Obtener el orden de los imports del index.css si existe
  let importOrder: string[] = [];
  if (conf.classesGlobs && conf.classesGlobs.length > 0) {
    // Encontrar el primer directorio base de los globs (ej: "styles/classes/text/**/*.css")
    const firstGlob = conf.classesGlobs[0];
    if (firstGlob) {
      const baseDirMatch = firstGlob.match(/^(.+?)\/\*\*/);
      if (baseDirMatch && baseDirMatch[1]) {
        const baseDir = baseDirMatch[1];
        const indexPath = path.join(WEB_ROOT, baseDir, 'index.css');

        if (fs.existsSync(indexPath)) {
          const indexContent = fs.readFileSync(indexPath, 'utf8');
          const importMatches = Array.from(indexContent.matchAll(/@import\s+["']\.\/(.+?)["'];?/g));
          importOrder = importMatches.map(match => match[1]).filter((fileName): fileName is string => fileName !== undefined);
          console.log(`📋 Orden de index.css encontrado: ${importOrder.length} archivos`);
        }
      }
    }
  }

  for (const rel of files) {
    // Saltar archivos index.css
    if (rel.endsWith('index.css')) {
      continue;
    }

    const abs = path.join(WEB_ROOT, rel);
    const css = fs.readFileSync(abs, "utf8");

    // Extraer metadatos del comentario
    const metadata = extractMetadataFromCSS(css, path.basename(rel));

    if (metadata) {
      // Usar metadatos del archivo
      const usesData = metadata.usesData ?? detectUsesData(css);

      // Extraer variantes CSS del contenido si no están en metadatos
      let cssVariants = metadata.cssVariants || [];
      if (!cssVariants.length && metadata.id) {
        const mainClass = `text-${metadata.id}`;
        cssVariants = extractCSSVariantsFromContent(css, mainClass);
      }

      items.push({
        title: metadata.name || titleFromFilename(rel),
        slug: metadata.id || toSlug(path.basename(rel, path.extname(rel))),
        cssClass: `text-${metadata.id}`,
        sourceFile: rel,
        description: metadata.description,
        category: metadata.category,
        tags: metadata.tags || [],
        previewText: metadata.previewText || 'Aa',
        background: metadata.background || '#ffffff',
        usesData,
        cssVariants,
        bestFor: metadata.bestFor,
        reference: metadata.reference,
      });

      console.log(`✅ ${metadata.name} (${rel})${usesData ? ' [usesData]' : ''}${cssVariants.length ? ` [variants: ${cssVariants.join(', ')}]` : ''}`);
    } else {
      // Fallback: extraer clases del CSS usando el método anterior
      const root = postcss.parse(css, { from: abs });
      const classSet = new Set<string>();
      root.walkRules((rule) => {
        selectorParser((sel) => {
          sel.walkClasses((c) => {
            classSet.add(c.value);
          });
        }).processSync(rule.selector);
      });

      // Tomar la primera clase como principal
      const firstClass = [...classSet][0];
      if (firstClass) {
        const usesData = detectUsesData(css);
        const cssVariants = extractCSSVariantsFromContent(css, firstClass);

        items.push({
          title: firstClass.replace(/[-_]/g, " "),
          slug: toSlug(firstClass),
          cssClass: firstClass,
          sourceFile: rel,
          usesData,
          cssVariants,
        });

        console.log(`⚠️  ${firstClass} (${rel}) - sin metadatos${usesData ? ' [usesData]' : ''}`);
      }
    }
  }

  // Ordenar según el orden del index.css si existe, sino alfabéticamente
  if (importOrder.length > 0) {
    return items.sort((a, b) => {
      const aFileName = path.basename(a.sourceFile);
      const bFileName = path.basename(b.sourceFile);
      const aIndex = importOrder.indexOf(aFileName);
      const bIndex = importOrder.indexOf(bFileName);

      // Si ambos están en el orden, usar ese orden
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      // Si solo uno está en el orden, el que está primero
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      // Si ninguno está, ordenar alfabéticamente al final
      return a.title.localeCompare(b.title);
    });
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}

async function collectVariables(conf: CategoryConfig) {
  const items: any[] = [];

  // Si se especifican archivos individuales, procesarlos
  if (conf.variablesFiles && conf.variablesFiles.length > 0) {
    for (const rel of conf.variablesFiles) {
      const abs = path.join(WEB_ROOT, rel);
      const css = fs.readFileSync(abs, "utf8");
      const root = postcss.parse(css, { from: abs });

      root.walkDecls((decl) => {
        if (decl.prop.startsWith("--")) {
          const variableName = decl.prop;
          const title = variableName.replace(/^--/, "").replace(/[-_]/g, " ");
          const slug = toSlug(variableName.replace(/^--/, ""));
          const value = decl.value;

          items.push({
            title,
            slug,
            variableName,
            value,
            sourceFile: rel
          });
        }
      });

      console.log(`✅ Variables extraídas de ${rel}: ${items.filter(i => i.sourceFile === rel).length}`);
    }
  }

  // Si se especifican globs de presets, procesarlos también
  if (conf.presetsGlobs && conf.presetsGlobs.length > 0) {
    const files = await globby(conf.presetsGlobs, { cwd: WEB_ROOT });

    for (const rel of files) {
      const abs = path.join(WEB_ROOT, rel);
      const css = fs.readFileSync(abs, "utf8");
      const root = postcss.parse(css, { from: abs });

      root.walkDecls((decl) => {
        if (decl.prop.startsWith("--")) {
          const variableName = decl.prop;
          const title = variableName.replace(/^--/, "").replace(/[-_]/g, " ");
          const slug = toSlug(variableName.replace(/^--/, ""));
          const value = decl.value;

          items.push({
            title,
            slug,
            variableName,
            value,
            sourceFile: rel
          });
        }
      });
    }

    console.log(`✅ Variables de presets: ${items.filter(i => conf.presetsGlobs?.some(g => i.sourceFile.includes(g.replace('*.css', '')))).length}`);
  }

  return items;
}

async function collectPresets(conf: CategoryConfig) {
  const files = await globby(conf.presetsGlobs ?? [], { cwd: WEB_ROOT });
  const items: any[] = [];

  for (const rel of files) {
    const abs = path.join(WEB_ROOT, rel);
    const css = fs.readFileSync(abs, "utf8");
    const name = path.basename(rel, path.extname(rel));
    const title = name.replace(/[-_]/g, " ");
    const slug = toSlug(name);

    // Intentar extraer metadatos del archivo
    const metadata = extractMetadataFromCSS(css, path.basename(rel));

    if (metadata) {
      items.push({
        title: metadata.name || title,
        slug: metadata.id || slug,
        presetName: name,
        sourceFile: rel,
        description: metadata.description,
        category: metadata.category,
        tags: metadata.tags || [],
      });

      console.log(`✅ Preset: ${metadata.name || title} (${rel})`);
    } else {
      // Fallback sin metadatos
      items.push({
        title,
        slug,
        presetName: name,
        sourceFile: rel
      });

      console.log(`⚠️  Preset: ${title} (${rel}) - sin metadatos`);
    }
  }

  return items;
}

async function generateCSSIndexes(baseDir: string) {
  const stylesRoot = path.join(WEB_ROOT, baseDir);

  if (!fs.existsSync(stylesRoot)) {
    console.log(`⚠️  Directorio ${baseDir} no existe, saltando generación de index.css`);
    return;
  }

  // Función recursiva para procesar directorios
  function processDirectory(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const imports: string[] = [];
    const subdirs: string[] = [];

    // Primero procesar subdirectorios recursivamente
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subdirPath = path.join(dir, entry.name);
        const subImports = processDirectory(subdirPath);

        // Si el subdirectorio tiene contenido CSS, agregar su index
        if (subImports.length > 0) {
          subdirs.push(entry.name);
        }
      }
    }

    // Luego recolectar archivos CSS (excepto index.css)
    const cssFiles: string[] = [];
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.css') && entry.name !== 'index.css') {
        cssFiles.push(entry.name);
      }
    }

    // Escribir index.css si hay imports
    if (cssFiles.length > 0 || subdirs.length > 0) {
      const indexPath = path.join(dir, 'index.css');

      // Verificar si el archivo ya existe
      if (fs.existsSync(indexPath)) {
        const existingContent = fs.readFileSync(indexPath, 'utf8');

        // Extraer imports existentes (líneas que comienzan con @import)
        const existingImports = existingContent
          .split('\n')
          .filter(line => line.trim().startsWith('@import'))
          .map(line => line.trim());

        // Extraer nombres de archivos del orden existente
        const existingOrder: string[] = [];
        for (const imp of existingImports) {
          const match = imp.match(/@import\s+["']\.\/(.+?)["'];?/);
          if (match && match[1]) {
            existingOrder.push(match[1]);
          }
        }

        // Crear un Set de archivos existentes para verificación rápida
        const existingFilesSet = new Set(existingOrder);

        // Encontrar imports que deben eliminarse (archivos que ya no existen)
        const removedImports = existingImports.filter(imp => {
          const match = imp.match(/@import\s+["']\.\/(.+?)["'];?/);
          if (!match || !match[1]) return false;
          const fileName = match[1];
          const filePath = path.join(dir, fileName);
          return !fs.existsSync(filePath);
        });

        // Encontrar archivos nuevos que no están en el orden existente
        const newFiles = cssFiles.filter(file => !existingFilesSet.has(file));
        const newSubdirs = subdirs.filter(subdir => !existingFilesSet.has(`${subdir}/index.css`));

        // Construir el orden preservando el orden manual existente
        const orderedImports: string[] = [];

        // Primero mantener el orden existente de archivos que aún existen
        for (const fileName of existingOrder) {
          const filePath = path.join(dir, fileName);
          if (fs.existsSync(filePath)) {
            // Verificar si es un archivo CSS o un subdirectorio
            if (fileName.endsWith('/index.css')) {
              const subdirName = fileName.replace('/index.css', '');
              if (subdirs.includes(subdirName)) {
                orderedImports.push(`@import "./${fileName}";`);
              }
            } else if (cssFiles.includes(fileName)) {
              orderedImports.push(`@import "./${fileName}";`);
            }
          }
        }

        // Agregar archivos nuevos al final, ordenados alfabéticamente
        for (const file of newFiles.sort()) {
          orderedImports.push(`@import "./${file}";`);
        }
        for (const subdir of newSubdirs.sort()) {
          orderedImports.push(`@import "./${subdir}/index.css";`);
        }

        // Comparar si hay cambios
        const hasChanges = removedImports.length > 0 || newFiles.length > 0 || newSubdirs.length > 0;

        if (hasChanges) {
          // Regenerar el archivo preservando el orden manual
          const content = `/* AUTOGENERATED — run: pnpm run gen:catalog */\n${orderedImports.join('\n')}\n`;
          fs.writeFileSync(indexPath, content, 'utf8');

          const relPath = path.relative(WEB_ROOT, indexPath);
          const changes = [];
          if (removedImports.length > 0) changes.push(`${removedImports.length} eliminados`);
          if (newFiles.length > 0 || newSubdirs.length > 0) {
            const totalNew = newFiles.length + newSubdirs.length;
            changes.push(`${totalNew} nuevos`);
          }
          console.log(`  ✔ ${relPath} (${changes.join(', ')})`);
        } else {
          const relPath = path.relative(WEB_ROOT, indexPath);
          console.log(`  ✔ ${relPath} (sin cambios)`);
        }

        // Retornar los imports ordenados preservados (ya sea con cambios o sin cambios)
        return orderedImports;
      } else {
        // Crear nuevo archivo - ordenar alfabéticamente
        const newImports: string[] = [];
        for (const file of cssFiles.sort()) {
          newImports.push(`@import "./${file}";`);
        }
        for (const subdir of subdirs.sort()) {
          newImports.push(`@import "./${subdir}/index.css";`);
        }
        const content = `/* AUTOGENERATED — run: pnpm run gen:catalog */\n${newImports.join('\n')}\n`;
        fs.writeFileSync(indexPath, content, 'utf8');

        const relPath = path.relative(WEB_ROOT, indexPath);
        console.log(`  ✔ ${relPath} (nuevo)`);

        // Retornar los imports generados
        return newImports;
      }
    }

    // Si no hay archivos CSS ni subdirectorios, retornar array vacío
    return [];
  }

  console.log(`\n📝 Generando archivos index.css en ${baseDir}...`);
  processDirectory(stylesRoot);
}

async function build() {
  const categories: any[] = [];
  for (const conf of CATEGORIES_CONFIG) {
    let items: any[] = [];
    if (conf.type === "markdown") items = await collectMarkdown(conf);
    if (conf.type === "component") items = await collectComponents(conf);
    if (conf.type === "css-classes") items = await collectClasses(conf);
    if (conf.type === "variables") items = await collectVariables(conf);
    if (conf.type === "presets") items = await collectPresets(conf);

    categories.push({ name: conf.name, label: conf.label, type: conf.type, view: conf.view, tags: conf.tags ?? [], items });
  }

  const out = `/* AUTOGENERATED — run: pnpm run gen:catalog */
import type { Category } from "./catalog.runtime";

export const CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategory(name: string): Category | undefined {
  return CATEGORIES.find((c) => c.name === name);
}

export function getItem(category: string, itemSlug: string) {
  const cat = getCategory(category);
  return cat?.items.find((i) => i.slug === itemSlug);
}

export default CATEGORIES;
`;
  const outFile = path.join(WEB_ROOT, "lib/catalog.gen.ts");
  fs.writeFileSync(outFile, out, "utf8");
  console.log("✔ catalog generated:", path.relative(process.cwd(), outFile));

  // Generar index.css en cada nivel (solo si está habilitado)
  if (GENERATE_CSS_INDEXES) {
    await generateCSSIndexes("styles");
  } else {
    console.log("\n⏭️  Generación de index.css deshabilitada");
  }
}

build().catch((e) => { console.error(e); process.exit(1); });
