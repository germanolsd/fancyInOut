import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/entry/index.js'),
      name: 'FancyInOut',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue'],
      input: process.env.MODE === 'npm' ? 'src/entry/index.js' : 'index.html',
      output: {
        dir: process.env.MODE === 'npm' ? 'dist/npm' : 'dist/deploy',
        format: 'es',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
