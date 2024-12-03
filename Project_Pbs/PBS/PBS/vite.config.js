// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allows access from other devices on the same network
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Your backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: Remove '/api' from the URL
      },
    },
  },
  plugins: [react()],
});
