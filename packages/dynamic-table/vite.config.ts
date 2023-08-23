import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import * as path from 'node:path'
import { vitePluginForArco } from '@arco-plugins/vite-vue'

const resolvePath = (...filepath: string[]) =>
  path.join(fileURLToPath(new URL('./src', import.meta.url)), ...filepath)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'modules',
    lib: {
      entry: [resolvePath('index.ts'), resolvePath('resolver.ts')],
      name: 'bundle',
      fileName: (format, name) => `${name}.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      treeshake: true,
      external: ['vue', 'vxe-table', 'dayjs', 'mitt', 'vue-json-viewer'],
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
    }),
    vitePluginForArco({
      style: 'css'
    })
  ]
})
