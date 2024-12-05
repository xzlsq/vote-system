import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const port = 8008

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // '/': 'http://localhost:8000',
      '/api': {
        target: 'http://localhost:8008',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/account': 'http://localhost:' + port + '/',
      '/vote': 'http://localhost:' + port + '/',
      '/realtime-voteinfo': {
        target: 'http://localhost:' + port + '/',
        ws: true,
      }
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
