import DynamicTable from './dynamic-table'
import type { Plugin } from 'vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import type {
  DataRecord,
  FormItemOptions,
  TableColumnOptions
} from './interfaces'

interface DynamicTableOptions {
  name?: string
  override?: {
    table?: Record<
      string,
      (
        options?: any
      ) => (record: DataRecord, options: TableColumnOptions) => JSX.Element
    >
    form: Record<
      string,
      (
        options?: any
      ) => (data: DataRecord, options: FormItemOptions) => JSX.Element
    >
  }
}

export default {
  install(app, options?: DynamicTableOptions) {
    app.use(VXETable)
    app.component(options?.name || DynamicTable.name, DynamicTable)

    if (options?.override) {
      DynamicTable.$override = options.override
    }
  }
} as Plugin
