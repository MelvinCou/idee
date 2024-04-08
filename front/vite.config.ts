import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // Configuration spécifique aux tests avec Vitest
    globals: true,
    environment: 'jsdom', // Utilisez 'happy-dom' pour une alternative plus rapide à jsdom
    setupFiles: ''
  },
});
