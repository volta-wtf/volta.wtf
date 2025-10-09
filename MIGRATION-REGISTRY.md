# Migración: Reorganización del Registry

## Cambios Realizados

Se reorganizó la estructura del registry moviendo todos los archivos de configuración a `/registry/config/`.

### Antes

```
registry/
├── __blocks__.json
├── __index__.tsx
├── index.ts
├── schema.ts
├── registry-*.ts (16 archivos)
├── assets/
├── components/
├── interface/
├── patterns/
├── primitives/
└── styles/
```

### Después

```
registry/
├── config/                    # ✨ NUEVO
│   ├── __blocks__.json       # ⬅️ Movido
│   ├── __index__.tsx         # ⬅️ Movido
│   ├── index.ts              # ⬅️ Movido
│   ├── schema.ts             # ⬅️ Movido
│   └── registry-*.ts         # ⬅️ Movido (16 archivos)
├── config/
│   └── package.json          # ✨ NUEVO
├── README.md                 # ✨ NUEVO
├── tsconfig.json
├── assets/
├── components/
├── interface/
├── patterns/
├── primitives/
└── styles/
```

## Archivos Actualizados

### Registry

- ✅ `/registry/config/index.ts` - Importaciones actualizadas
- ✅ `/registry/config/registry-themes.ts` - Importaciones actualizadas
- ✅ `/registry/config/package.json` - Creado (workspace package)
- ✅ `/registry/README.md` - Creado

### apps/docs

- ✅ `lib/registry.ts`
- ✅ `components/partials/component-preview.tsx`
- ✅ `README.md`
- ✅ `INTEGRATION.md`

### apps/shad

- ✅ `lib/registry.ts`
- ✅ `lib/rehype.ts`
- ✅ `lib/llm.ts`
- ✅ `lib/colors.ts`
- ✅ `components/component-preview.tsx`
- ✅ `components/theme-customizer.tsx`
- ✅ `components/blocks-nav.tsx`
- ✅ `app/(app)/blocks/[...categories]/page.tsx`
- ✅ `app/(internal)/sink/components/app-sidebar.tsx`

## Importaciones Actualizadas

### Schema

```diff
- import { registryItemSchema } from "@/registry/schema"
+ import { registryItemSchema } from "@/registry/config/schema"
```

### Index

```diff
- import { Index } from "@/registry/__index__"
+ import { Index } from "@/registry/config/__index__"
```

### Registry Files

```diff
- import { blocks } from "@/registry/registry-blocks"
+ import { blocks } from "@/registry/config/registry-blocks"

- import { baseColors } from "@/registry/registry-base-colors"
+ import { baseColors } from "@/registry/config/registry-base-colors"

- import { registryCategories } from "@/registry/registry-categories"
+ import { registryCategories } from "@/registry/config/registry-categories"

- import { colors } from "@/registry/registry-colors"
+ import { colors } from "@/registry/config/registry-colors"
```

## Próximos Pasos

1. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

2. **Verificar builds**:
   ```bash
   # Registry
   cd registry
   pnpm typecheck

   # Apps
   cd ../apps/docs
   pnpm typecheck

   cd ../apps/shad
   pnpm typecheck
   ```

3. **Ejecutar apps**:
   ```bash
   # Docs
   cd apps/docs
   pnpm dev

   # Shad
   cd apps/shad
   pnpm dev
   ```

## Ventajas

1. ✅ **Organización clara**: Archivos de config separados de packages
2. ✅ **Workspace package**: `registry/config` es un package formal con sus dependencias
3. ✅ **Type-safe**: `zod` y `shadcn` declarados correctamente
4. ✅ **Mejor DX**: Es obvio dónde están los archivos de configuración

## Rollback (si es necesario)

Para revertir los cambios:

```bash
cd /Users/cristian/Sites/volta.wtf/registry
mv config/* .
rmdir config
rm README.md
```

Luego revertir las importaciones cambiando:
```typescript
"@/registry/config/" → "@/registry/"
```

## Archivos No Movidos

- `tsconfig.json` - Se quedó en `/registry` porque es la config de TypeScript para todo el directorio
- Carpetas (`assets/`, `components/`, etc.) - Se quedaron en su lugar

## Verificación

Para verificar que todo funciona:

```bash
# Buscar importaciones antiguas
grep -r "@/registry/schema\"" apps/ --include="*.ts" --include="*.tsx"
grep -r "@/registry/__index__\"" apps/ --include="*.ts" --include="*.tsx"
grep -r "@/registry/registry-" apps/ --include="*.ts" --include="*.tsx"

# No debería encontrar nada (exit code 1 es esperado)
```
