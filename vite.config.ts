import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  server: {
    port: 3010,
    proxy: {
      // string shorthand
      '/api': {
        target: 'http://localhost:1337',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  // proxy: {
  //   '/api': {
  //     target: 'https://localhost:44305',
  //     changeOrigin: true,
  //     secure: false,
  //     ws: true,
  //   }
  // }
})
