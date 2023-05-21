import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-crud/',
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components')
    }
  },
  plugins: [vue()]
})
