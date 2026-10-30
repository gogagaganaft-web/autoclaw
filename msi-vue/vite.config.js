import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  base: '/gr/',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(import.meta.dirname, 'src') },
      // MSI Vue bridge replaces DevExtreme Vue wrappers
      { find: /^devextreme-vue$/, replacement: path.resolve(import.meta.dirname, 'src/msi-vue/index.js') },
      { find: /^devextreme-vue\/(.*)$/, replacement: path.resolve(import.meta.dirname, 'src/msi-vue/$1') },
      // MSI core replaces DevExtreme core modules (localization, data, viz, ...)
      { find: /^devextreme\/(.*)$/, replacement: path.resolve(import.meta.dirname, 'src/msi-vue/core/$1') },
      { find: /^devextreme-dist\/(.*)$/, replacement: path.resolve(import.meta.dirname, 'src/msi-vue/core/$1') },
    ],
  },
  optimizeDeps: {
    include: ['dx-template-gallery-data'],
  },
  server: {
    port: 5050,
    strictPort: true,
    proxy: {
      // Dev полностью на новых службах: 7505 (store) и 7501 (execute).
      // Прототип 7070 больше не участвует — он остаётся путём отката.
      '/api/execute': {
        target: 'http://localhost:7501',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:7505',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/dx-template-gallery-data/, /node_modules/],
      transformMixedEsModules: true,
    },
  },
});
