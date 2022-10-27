import type { App } from 'vue'
import DynamicTableComponent from './dynamic-table'

const DynamicTable = Object.assign(DynamicTableComponent, {
  install: (app: App) => {
    app.component(DynamicTableComponent.name, DynamicTableComponent)
  }
})

export type DynamicTableInstance = InstanceType<typeof DynamicTableComponent>

export default DynamicTable
