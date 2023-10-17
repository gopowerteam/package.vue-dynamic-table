import DynamicTable from './dynamic-table'
import type { Plugin } from 'vue'
import VXETable from 'vxe-table'
import JsonViewer from 'vue-json-viewer'
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
      ) => (
        record: DataRecord,
        options: TableColumnOptions<DataRecord>
      ) => JSX.Element
    >
    form: Record<
      string,
      (
        options?: any
      ) => (data: DataRecord, options: FormItemOptions) => JSX.Element
    >
  }
}

/**
 * 重制VxeTable Hooks重复加载问题
 */
function resetVxeTableHooks() {
  const { store } =
    (VXETable.hooks as unknown as {
      store: Record<string, unknown>
    }) || {}

  for (const key in store) {
    VXETable.hooks.delete(key)
  }
}

export default {
  install(app, options?: DynamicTableOptions) {
    resetVxeTableHooks()

    app.use(VXETable).use(JsonViewer)

    app.component(options?.name || DynamicTable.name, DynamicTable)
    // VXETable.hooks.mixin
    if (options?.override) {
      DynamicTable.$override = options.override
    }
  }
} as Plugin
