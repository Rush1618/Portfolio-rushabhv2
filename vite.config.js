import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 10000,
    allowedHosts: 'all',
  },
  plugins: [
    react(),
    // NOTE: brotli/gzip compression plugins removed — they run inside the
    // build process and add 100–200MB of memory overhead. Render's CDN
    // handles gzip/brotli at the edge automatically for static sites.
  ],
  build: {
    // esnext skips expensive Babel/SWC transpilation transforms
    target: 'esnext',
    rollupOptions: {
      // Process one file at a time — prevents Rollup from holding all
      // Three.js modules in memory simultaneously
      maxParallelFileOps: 2,
      output: {
        manualChunks: {
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber'],
          'three-drei': ['@react-three/drei'],
          'framer-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react', 'react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1500,
    // esbuild minifier — written in Go, uses ~10x less RAM than terser
    minify: 'esbuild',
  },
})
