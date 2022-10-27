import type { tableColumnRenders } from '@/data-table-columns'
import type { DataRecord } from './load-data-params'
import type { TableColumnOptions } from './table-column-options'

/**
 * Render函数
 */
export interface TableColumnRender {
  (render: TableColumnRenderFun): (
    record: DataRecord,
    columnOptions: TableColumnOptions
  ) => JSX.Element
}

/**
 * Render函数模板
 */
type TableColumnRenderFun = typeof tableColumnRenders & { [key: string]: any }
