import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Crear el HTML base si no existe
if (!document.getElementById('theme-editor-root')) {
  document.body.innerHTML = `
    <div id="theme-editor-root"></div>
    <style>
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
      #theme-editor-root { height: 100vh; }
    </style>
  `;
}

const root = createRoot(document.getElementById('theme-editor-root'));
root.render(<App />);