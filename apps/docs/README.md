# Documentation App

Aplicación de documentación para VOLTA usando fumadocs.

## Configuración

1. Instala las dependencias:

```bash
pnpm install
```

2. Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3004
```

3. Ejecuta el servidor de desarrollo:

```bash
pnpm dev
```

## Estructura

- `app/(app)/docs/` - Páginas de documentación
- `components/regions/` - Componentes principales del layout (sidebar, toc, breadcrumb, etc.)
- `components/interface/` - Componentes de interfaz (callout, copy button, code blocks, etc.)
- `components/partials/` - Componentes de preview y visualización de código
- `content/` - Contenido MDX de la documentación
- `lib/` - Utilidades y configuración (registry, highlight-code, utils, etc.)
- `hooks/` - Custom hooks (use-config, use-copy-to-clipboard)

## Contenido

El contenido se encuentra en la carpeta `content/` organizado por secciones:
- `(root)/` - Páginas principales
- `components/` - Documentación de componentes
- `installation/` - Guías de instalación
- `dark-mode/` - Configuración de dark mode

## Fumadocs

Esta aplicación usa [fumadocs](https://fumadocs.vercel.app) para generar la documentación a partir de archivos MDX.

La configuración se encuentra en:
- `source.config.ts` - Configuración de fumadocs y rehype plugins
- `lib/source.ts` - Fuente de datos de la documentación
- `lib/registry.ts` - Sistema de registry para componentes (usa schemas locales de `/registry/schema.ts`)
- `mdx-components.tsx` - Componentes personalizados para MDX

## Componentes de Documentación

### Partials (Preview de Componentes)
- `ComponentPreview` - Muestra preview interactivo de componentes con tabs
- `ComponentSource` - Muestra código fuente de componentes del registry
- `ComponentsList` - Lista de componentes disponibles

### Interface (Controles y UI)
- `Callout` - Alertas y notas informativas
- `CodeBlockCommand` - Bloques de comandos con selector npm/yarn/pnpm/bun
- `CodeCollapsibleWrapper` - Wrapper para código colapsable
- `CodeTabs` - Tabs para diferentes tipos de instalación
- `CopyButton` - Botón para copiar código
- `Icons` - Iconos para lenguajes de programación

### Regions (Layout)
- `DocsSidebar` - Navegación lateral de documentación
- `DocsTableOfContents` - Tabla de contenidos
- `DocsCopyPage` - Botón para copiar página completa
- `DocsBreadcrumb` - Breadcrumbs de navegación

## Schemas del Registry

Los schemas de validación (`registryItemSchema`, `registryItemFileSchema`) se importan desde el monorepo:
```typescript
import { registryItemSchema, registryItemFileSchema } from "@/registry/config/schema"
```

No se usa la dependencia npm `shadcn` - los schemas están definidos localmente en `/registry/config/schema.ts`.
