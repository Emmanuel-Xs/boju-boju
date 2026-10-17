import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  // raw-assets/ holds gigabytes of downloads and model weights; watching it exhausts inotify, so dev reloads stop working.
  server: { watch: { ignored: ['**/raw-assets/**', '**/dist/**'] } },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
});
