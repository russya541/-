import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend dev server proxies API calls to the Express backend so the app
// works end-to-end from a single origin during development.
const API_TARGET = process.env.API_TARGET ?? 'http://localhost:3001'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
})
