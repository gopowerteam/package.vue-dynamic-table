import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { getColumnValue } from '@/utils/get-column-value'
import { createRenderer } from '@/utils/create-renderer'

export function renderJSONColumn<T = DataRecord>(
  options?: RenderJSONColumnOptions
) {
  const render = (
    record: T,
    column: TableColumnOptions<T>,
    isPreview?: boolean
  ) => {
    if (isPreview) {
      return (
        <json-viewer
          value={JSON.parse(getColumnValue(record, column))}
          copyable={options?.copyable}
          expand-depth={options?.expandDepth ?? 5}
          expanded></json-viewer>
      )
    } else {
      return <span>...</span>
    }
  }

  return createRenderer<T>('json', render, { disableColumnMode: true })
}

export interface RenderJSONColumnOptions {
  copyable?: boolean
  expandDepth?: number
}
