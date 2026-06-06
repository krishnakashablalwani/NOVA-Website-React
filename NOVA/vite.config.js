import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    tailwindcss(),  
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'NOVA Platform',
        short_name: 'NOVA',
        description: 'The official platform for NOVA Club',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        icons: [
          {
            src: 'images/hero/anishay.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/hero/anishay.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module',
      }
    })
  ],
  server: {
    port: 3000, // Change this to whatever port you prefer
    open: true,  // Optional: automatically opens browser when dev server starts
    allowedHosts: true, // Allow external hosts like localtunnel
    proxy: {
      '/api': {
        target: 'http://localhost:3001'
      }
    }
  },
   build: {
    outDir: 'dist',
    sourcemap: false, // Disable in production for smaller bundle
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  }
})