import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/REACT2026/rs-react-app/',
  plugins: [react(), tailwindcss()],
});
