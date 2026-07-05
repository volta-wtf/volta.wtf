// Auto-inyector del Theme Editor
// Se ejecuta automáticamente cuando se importa en modo desarrollo

import { getThemeEditorPortForApp } from './config/constants.js';

// Solo ejecutar en el browser y en modo desarrollo
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  function detectThemeEditorPort() {
    const currentPort = window.location.port || '3000';
    return getThemeEditorPortForApp(currentPort);
  }

  // Función para inyectar el theme editor
  function injectThemeEditor() {
    const themeEditorPort = detectThemeEditorPort();
    const scriptUrl = `http://localhost:${themeEditorPort}/theme-editor.js`;

    // Verificar si ya está cargado
    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
      console.log('🎨 Theme Editor ya está cargado');
      return;
    }

    console.log(`🔌 Auto-inyectando Theme Editor desde puerto ${themeEditorPort}...`);

    // Crear y agregar el script
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;

    script.onload = function() {
      console.log('✅ Theme Editor cargado automáticamente');
    };

    script.onerror = function() {
      console.warn(`⚠️ No se pudo cargar Theme Editor desde puerto ${themeEditorPort}`);
      console.log('💡 Asegúrate de que el servidor del theme editor esté corriendo');
    };

    // Agregar al head cuando el DOM esté listo
    if (document.head) {
      document.head.appendChild(script);
    } else {
      // Si el head no está listo, esperar
      document.addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(script);
      });
    }
  }

  // Ejecutar la inyección
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectThemeEditor);
  } else {
    injectThemeEditor();
  }
}