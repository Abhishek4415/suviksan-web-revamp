import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/suviksan-web-revamp/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimization to skip problematic modules during build
  optimizeDeps: {
    exclude: ['@monogrid/gainmap-js', '@react-three/drei'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
}));
