import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  // GitHub Pages repository path
  base: '/sih-prototype/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
