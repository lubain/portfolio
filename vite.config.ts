import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { imagetools } from "vite-imagetools";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    // Génère automatiquement des variantes WebP/AVIF pour les imports d'images
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: "webp;avif",
        quality: "80",
      }),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Séparation des chunks pour un meilleur cache
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-ui": ["lucide-react", "zustand"],
        },
      },
    },
  },
});
