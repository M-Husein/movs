
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import * as path from 'path';

export default defineConfig({
  build: {
    minify: 'terser',
    // reportCompressedSize: false, // For fast build
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    // input https://www.npmjs.com/package/html-minifier-terser options
    ViteMinifyPlugin({}),
  ],
  server: {
    // port: 5177, // Default = 5173
    host: true,
  },
});
