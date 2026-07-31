<<<<<<< HEAD
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000
  }
});
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
>>>>>>> e4a27b5 (chore: alteração para react e alteração para design system)
