# Scripts de Assets

Este directorio contiene scripts para manejar los assets compartidos desde el paquete `@repo/assets`.

## Scripts Disponibles

### `setup-symlinks.js`
Crea symlinks para desarrollo local. Los symlinks se incluyen en Git y funcionan perfectamente para desarrollo.

**Uso:**
```bash
# Desde cualquier aplicación que use @repo/assets
node node_modules/@repo/assets/scripts/setup-symlinks.js
# O usando el script configurado en package.json
pnpm run setup-assets
```

**Qué hace:**
- Se ejecuta desde el directorio de la aplicación que usa `@repo/assets`
- Crea el directorio `public` si no existe
- Elimina el directorio/symlink `public/shared` existente
- Crea un symlink `public/shared -> node_modules/@repo/assets/shared`

### `copy-assets.js`
Copia los assets físicamente para producción (Vercel, builds, etc.).

**Uso:**
```bash
# Desde cualquier aplicación que use @repo/assets
node node_modules/@repo/assets/scripts/copy-assets.js
# O usando el script configurado en package.json (prebuild)
pnpm run build
```

**Qué hace:**
- Se ejecuta desde el directorio de la aplicación que usa `@repo/assets`
- Crea el directorio `public` si no existe
- Elimina el symlink/directorio `public/shared` si existe
- Copia solo el contenido del directorio `shared` del paquete (`icons`, `logos`, etc.)

## Configuración en las Aplicaciones

Para usar estos scripts en una aplicación, agrega estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "setup-assets": "node node_modules/@repo/assets/scripts/setup-symlinks.js",
    "prebuild": "node node_modules/@repo/assets/scripts/copy-assets.js"
  }
}
```

## Flujo de Trabajo Recomendado

### Para Desarrollo Local:
1. `pnpm run setup-assets` - Configura symlinks
2. `pnpm run dev` - Desarrollo normal

### Para Producción:
1. `pnpm run build` - Automáticamente copia assets y hace build

## Ventajas de esta Solución

- ☑️ **Desarrollo rápido**: Symlinks permiten cambios instantáneos
- ☑️ **Vercel-compatible**: Los assets se copian físicamente para deploy
- ☑️ **Centralizado**: Los scripts están en el paquete `@repo/assets`
- ☑️ **Reutilizable**: Cualquier app puede usar los scripts
- ☑️ **No invasivo**: Mantiene el directorio `public` de cada app intacto
- ☑️ **Solo contenido shared**: Copia únicamente el contenido del directorio `shared`

## Script de Archivos de Configuración

Además de los assets, el monorepo incluye un script para manejar archivos de configuración compartidos.

### `config.files.js`
Crea symlinks de archivos de configuración desde `packages/config-files/` hacia las aplicaciones.

**Uso:**
```bash
# Desde el directorio raíz del monorepo
pnpm run config

# O directamente
node config.files.js
```

**Configuración en el `package.json` raíz:**
```json
{
  "scripts": {
    "config": "node config.files.js"
  }
}
```

**Qué hace:**
- Escanea `packages/config-files/apps/` para archivos de configuración
- Escanea `packages/config-files/sites/` para archivos de configuración
- Para cada app en `apps/*` y cada site en `sites/*`:
  - **Solo crea symlinks si el archivo NO existe** (no sobrescribe)
  - Usa rutas relativas para portabilidad
  - Muestra resumen detallado de archivos creados/omitidos

**Ejemplo de configuración:**
```
apps/catalog/eslint.config.js -> ../../packages/config-files/apps/eslint.config.js
apps/catalog/tsconfig.json -> ../../packages/config-files/apps/tsconfig.json
```

**Ventajas:**
- ☑️ **Centralizado**: Configuraciones en un solo lugar
- ☑️ **Seguro**: No sobrescribe archivos existentes
- ☑️ **Vercel-compatible**: Los symlinks de archivos funcionan en Vercel
- ☑️ **Selectivo**: Solo actúa donde es necesario

## Notas Importantes

- Los symlinks solo funcionan en desarrollo local
- Para producción (Vercel), siempre se usan copias físicas
- Los scripts se ejecutan desde el directorio de la aplicación
- Solo se copia el contenido del directorio `shared` del paquete
- **Archivos de configuración**: Los symlinks de archivos individuales SÍ funcionan en Vercel
