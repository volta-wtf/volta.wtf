# theme-editor - Documentación para Desarrolladores

Documentación técnica del sistema de estilos dinámicos y funcionamiento interno del theme-editor.

## 🎨 Sistema de Estilos Dinámicos

El theme-editor incluye un innovador sistema que convierte automáticamente objetos de estilos JavaScript en clases CSS con estados nativos.

### Características del Sistema

- **🔄 Conversión automática**: Objeto JS → CSS automáticamente
- **⚡ Estados nativos**: `:hover`, `:focus`, `:active` sin JavaScript
- **🎯 Nomenclatura consistente**: Prefijo `te-` evita conflictos
- **🔧 Helpers específicos**: Funciones para casos comunes
- **📱 Una fuente de verdad**: Todo en `panel-styles.js`

### Uso Básico

```javascript
// 1. Importar el sistema
import { injectDynamicStyles } from './dynamic-styles.js';
import { cls, cn } from '../app/class-names.js';

// 2. Inyectar estilos al montar la app
React.useEffect(() => {
  injectDynamicStyles();
}, []);

// 3. Usar clases en componentes
<div className={cls('panel')}>
  <button className={cn('tab', { active: isActive })}>
    Contenido
  </button>
</div>
```

### Definición de Estilos con Estados

```javascript
// panel-styles.js
export const styles = {
  button: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    // Estados CSS nativos
    ':hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
    },

    ':active': {
      transform: 'translateY(0)',
    },

    ':disabled': {
      backgroundColor: '#d1d5db',
      cursor: 'not-allowed',
    }
  }
};
```

### Funciones Helper Disponibles

```javascript
// Clases básicas
cls('panel')                    // → 'te-panel'
cls('button')                   // → 'te-button'

// Clases con modificadores
cn('tab', { active: true })     // → 'te-tab te-tab--active'
cn('button', {
  disabled: true,
  saving: false
})                              // → 'te-button te-button--disabled'

// Helpers específicos
tabClass(true)                  // → 'te-tab te-tab--active'
variableClass(false)            // → 'te-variable'
saveButtonClass(false, true)    // → 'te-saveButton te-saveButton--saving'
```

### Ventajas del Sistema

✅ **Mejor rendimiento**: Estados CSS nativos vs eventos JavaScript
✅ **Código más limpio**: No más props `style={}` en JSX
✅ **Una fuente de verdad**: Estilos centralizados en un objeto
✅ **Estados automáticos**: `:hover`, `:focus` funcionan sin código extra
✅ **Fácil mantenimiento**: Cambias JS y se refleja automáticamente
✅ **Sin conflictos**: Prefijo `te-` evita colisiones con otros CSS

## 🧪 Sistema de Tests

Para información completa sobre el sistema de tests, incluyendo cómo ejecutar tests, escribir nuevos tests, debugging y convenciones, ver:

📚 **[Documentación Completa de Tests](./src/test/README.md)**

### Quick Start

```bash
# Ejecutar todos los tests principales
npm run test

# Ver todos los scripts disponibles
npm run test:all
```

## 🎨 Sistema de Detección de Variables y Previews

El theme-editor incluye un sistema inteligente que analiza automáticamente las variables CSS y genera previews visuales apropiados:

### Tipos Soportados

- **🎨 Colores**: Hex (#ff0000), RGB, HSL, variables CSS, nombres de colores estándar
- **📏 Espaciado**: px, rem, em, %, calc(), gap, padding, margin
- **✏️ Tipografía**: font-size, font-weight, line-height, font-family
- **🔲 Bordes**: border-width, border-radius, border-style
- **🌑 Sombras**: box-shadow, text-shadow, elevation
- **📄 Otros**: Preview genérico para valores no categorizados

### Ejemplos de Detección

```javascript
'--color-red-500': '#ef4444'        → 🎨 Color (cuadrado rojo)
'--spacing-lg': '2rem'              → 📏 Espaciado (barra azul)
'--font-weight-bold': '700'         → ✏️ Tipografía (texto "Aa")
'--border-radius': '8px'            → 🔲 Borde (cuadrado redondeado)
'--shadow-md': '0 4px 6px rgba()'   → 🌑 Sombra (elemento con sombra)
'--z-index-modal': '1000'           → 📄 Otro (valor genérico)
```

## 🧠 Detección Inteligente de Proyectos

El theme-editor automáticamente identifica la estructura de tu proyecto y busca el archivo `globals.css` en la ubicación correcta:

### Tipos de Proyectos Soportados

#### **📁 Proyectos Estándar** (Next.js, CRA, Vite)
```
mi-proyecto/
├── src/
│   ├── app/globals.css      ← Encontrado automáticamente
│   └── styles/globals.css   ← También soportado
├── styles/globals.css       ← También soportado
└── package.json
```

#### **🏢 Monorepos con @workspace/ui**
```
monorepo/
├── packages/
│   └── ui/
│       └── src/styles/globals.css  ← CSS centralizado
├── apps/
│   ├── web/
│   │   └── package.json            ← usa @workspace/ui
│   └── admin/
│       └── package.json            ← usa @workspace/ui
└── package.json                    ← workspaces config
```

### Escenarios de Uso

```bash
# Desde app del monorepo
cd /mi-monorepo/apps/web
npm run dev  # ← Encuentra automáticamente registry/styles/globals.css

# Desde raíz del monorepo
cd /mi-monorepo
npm run dev  # ← Detecta estructura y busca en registry/

# Proyecto estándar
cd /mi-proyecto-nextjs
npm run dev  # ← Busca en ubicaciones estándar de Next.js
```

## 📁 Estructura del Proyecto

```plaintext
theme-editor/
├── bin/
│   └── theme-editor.cjs         # CLI ejecutable
├── src/
│   ├── index.js                 # Punto de entrada principal
│   ├── register.js              # Registra el loader
│   ├── loader.js                # Detección de framework y auto-registro
│   ├── app/                     # 🆕 Componentes UI puros
│   │   ├── ThemeEditorApp.jsx   # Componente principal React
│   │   ├── ColorPanel.jsx       # Panel de colores
│   │   ├── VariablesPanel.jsx   # Panel de variables CSS
│   │   ├── DebugPanel.jsx       # Panel de debugging
│   │   ├── panel-styles.js      # 🆕 Definición de estilos con estados
│   │   ├── class-names.js       # 🆕 Utilidades de nombres de clases
│   │   └── variable-preview-generator.js # Generación de previews
│   ├── client/                  # 🆕 Lógica de negocio
│   │   ├── setupThemeEditor.js  # Setup y inicialización DOM
│   │   ├── useThemeEditor.js    # Hook principal de lógica
│   │   ├── useColorPanel.js     # Lógica de panel de colores
│   │   ├── dynamic-styles.js    # 🆕 Sistema de inyección CSS
│   │   ├── useVariableDetection.js # Hook de detección de variables
│   │   ├── variable-type-detector.js # Detección inteligente de tipos
│   │   └── computed-style-utils.js # Utilidades de estilos computados
│   ├── server/
│   │   ├── server.js            # Servidor HTTP y WebSocket
│   │   └── ws.js                # Lógica de WebSocket
│   ├── utils/                   # 🆕 Utilidades generales
│   │   ├── monorepo-detector.js # Detección de monorepos
│   │   ├── css-parser.js        # Parser de CSS
│   │   ├── file-utils.js        # Utilidades de archivos
│   │   ├── stylesheet-matcher.js # Matcher de hojas de estilo
│   │   ├── variable-patterns.js # Patrones de variables
│   │   └── postcss-utils.js     # Utilidades PostCSS
│   ├── examples/                # 🆕 Ejemplos de uso práctico
│   │   └── example-usage.js     # Ejemplo de setClassNames()
│   ├── test/                    # 🆕 Suite de tests organizada
│   │   ├── dynamic-styles-test.js
│   │   ├── variables-test.js
│   │   ├── cors-test.js
│   │   ├── variable-detection-tests.js
│   │   └── README.md            # Documentación completa de tests
│   └── config/
│       └── constants.js         # Constantes y configuración
├── dist/                        # Builds compilados
├── rollup.config.js             # Configuración de build
├── package.json                 # Scripts y dependencias
├── README.md                    # Documentación para usuarios
├── DEVELOPMENT.md               # Esta documentación técnica
└── CONTRIBUTING.md              # Guía de contribución
```

## 🔧 API Reference

### Sistema de Estilos Dinámicos

#### `injectDynamicStyles()`
Inyecta todas las clases CSS generadas dinámicamente al DOM.

**Uso:**
```javascript
import { injectDynamicStyles, setClassNames } from './dynamic-styles.js';
React.useEffect(() => {
  setClassNames();
  injectDynamicStyles();
}, []);
```

### Utilidades de Nombres de Clases (`app/class-names.js`)

#### `cls(className: string): string`
Genera una clase CSS básica con prefijo `te-`.

**Parámetros:**
- `className`: Nombre de la clase sin prefijo

**Retorna:** String con la clase prefijada

**Ejemplo:**
```javascript
import { cls } from '../app/class-names.js';
cls('panel')    // → 'te-panel'
cls('button')   // → 'te-button'

import { cls, cn } from '../utils/class-names.js';
cn('tab', { active: true, disabled: false })    // → 'te-tab te-tab--active'
cn('button', { primary: true, disabled: true }) // → 'te-button te-button--primary te-button--disabled'
cn('input', { error: false, focused: true })    // → 'te-input te-input--focused'

```

#### `cn(baseClass: string, modifiers: object): string`
Genera una clase CSS con modificadores condicionales.

**Parámetros:**
- `baseClass`: Clase base sin prefijo
- `modifiers`: Objeto con modificadores booleanos

**Retorna:** String con clases concatenadas

**Ejemplo:**
```javascript
import { cn } from '../app/class-names.js';
cn('tab', { active: true, disabled: false })
// → 'te-tab te-tab--active'
```

#### Helpers Específicos

##### `tabClass(isActive: boolean): string`
Helper especializado para tabs.

##### `variableClass(isModified: boolean): string`
Helper para variables CSS.

##### `saveButtonClass(disabled: boolean, saving: boolean): string`
Helper para botón de guardar.

##### `THEME_EDITOR_CLASSES`
Objeto con constantes de clases pre-generadas:

```javascript
import { THEME_EDITOR_CLASSES } from '../app/class-names.js';

THEME_EDITOR_CLASSES.PANEL;        // → 'te-panel'
THEME_EDITOR_CLASSES.TAB_ACTIVE;   // → 'te-tab te-tab--active'
THEME_EDITOR_CLASSES.SAVE_BUTTON;  // → 'te-saveButton'
```

### Detección de Variables

#### `analyzeVariable(name: string, value: string): object`
Analiza una variable CSS y retorna información de tipo y preview.

**Retorna:**
```javascript
{
  type: 'color' | 'spacing' | 'typography' | 'border' | 'shadow' | 'other',
  preview: string,  // HTML del preview
  category: string,
  subcategory: string
}
```

#### `detectVariableType(name: string, value: string): string`
Detecta el tipo de una variable CSS basado en nombre y valor.

**Parámetros:**
- `name`: Nombre de la variable (ej: `--color-primary`)
- `value`: Valor de la variable (ej: `#3b82f6`)

**Retorna:** Tipo detectado como string

### Detección de Monorepos

#### `detectMonorepoStructure(projectRoot: string): object`
Analiza la estructura del proyecto para detectar monorepos.

**Retorna:**
```javascript
{
  isMonorepo: boolean,
  workspaceRoot: string,
  globalsCssPath: string,
  detectionMethod: string
}
```



## 🤝 Contribución

¿Quieres contribuir a theme-editor? ¡Excelente! Tenemos una guía completa para ayudarte:

📚 **[Guía Completa de Contribución](./CONTRIBUTING.md)**

### Quick Start para Contributors

```bash
# Fork y clona el repositorio
git clone https://github.com/tu-usuario/theme-editor.git
cd theme-editor

# Setup del entorno
npm install
npm test

# Desarrollar
git checkout -b feature/tu-feature
# ... desarrollo ...
npm run test:all

# Enviar contribución
git commit -m "feat: descripción de tu contribución"
git push origin feature/tu-feature
# Crear PR en GitHub
```

## 🐛 Debugging

### Variables de Entorno para Debug

```bash
# Activar logs detallados
DEBUG=theme-editor:* npm run dev

# Solo logs del servidor
DEBUG=theme-editor:server npm run dev

# Solo logs de detección
DEBUG=theme-editor:detection npm run dev
```

### Herramientas de Debug

#### Panel de Debug Interno
El theme-editor incluye un panel de debug accesible desde la UI:

```javascript
// Activar modo debug
window.__THEME_EDITOR_DEBUG__ = true;
```

#### Logs de Desarrollo

```javascript
// En cualquier archivo del cliente
import { log } from '../config/constants.js';

log.debug('Información de debugging');
log.info('Información general');
log.warn('Advertencia');
log.error('Error crítico');
```

### Problemas Comunes

#### **No se encuentra globals.css**
1. Verificar estructura del proyecto
2. Comprobar logs de detección
3. Verificar permisos de archivos

#### **Estilos no se aplican**
1. Verificar que `injectDynamicStyles()` se ejecuta
2. Comprobar conflictos de CSS
3. Verificar prefijos de clases

#### **Variables no se detectan**
1. Comprobar formato de variables CSS (`--variable-name`)
2. Verificar parser de CSS
3. Revisar encoding del archivo

## 📄 Licencia

MIT License - ver detalles en el README principal.

---

**theme-editor** - Sistema técnico de edición de CSS con arquitectura moderna ⚡