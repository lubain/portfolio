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
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "vendor-react";
          }
          if (
            id.includes("node_modules/lucide-react") ||
            id.includes("node_modules/zustand")
          ) {
            return "vendor-ui";
          }
          if (id.includes("node_modules/three")) {
            return "vendor-three";
          }
        },
      },
    },
  },
});
