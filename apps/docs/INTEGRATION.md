# Integración de Fumadocs - Resumen

## ✅ Completado

### 📦 Dependencias
Todas las dependencias necesarias están en `package.json`:
- `fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui` - Framework de documentación
- `@vercel/analytics` - Analytics
- `jotai` - State management
- `@tabler/icons-react`, `lucide-react` - Iconos
- `next-themes` - Gestión de temas
- `rehype-pretty-code`, `shiki` - Syntax highlighting
- `ts-morph` - Para procesar archivos TypeScript del registry
- `tailwind-merge`, `clsx`, `zod` - Utilidades

**Nota importante:** NO se usa `shadcn` npm package - los schemas se importan localmente desde `/registry/schema.ts`

### 📁 Estructura de Archivos

#### Configuración
- ✅ `source.config.ts` - Config de fumadocs
- ✅ `next.config.js` - Config Next.js con fumadocs-mdx
- ✅ `mdx-components.tsx` - Componentes MDX
- ✅ `tsconfig.json` - Paths configurados

#### Lib
- ✅ `lib/source.ts` - Carga docs desde fumadocs
- ✅ `lib/registry.ts` - Sistema de registry (usa `/registry/config/schema.ts`)
- ✅ `lib/highlight-code.ts` - Syntax highlighting
- ✅ `lib/utils.ts` - Utilidades (cn, absoluteUrl)
- ✅ `lib/docs.ts` - Páginas nuevas
- ✅ `lib/flags.ts` - Feature flags
- ✅ `lib/events.ts` - Analytics tracking

#### Hooks
- ✅ `hooks/use-copy-to-clipboard.ts`
- ✅ `hooks/use-config.ts` - Config global (package manager)

#### Components/Regions (Layout Principal)
- ✅ `components/regions/docs-sidebar.tsx`
- ✅ `components/regions/docs-toc.tsx`
- ✅ `components/regions/docs-copy-page.tsx`
- ✅ `components/regions/docs-breadcrumb.tsx`

#### Components/Interface (Controles de UI)
- ✅ `components/interface/callout.tsx`
- ✅ `components/interface/copy-button.tsx`
- ✅ `components/interface/code-block-command.tsx`
- ✅ `components/interface/code-collapsible-wrapper.tsx`
- ✅ `components/interface/code-tabs.tsx`
- ✅ `components/interface/icons.tsx`

#### Components/Partials (Preview de Componentes)
- ✅ `components/partials/component-preview.tsx`
- ✅ `components/partials/component-preview-tabs.tsx`
- ✅ `components/partials/component-source.tsx`
- ✅ `components/partials/components-list.tsx`

#### App Structure
- ✅ `app/layout.tsx` - Layout raíz
- ✅ `app/(app)/layout.tsx` - Layout app
- ✅ `app/(app)/docs/layout.tsx` - Layout docs con sidebar
- ✅ `app/(app)/docs/[[...slug]]/page.tsx` - Página dinámica

## 🎯 Cómo Usar

### 1. Instalar Dependencias
```bash
cd apps/docs
pnpm install
```

### 2. Configurar Variables de Entorno
Crear `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3004
```

### 3. Ejecutar
```bash
pnpm dev
```

El comando `postinstall: fumadocs-mdx` generará automáticamente `.source/` con los tipos.

## 📝 Uso en MDX

### Componentes Disponibles

#### Preview de Componentes
```mdx
<ComponentPreview name="button-demo" />
<ComponentSource name="button" />
<ComponentsList />
```

#### Callouts y Alertas
```mdx
<Callout>
  Nota importante
</Callout>
```

#### Bloques de Código
```mdx
<CodeTabs>
  <TabsContent value="cli">
    ```bash
    npm install component
    ```
  </TabsContent>
</CodeTabs>
```

Los comandos npm se transforman automáticamente:
```bash
npm install package
```
Se convierte en tabs con npm/yarn/pnpm/bun.

## 🔧 Detalles Técnicos

### Schemas del Registry
```typescript
// ✅ Correcto - usa schemas locales
import { registryItemSchema, registryItemFileSchema } from "@/registry/config/schema"

// ❌ NO usar - no tenemos esta dependencia
import { registryItemSchema } from "shadcn/schema"
```

Los schemas están definidos en `/registry/config/schema.ts` del monorepo, no en un paquete npm.

**Nota:** Los archivos de configuración del registry están organizados en `/registry/config/`:
- `schema.ts` - Schemas de validación Zod
- `__index__.tsx` - Índice de componentes
- `registry-*.ts` - Definiciones de componentes, bloques, ejemplos, etc.
- `index.ts` - Registry principal

### Procesamiento de Código
`ts-morph` se usa en `lib/registry.ts` para:
1. Parsear archivos TS/TSX del registry
2. Convertir `export default` a `export`
3. Arreglar imports (`@/registry/*` → `@/components/*`)
4. Limpiar metadata

### Rutas del Monorepo
`lib/registry.ts` resuelve rutas desde el monorepo root:
```typescript
// apps/docs está 2 niveles abajo del monorepo root
const monorepoRoot = path.join(process.cwd(), '..', '..')
```

## 📂 Contenido

El contenido MDX está en `content/`:
- `(root)/` - Páginas principales (about, changelog, etc.)
- `components/` - Docs de componentes
- `installation/` - Guías de instalación
- `dark-mode/` - Config de dark mode
- `meta.json` - Metadata de secciones

## 🚀 Próximos Pasos

1. Ejecutar `pnpm install` en `apps/docs`
2. Crear `.env.local`
3. Ejecutar `pnpm dev`
4. Verificar que fumadocs genera `.source/`
5. Navegar a http://localhost:3004

La documentación debería funcionar con:
- ✅ Navegación lateral (sidebar)
- ✅ Tabla de contenidos
- ✅ Preview de componentes
- ✅ Syntax highlighting
- ✅ Breadcrumbs
- ✅ Copiar código
- ✅ Tabs para package managers
