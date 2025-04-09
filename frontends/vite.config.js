// frontends/vite.config.ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/scene': 'http://localhost:3000',
      '/assets': 'http://localhost:3000',
      '/uploads': 'http://localhost:3000',
      // WebSocket için
      '/socket': {
        target: 'ws://localhost:3000',
        ws: true
      }
    }
  }
})
