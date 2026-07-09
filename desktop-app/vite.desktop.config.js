import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, '../'), // Compiles files starting from the parent root directory
  base: './', // Ensures assets load using relative paths (e.g. file:// protocol compatibility)
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Compiles directly into desktop-app/dist
    emptyOutDir: true
  }
});
