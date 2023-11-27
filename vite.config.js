import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const base = {
  plugins: [vue()],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  }
}

// https://vitejs.dev/config/

export default defineConfig(({mode}) => {
  let build;
  if (mode === 'npm') {
    build = {
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/entry/index.js'),
          name: 'FancyInOut',
          fileName: 'index'
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        }
      }
    }
  }
  if (mode === 'deploy') {
    build = {}
  }
  return {
    ...base,
    ...build
  }
})
