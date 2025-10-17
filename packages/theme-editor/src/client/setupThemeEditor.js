import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeEditorApp } from '../app/ThemeEditorApp.jsx';

// Variables globales para manejar el estado
let panelRoot = null;
let panelContainer = null;
let floatingButton = null;

// Función para crear el botón flotante con estilos aislados
function createThemeEditorButton() {
  if (floatingButton || document.getElementById('theme-editor-btn')) return;

  floatingButton = document.createElement('button');
  floatingButton.id = 'theme-editor-btn';
  floatingButton.innerHTML = '⌬';

  // Estilos absolutos que no dependen de variables CSS
  floatingButton.style.cssText = `
    margin: 0 !important;
    padding: 0 !important;
    padding-bottom: 4px !important;
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    width: 2.25rem !important;
    height: 2.25rem !important;
    border: none !important;
    border-radius: 50% !important;
    background: rgba(0,0,0,0.8) !important;
    box-shadow: 0 0 0 1px #000, inset 0 0 0 1px rgba(255,255,255,0.1), 0px 16px 32px -8px rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(48px);
    color: #ffffff !important;
    font-size: 30px !important;
    line-height: 40px !important;
    cursor: pointer !important;
    z-index: 9999 !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    will-change: scale, box-shadow, width, background;
    transition: scale 150ms cubic-bezier(0.23,0.88,0.26,0.92), width 250ms cubic-bezier(0.23,0.88,0.26,0.92), box-shadow 250ms cubic-bezier(0.23,0.88,0.26,0.92), background 150ms ease !important;
  `;

  // Event listeners para el botón
  floatingButton.addEventListener('mouseenter', () => {
    floatingButton.style.backgroundColor = 'rgba(0,0,0,0.7)';
  });

  floatingButton.addEventListener('mouseleave', () => {
    floatingButton.style.backgroundColor = 'rgba(0,0,0,0.8)';
  });

  floatingButton.addEventListener('click', toggleThemeEditorPanel);

  document.body.appendChild(floatingButton);
  console.log('✅ Botón Theme Editor creado');
}

// Función para alternar el panel
function toggleThemeEditorPanel() {
  if (panelContainer && panelContainer.parentNode) {
    closeThemeEditorPanel();
  } else {
    openThemeEditorPanel();
  }
}

// Función para abrir el panel con estilos completamente aislados
function openThemeEditorPanel() {
  console.log('🔧 Abriendo panel Theme Editor...');

  // Crear contenedor del panel con estilos aislados
  panelContainer = document.createElement('div');
  panelContainer.id = 'theme-editor-panel-container';

  // Reiniciar todos los estilos para evitar herencia
  panelContainer.style.cssText = `
    all: unset !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 10000 !important;
    pointer-events: none !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  `;

  document.body.appendChild(panelContainer);

  // Crear root de React y renderizar
  panelRoot = createRoot(panelContainer);
  panelRoot.render(React.createElement(ThemeEditorApp, { onClose: closeThemeEditorPanel }));

  console.log('✅ Panel Theme Editor abierto');
}

// Función para cerrar el panel
function closeThemeEditorPanel() {
  console.log('🔧 Cerrando panel Theme Editor...');

  if (panelRoot) {
    panelRoot.unmount();
    panelRoot = null;
  }

  if (panelContainer && panelContainer.parentNode) {
    panelContainer.parentNode.removeChild(panelContainer);
    panelContainer = null;
  }

  console.log('✅ Panel Theme Editor cerrado');
}

// Función para remover completamente el theme editor
function removeThemeEditor() {
  closeThemeEditorPanel();

  if (floatingButton && floatingButton.parentNode) {
    floatingButton.parentNode.removeChild(floatingButton);
    floatingButton = null;
  }

  console.log('🗑️ Theme Editor completamente removido');
}

// Función principal de inicialización
function initializeThemeEditor() {
  console.log('🚀 Inicializando Theme Editor DOM...');
  createThemeEditorButton();
}

// Función para inicializar cuando el DOM esté listo
function setupThemeEditor() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeEditor);
  } else {
    initializeThemeEditor();
  }
}

// Exportar funciones públicas
export {
  setupThemeEditor,
  initializeThemeEditor,
  createThemeEditorButton,
  toggleThemeEditorPanel,
  openThemeEditorPanel,
  closeThemeEditorPanel,
  removeThemeEditor
};

// Inicialización automática
console.log('🎨 Theme Editor cargado');
setupThemeEditor();