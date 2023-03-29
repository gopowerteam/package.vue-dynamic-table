import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import components from 'unplugin-vue-components/vite'
import { DynamicTableResolver } from '@gopowerteam/vue-dynamic-table/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    jsx(),
    components({
      resolvers: [DynamicTableResolver()]
    })
  ]
})
