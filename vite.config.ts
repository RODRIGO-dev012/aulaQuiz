import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath} from 'node:url';
export default defineConfig(({mode})=>({ optimizeDeps:{entries:['index.html']},resolve:mode==='baseline'?{alias:[{find:/^\.\/data\/(?:real-banks|lengua-sexto-banks)\.json$/,replacement:fileURLToPath(new URL('./examples/BASELINE_REAL_BANKS.json',import.meta.url))}]}:undefined,plugins: [react(), tailwindcss()], base: './', server: { watch: { ignored: ['**/artifacts/**', '**/importaciones/**', '**/revisiones/**', '**/scripts/**', '**/tests/**', '**/tests-local/**'] } }, build: { outDir:mode==='baseline'?'artifacts/baseline-dist':'dist',rollupOptions: { output: { manualChunks: { math: ['katex', 'katex/contrib/mhchem'] } } } } }));
