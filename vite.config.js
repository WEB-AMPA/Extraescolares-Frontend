import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  envPrefix: 'VITE_', // Asegúrate de que las variables de entorno comiencen con VITE_
});
