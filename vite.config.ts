import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(), tailwindcss()], base: './', server: { watch: { ignored: ['**/artifacts/**', '**/importaciones/**', '**/revisiones/**', '**/scripts/**', '**/tests/**', '**/tests-local/**'] } }, build: { rollupOptions: { output: { manualChunks: { math: ['katex', 'katex/contrib/mhchem'] } } } } });
