# Registry

Sistema de registry para componentes, bloques y ejemplos de VOLTA.

## Estructura

```
registry/
├── config/              # 📦 Archivos de configuración
│   ├── schema.ts       # Schemas de validación Zod
│   ├── __index__.tsx   # Índice de componentes
│   ├── __blocks__.json # Metadata de bloques
│   ├── index.ts        # Registry principal
│   └── registry-*.ts   # Definiciones por tipo
├── assets/             # 📁 Assets compartidos (fonts, icons, logos)
├── components/         # 📁 Componentes UI
├── interface/          # 📁 Componentes de interfaz
├── patterns/           # 📁 Patterns, blocks, charts, examples
├── primitives/         # 📁 Componentes primitivos
├── styles/             # 📁 Temas CSS
└── tsconfig.json       # Config TypeScript

```

## Importaciones

### Desde Apps (apps/docs, apps/shad)

```typescript
// Schemas de validación
import { registryItemSchema, registryItemFileSchema } from "@/registry/config/schema"

// Índice de componentes
import { Index } from "@/registry/config/__index__"

// Registry principal
import { registry } from "@/registry/config/index"

// Definiciones específicas
import { baseColors } from "@/registry/config/registry-base-colors"
import { registryCategories } from "@/registry/config/registry-categories"
import { colors } from "@/registry/config/registry-colors"
```

### Desde Registry Config

Los archivos en `/registry/config/` se importan entre sí:

```typescript
// En registry/config/index.ts
import { blocks } from "@/registry/config/registry-blocks"
import { charts } from "@/registry/config/registry-charts"
import { examples } from "@/registry/config/registry-examples"
// etc.
```

## Dependencias

Cada carpeta dentro de `/registry` es un workspace package con su propio `package.json`:
- `@repo/registry-config` - Configuración del registry (schemas, índices)
  - `shadcn` - Schemas del CLI oficial
  - `zod` - Validación
- `@registry/assets` - Assets
- `@registry/components` - Componentes
- `@registry/interface` - Interface
- `@registry/patterns` - Patterns
- `@registry/primitives` - Primitives

## Migración

Si antes importabas:
```typescript
// ❌ Antiguo
import { registryItemSchema } from "@/registry/schema"
import { Index } from "@/registry/__index__"
```

Ahora debes importar:
```typescript
// ✅ Nuevo
import { registryItemSchema } from "@/registry/config/schema"
import { Index } from "@/registry/config/__index__"
```

## Archivos en /registry/config/

- `__blocks__.json` - Metadata de bloques para navegación
- `__index__.tsx` - Índice completo de componentes con metadata
- `index.ts` - Registry principal que agrupa todos los items
- `registry-base-colors.ts` - Colores base del tema
- `registry-blocks.ts` - Definiciones de blocks
- `registry-categories.ts` - Categorías de bloques
- `registry-charts.ts` - Componentes de charts
- `registry-colors.ts` - Paleta de colores
- `registry-examples.ts` - Ejemplos de uso
- `registry-hooks.ts` - Hooks personalizados
- `registry-icons.ts` - Iconos
- `registry-internal.ts` - Componentes internos
- `registry-lib.ts` - Utilidades
- `registry-themes.ts` - Temas
- `registry-ui.ts` - Componentes UI
- `schema.ts` - Schemas de validación Zod

## Por qué esta estructura?

1. **Organización**: Todos los archivos de configuración están juntos en `/config/`
2. **Separación**: Los archivos de config están separados de los packages (assets, components, etc.)
3. **Workspace**: Cada carpeta en `/registry` puede ser un package del monorepo con su propio `package.json`
4. **Claridad**: Es obvio que `/config/` contiene archivos de configuración del registry
5. **Monorepo**: No duplica dependencias - las apps usan lo que necesitan
