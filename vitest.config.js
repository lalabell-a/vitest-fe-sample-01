import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // jsdom simula un navegador para pruebas de integración con el DOM
    environment: 'jsdom',
    // Incluye archivos de prueba en la carpeta tests/
    include: ['tests/**/*.test.js'],
    // Habilita globals como describe, it, expect sin necesidad de importarlos
    globals: true,
  },
});
