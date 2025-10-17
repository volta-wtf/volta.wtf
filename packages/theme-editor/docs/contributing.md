# Contribuir a theme-editor

¡Gracias por considerar contribuir a theme-editor! Este documento te guiará a través del proceso de contribución.

## 🚀 Quick Start

1. **Fork** el repositorio en GitHub
2. **Clona** tu fork localmente
3. **Instala** dependencias: `npm install`
4. **Ejecuta** tests: `npm test`
5. **Crea** una rama para tu feature
6. **Desarrolla** y **testea**
7. **Envía** un Pull Request

## 🛠️ Setup del Entorno de Desarrollo

### Prerrequisitos

- Node.js 18+
- npm o pnpm
- Git

### Instalación

```bash
# 1. Fork el repositorio en GitHub
# 2. Clona tu fork
git clone https://github.com/tu-usuario/theme-editor.git
cd theme-editor

# 3. Instala dependencias
npm install

# 4. Ejecuta tests para verificar setup
npm test

# 5. Ejecuta el proyecto en modo desarrollo
npm run dev
```

## 🔄 Flujo de Desarrollo

### 1. Crear una Rama

```bash
# Desde main/master
git checkout -b feature/descripcion-corta

# Ejemplos:
git checkout -b feature/color-picker-improvements
git checkout -b fix/monorepo-detection
git checkout -b docs/api-reference
```

### 2. Desarrollar con Tests

```bash
# Desarrollar tu feature
# Escribir/actualizar tests
npm test  # Verificar que todos los tests pasan

# Tests específicos durante desarrollo
npm run test:styles      # Para cambios en sistema de estilos
npm run test:variables   # Para cambios en detección de variables
npm run test:cors        # Para cambios en servidor
```

### 3. Verificar Calidad

```bash
# Todos los tests
npm run test:all

# Si hay linter configurado
npm run lint

# Verificar que no se rompió nada
npm run build  # Si existe script de build
```

### 4. Commit

Usa mensajes descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Ejemplos de buenos commits
git commit -m "feat: añadir soporte para oklch() en detector de colores"
git commit -m "fix: corregir detección de monorepos en Windows"
git commit -m "docs: actualizar guía de instalación"
git commit -m "test: agregar casos edge para parser de CSS"
git commit -m "refactor: simplificar lógica de generación de clases"
```

### 5. Push y Pull Request

```bash
git push origin feature/tu-rama

# Luego crear PR en GitHub con:
# - Título descriptivo
# - Descripción de cambios
# - Referencias a issues (si aplica)
# - Screenshots (si es UI)
```

## 📝 Estándares de Código

### JavaScript

- **ES6+ modules**: Usar `import/export`
- **Funciones puras**: Evitar side effects cuando sea posible
- **Nombres descriptivos**: Variables y funciones claras
- **Comentarios**: Solo cuando el código no es auto-explicativo
- **Async/await**: Preferir sobre Promises cuando sea posible

```javascript
// ✅ Bueno
export function detectVariableType(name, value) {
  if (isColorValue(value)) return 'color';
  if (isSpacingValue(value)) return 'spacing';
  return 'other';
}

// ❌ Evitar
export function dvt(n, v) {
  // Detecta el tipo de variable CSS
  return v.includes('#') ? 'color' : 'other';
}
```

### CSS/Estilos

- **Prefijo consistente**: `te-` para todas las clases del theme-editor
- **Estados nativos**: Usar `:hover`, `:focus` en lugar de eventos JavaScript
- **Mobile-first**: Responsive por defecto
- **Variables CSS**: Usar custom properties cuando sea apropiado
- **BEM**: Para modificadores (`te-button--active`)

```css
/* ✅ Bueno */
.te-panel {
  background: var(--te-panel-bg);
  border-radius: 8px;
}

.te-button {
  padding: 8px 16px;
  transition: all 0.2s;
}

.te-button:hover {
  transform: translateY(-1px);
}

.te-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Tests

- **Coverage completo**: Cada función pública debe tener tests
- **Casos edge**: Testear situaciones límite
- **Error handling**: Verificar manejo de errores
- **Performance**: Tests para funciones críticas
- **Nombres descriptivos**: Tests que explican qué verifican

```javascript
// ✅ Bueno
console.log('🧪 Testing color detection...');

try {
  const result = detectVariableType('--color-primary', '#3b82f6');
  console.assert(result === 'color', '❌ No detecta color hex correctamente');
  console.log('✅ Test 1: Detecta colores hex');
} catch (error) {
  console.log('❌ Test 1: Error inesperado:', error.message);
}
```

### Documentación

- **README actualizado**: Si cambias API o funcionalidad
- **Comentarios JSDoc**: Para funciones públicas
- **Ejemplos**: Código que se puede copiar y pegar
- **Changelog**: Mencionar breaking changes

```javascript
/**
 * Detecta el tipo de una variable CSS basado en su nombre y valor
 * @param {string} name - Nombre de la variable (ej: '--color-primary')
 * @param {string} value - Valor de la variable (ej: '#3b82f6')
 * @returns {string} Tipo detectado ('color', 'spacing', 'typography', etc.)
 */
export function detectVariableType(name, value) {
  // implementación...
}
```

## 🎯 Áreas de Contribución

### 🎨 **Frontend/UI**

**Qué puedes contribuir:**
- Mejoras en `ThemeEditorApp.jsx`
- Nuevos componentes en `client/`
- Mejoras en el sistema de estilos dinámicos
- Responsive design y accesibilidad
- Nuevos tipos de previews de variables

**Skills necesarios:**
- React/JSX
- CSS/Styled Components
- UX/UI design
- Accesibilidad web

**Archivos principales:**
- `src/app/ThemeEditorApp.jsx`
- `src/app/VariablesPanel.jsx`
- `src/app/ColorPanel.jsx`
- `src/client/dynamic-styles.js`
- `src/app/panel-styles.js`

### 🔧 **Backend/Utils**

**Qué puedes contribuir:**
- Detección de nuevos frameworks
- Mejoras en parser de CSS
- Sistema de archivos (monorepos, etc.)
- WebSocket server optimizations
- Nuevo tipos de variables detectables

**Skills necesarios:**
- Node.js
- File system APIs
- Regular expressions
- CSS parsing
- WebSocket

**Archivos principales:**
- `src/utils/monorepo-detector.js`
- `src/client/variable-type-detector.js`
- `src/utils/css-parser.js`
- `src/server/server.js`
- `src/server/ws.js`

### 🧪 **Testing**

**Qué puedes contribuir:**
- Ampliar cobertura de tests
- Tests de integración
- Performance benchmarks
- Cross-platform testing (Windows, macOS, Linux)
- Tests en diferentes frameworks

**Skills necesarios:**
- Node.js testing
- Performance testing
- Cross-platform development

**Archivos principales:**
- `src/test/dynamic-styles-test.js`
- `src/test/variables-test.js`
- `src/test/cors-test.js`
- `src/test/variable-detection-tests.js`

### 📚 **Documentación**

**Qué puedes contribuir:**
- Ejemplos de uso
- Guías paso a paso
- API reference
- Video tutoriales
- Traducciones

**Skills necesarios:**
- Escritura técnica
- Markdown
- Creación de ejemplos
- Video editing (opcional)

**Archivos principales:**
- `README.md`
- `DEVELOPMENT.md`
- `src/test/README.md`
- Este archivo (`CONTRIBUTING.md`)

## 🔍 Proceso de Review

### Automated Checks

Tu PR debe pasar:

- ✅ **Tests**: `npm run test:all`
- ✅ **Build**: Si existe script de build
- ✅ **Linting**: Si está configurado

### Code Review

Al menos un maintainer debe:

- 📖 **Revisar código**: Lógica, estilo, performance
- 🧪 **Verificar tests**: Coverage y calidad
- 📚 **Documentación**: Actualizada si es necesario
- 🔄 **Compatibility**: No rompe funcionalidad existente

### Testing Manual

Verificamos en:

- 🎯 **Diferentes proyectos**: Next.js, CRA, Vite
- 🏢 **Monorepos**: Estructuras complejas
- 💻 **Plataformas**: macOS, Linux, Windows (cuando sea posible)

### Feedback

Si hay cambios sugeridos:

1. 📝 **Lee el feedback** cuidadosamente
2. 🔧 **Implementa cambios** en la misma rama
3. 📤 **Push** los cambios (se actualizará automáticamente el PR)
4. 💬 **Responde** a comentarios cuando hayas aplicado los cambios

## 🐛 Debugging para Contributors

### Variables de Entorno

```bash
# Activar logs detallados durante desarrollo
DEBUG=theme-editor:* npm run dev

# Solo logs específicos
DEBUG=theme-editor:server npm run dev
DEBUG=theme-editor:detection npm run dev
DEBUG=theme-editor:css-parser npm run dev
```

### Herramientas de Debug

#### Panel de Debug Interno

```javascript
// En el browser, activar modo debug
window.__THEME_EDITOR_DEBUG__ = true;

// Ver información detallada en consola
window.__THEME_EDITOR_STATE__ = true;
```

#### Logs de Desarrollo

```javascript
// En cualquier archivo del cliente
import { log } from '../config/constants.js';

log.debug('Información detallada para debugging');
log.info('Información general');
log.warn('Advertencia importante');
log.error('Error crítico');
```

#### Node.js Debugging

```bash
# Debugger integrado
node --inspect src/test/variables-test.js

# Para tests específicos
node --inspect-brk src/test/dynamic-styles-test.js
```

### Problemas Comunes y Soluciones

#### **Error: No se encuentra globals.css**

```bash
# Verificar estructura del proyecto
find . -name "globals.css" -type f

# Comprobar logs de detección
DEBUG=theme-editor:detection npm run dev

# Verificar permisos
ls -la src/app/globals.css
```

#### **Error: Estilos no se aplican**

```javascript
// Verificar que injectDynamicStyles se ejecuta
console.log('Estilos inyectados:', document.querySelector('#te-dynamic-styles'));

// Verificar conflictos CSS
console.log('Clases aplicadas:', element.className);

// Verificar prefijos
console.log('Prefijo correcto:', cls('panel')); // debe ser 'te-panel'
```

#### **Error: Variables no se detectan**

```javascript
// Verificar formato variables CSS
const variables = ['--color-primary', '--spacing-lg'];
variables.forEach(name => {
  console.log(`${name}: ${getComputedStyle(document.documentElement).getPropertyValue(name)}`);
});

// Verificar parser CSS
import { parseCSS } from '../utils/css-parser.js';
const parsed = parseCSS(cssContent);
console.log('Variables encontradas:', parsed.variables);
```

## 📋 Checklist antes de PR

### Código

- [ ] ✅ Todos los tests pasan (`npm run test:all`)
- [ ] 🧹 Código limpio y bien comentado
- [ ] 📝 Funciones nuevas tienen JSDoc
- [ ] 🔧 No hay console.logs olvidados (solo en tests)
- [ ] 📱 Responsive si es UI
- [ ] ♿ Accesible si es UI

### Tests

- [ ] 🧪 Funcionalidad nueva tiene tests
- [ ] 🔍 Casos edge cubiertos
- [ ] ⚡ Tests no tardan más de 5 segundos
- [ ] 📊 Coverage no disminuye

### Documentación

- [ ] 📚 README actualizado si cambió API
- [ ] 💡 Ejemplos funcionan
- [ ] 🔗 Enlaces están correctos
- [ ] 📖 Cambios explicados en PR description

### Compatibility

- [ ] 🔄 No rompe funcionalidad existente
- [ ] 📦 Funciona con Next.js, CRA, Vite
- [ ] 🏢 Funciona en monorepos
- [ ] 💻 Cross-platform cuando sea posible

## 🤝 Comunidad

### Código de Conducta

- 🤝 **Respeto**: Trata a todos con respeto
- 🎯 **Constructivo**: Feedback útil y específico
- 🌱 **Aprendizaje**: Todos estamos aprendiendo
- 🔄 **Colaboración**: Trabajamos juntos hacia objetivos comunes

### Comunicación

- 💬 **Issues**: Para bugs, features, preguntas
- 🔄 **Pull Requests**: Para contribuciones de código
- 📧 **Email**: Para temas privados o sensibles

### Reconocimiento

Contributors son reconocidos en:

- 📜 **README**: Lista de contributors
- 📝 **Changelog**: Menciones en releases
- 🏆 **GitHub**: Contributor status

## 🚀 Primeros Pasos

### Issues para Principiantes

Busca issues etiquetados con:

- 🔰 `good first issue`
- 🆕 `beginner friendly`
- 📚 `documentation`
- 🧪 `tests`

### Ideas de Contribución

Si no sabes por dónde empezar:

1. 🧪 **Escribir tests** para funciones sin coverage
2. 📚 **Mejorar documentación** con ejemplos
3. 🐛 **Reproducir bugs** reportados en issues
4. 🔍 **Testing** en diferentes proyectos
5. 💡 **Sugerir mejoras** basadas en tu experiencia

## 📞 ¿Necesitas Ayuda?

- 📖 **Lee la documentación**: README, DEVELOPMENT.md
- 🔍 **Busca issues similares**: Puede que ya esté resuelto
- 💬 **Abre un issue**: Describe tu problema detalladamente
- 📧 **Contacta maintainers**: Si es algo urgente o privado

---

**¡Gracias por contribuir a theme-editor!** 🚀 Tu tiempo y esfuerzo ayudan a hacer una herramienta mejor para toda la comunidad de desarrolladores.