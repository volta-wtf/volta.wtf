# theme-editor

Zero-config, local-first CSS variable editor for React projects.

## 🚀 ¿Qué es theme-editor?

Una herramienta que permite **editar variables CSS en tiempo real** durante el desarrollo. Sin configuración, sin dependencias adicionales, sin complejidad.

- ✅ **Zero configuración**: Auto-detección de framework (Next.js, CRA, Vite)
- ✅ **Edición en vivo**: Variables CSS con actualización instantánea
- ✅ **Detección inteligente**: Encuentra automáticamente tu `globals.css`
- ✅ **Monorepo friendly**: Funciona en estructuras complejas
- ✅ **Solo desarrollo**: No afecta tu build de producción
- ✅ **Local-first**: Se ejecuta desde `node_modules`

## 🎯 Para qué sirve

Imagina poder cambiar colores, espaciados, tipografías y otros valores CSS **directamente desde un panel visual** mientras desarrollas, y si te gusta, al guardar estos cambios se **guarden directamente** en tu archivo `globals.css`.

```css
/* Antes: Editar a ciegas */
:root {
  --color-primary: #3b82f6;    /* ¿Qué color es este? */
  --spacing-lg: 2rem;          /* ¿Cómo se ve? */
  --font-size-xl: 1.25rem;     /* ¿Es suficiente? */
}

/* Después: Editor visual */
/* Cambia valores desde un panel, ve el resultado al instante */
```

## 🚀 Instalación y Uso

### 1. Instalar

```bash
npm install --save-dev theme-editor
```

### 2. Configurar scripts en `package.json`

```json
{
  "scripts": {
    "dev": "theme-editor next dev",
    "dev:cra": "theme-editor react-scripts start",
    "dev:vite": "theme-editor vite"
  }
}
```

### 3. Ejecutar

```bash
npm run dev
```

### 4. ¡Listo! 🎉

Cuando abras tu aplicación verás un **botón flotante "Theme"**. Haz clic para abrir el editor visual.

## 🎨 Características Principales

### 🔍 **Detección Automática**
- **Framework**: Next.js, Create React App, Vite
- **Estructura**: Proyectos estándar o monorepos
- **CSS**: Encuentra tu `globals.css` automáticamente

### 🎯 **Tipos de Variables Detectadas**
- **🎨 Colores**: `--color-primary`, `--bg-red-500`
- **📏 Espaciado**: `--spacing-lg`, `--gap-4`
- **✏️ Tipografía**: `--font-size-xl`, `--font-weight-bold`
- **🔲 Bordes**: `--border-radius`, `--border-width`
- **🌑 Sombras**: `--shadow-md`, `--elevation-2`

### 📱 **Previews Visuales**
Cada variable muestra un preview apropiado:
- Colores → Cuadrado de color
- Espaciados → Barra proporcional
- Tipografía → Texto "Aa"
- Bordes → Elemento con borde
- Sombras → Elemento con sombra

## 🏢 Soporte para Monorepos

### Estructura Estándar
```
mi-proyecto/
├── src/
│   ├── app/globals.css      ← Detectado automáticamente
│   └── styles/globals.css   ← También soportado
└── package.json
```

### Monorepo con @workspace/ui
```
monorepo/
├── packages/
│   └── ui/
│       └── src/styles/globals.css  ← CSS centralizado
├── apps/
│   ├── web/                        ← Ejecutas desde aquí
│   └── admin/
└── package.json
```

**Funciona desde cualquier ubicación:**
```bash
# Desde una app específica
cd /mi-monorepo/apps/web
npm run dev  # ← Encuentra automáticamente el CSS del sistema de diseño

# Desde la raíz del monorepo
cd /mi-monorepo
npm run dev  # ← También funciona
```

## 💡 Casos de Uso

### 🎨 **Ajustar Colores**
```css
:root {
  --color-primary: #3b82f6;     /* Edita visualmente */
  --color-success: #10b981;     /* Ve el resultado al instante */
  --color-warning: #f59e0b;     /* Sin recargar la página */
}
```

### 📏 **Calibrar Espaciados**
```css
:root {
  --spacing-xs: 0.25rem;        /* Ajusta con slider visual */
  --spacing-sm: 0.5rem;         /* Perfecto para responsive */
  --spacing-md: 1rem;           /* Sin adivinar valores */
}
```

### ✏️ **Afinar Tipografía**
```css
:root {
  --font-size-base: 1rem;       /* Ve el cambio en tiempo real */
  --font-weight-normal: 400;    /* En todo tu sitio */
  --line-height-relaxed: 1.6;   /* Sin compilar nada */
}
```

## 🛡️ Seguridad y Rendimiento

- **Solo desarrollo**: No se incluye en build de producción
- **Local-first**: Todo se ejecuta en tu máquina
- **Sin dependencias**: No añade peso a tu proyecto
- **Reversible**: Cambios se guardan en tu CSS, puedes deshacerlos

## 🤔 FAQ

### ¿Funciona con cualquier framework?
Sí, con Next.js, Create React App, Vite y cualquier setup que use variables CSS.

### ¿Necesito configurar algo?
No, detecta automáticamente tu setup y encuentra tu `globals.css`.

### ¿Funciona en monorepos?
Sí, detecta estructuras complejas y encuentra el CSS centralizado.

### ¿Se incluye en producción?
No, solo funciona en modo desarrollo.

### ¿Puedo personalizar qué variables editar?
Sí, edita cualquier variable CSS custom (`--variable-name`) en tu `globals.css`.

### ¿Qué pasa si rompo algo?
Los cambios se guardan en tu CSS, puedes usar git para revertir o editar manualmente.

## 🔗 Enlaces

- 📚 [Documentación para Desarrolladores](./DEVELOPMENT.md)
- 🧪 [Sistema de Tests](./src/test/README.md)
- 🤝 [Contribuir al Proyecto](./CONTRIBUTING.md)
- 🐛 [Reportar Problemas](https://github.com/tu-usuario/theme-editor/issues)

## 📄 Licencia

MIT License - Úsalo libremente en proyectos personales y comerciales.

---

**¿Te gusta theme-editor?** ⭐ Dale una estrella en GitHub y compártelo con otros desarrolladores.
