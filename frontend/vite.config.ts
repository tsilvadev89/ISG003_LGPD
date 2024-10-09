import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 80,
  },
  build: {
    chunkSizeWarningLimit: 2000,
  }
});


/* export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: '54.234.79.240', // ENDEREÇO PUBLICO DA APLICAÇÃO
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: '/var/www/html', // Define o diretório de saída para a pasta do Apache
  },
}); */