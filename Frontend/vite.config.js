import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:8080',
        changeOrigin: false,
      },
    },
  },
  plugins: [react(), tailwindcss(),],
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'],
  build: {
    assetsInlineLimit: 4096 // 4KB
  }
});
