import { createApp, h } from 'vue'
import './style.css'
import App from './App.vue'
import DynamicTable, { type DataRecord } from '@gopowerteam/vue-dynamic-table'
import '@gopowerteam/vue-dynamic-table/dist/style.css'
import httpSetup from './http.setup'

httpSetup()
createApp(App)
  .use(DynamicTable, {
    name: 'data-table',
    override: {
      table: {
        test: () => (row: DataRecord) => h('div', [row.name])
      }
    }
  })
  .mount('#app')
