// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar dependências do React
          'react-vendor': ['react', 'react-dom'],
          // Separar MUI em outro chunk
          'mui-vendor': ['@mui/material', '@mui/icons-material']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Ajuste do limite de aviso de tamanho do chunk
  }
});
