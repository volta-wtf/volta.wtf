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
    // Evaluar el contenido del comentario como objeto JavaScript
    const metadata = eval(`(${commentContent})`);

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

    // Generar imports: primero archivos CSS locales, luego subdirectorios
    for (const file of cssFiles.sort()) {
      imports.push(`@import "./${file}";`);
    }
    for (const subdir of subdirs.sort()) {
      imports.push(`@import "./${subdir}/index.css";`);
    }

    // Escribir index.css si hay imports
    if (imports.length > 0) {
      const indexPath = path.join(dir, 'index.css');
      const content = `/* AUTOGENERATED — run: pnpm run gen:catalog */\n${imports.join('\n')}\n`;
      fs.writeFileSync(indexPath, content, 'utf8');

      const relPath = path.relative(WEB_ROOT, indexPath);
      console.log(`  ✔ ${relPath}`);
    }

    return imports;
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
