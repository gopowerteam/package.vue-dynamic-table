import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import * as path from 'node:path'

const resolvePath = (...filepath: string[]) =>
  path.join(fileURLToPath(new URL('./src', import.meta.url)), ...filepath)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'modules',
    lib: {
      entry: resolvePath('index.ts'),
      name: 'bundle',
      fileName: (format) => `index.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'vxe-table'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: resolvePath()
    })
  ],
  resolve: {
    alias: {
      '@': resolvePath()
    }
  }
})
