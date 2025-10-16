# postcss-scheme

Un plugin de PostCSS que permite definir esquemas de colores y temas de manera declarativa usando la directiva `@scheme`.

## Instalación

```bash
npm install postcss-scheme --save-dev
```

## Uso

Añade el plugin a tu configuración de PostCSS:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-scheme')
  ]
}
```

## Sintaxis

El plugin procesa la directiva `@scheme` y la convierte en reglas CSS regulares. La sintaxis básica es:

```css
@scheme nombre-del-esquema {
  /* propiedades CSS */
}
```

## Ejemplos

### Ejemplo Básico

**Input:**
```css
@scheme light {
  --color-background: #ffffff;
  --color-text: #000000;
}
```

**Output:**
```css
.light, [data-theme='light'] {
  --color-background: #ffffff;
  --color-text: #000000;
}
```

### Ejemplo con Esquema Oscuro

**Input:**
```css
@scheme dark-mode {
  --color-background: #1a1a1a;
  --color-text: #ffffff;
}
```

**Output:**
```css
.dark-mode, [data-theme='dark-mode'] {
  --color-background: #1a1a1a;
  --color-text: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a1a1a;
    --color-text: #ffffff;
  }
}
```

## Características

- Convierte `@scheme` en selectores de clase y atributos `data-theme`
- Manejo automático de esquemas oscuros usando `prefers-color-scheme`
- Normalización de nombres de esquemas (reemplaza espacios por guiones)
- Soporte para múltiples esquemas en el mismo archivo

## Casos de Uso

1. **Temas de Color:**
```css
@scheme corporate {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}
```

2. **Modo Oscuro Automático:**
```css
@scheme dark {
  --bg-color: #121212;
  --text-color: #ffffff;
}
```

3. **Temas Personalizados:**
```css
@scheme high-contrast {
  --bg-color: #000000;
  --text-color: #ffffff;
  --link-color: #ffff00;
}
```

## Notas

- Los nombres de esquemas se normalizan automáticamente (espacios se convierten en guiones)
- Los esquemas que comienzan con "dark" se aplican automáticamente en modo oscuro
- Puedes usar los esquemas tanto con clases (`.nombre-esquema`) como con atributos (`[data-theme='nombre-esquema']`)

## Licencia

MIT