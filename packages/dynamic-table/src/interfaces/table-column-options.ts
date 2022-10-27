import type { TableColumnRender } from './table-column-render'
import type { DataRecord } from './load-data-params'
import type { FormItemRender } from './form-item-render'

/**
 * 列配置
 */
export interface TableColumnOptions {
  key: string
  title: string
  index?: string
  fixed?: 'left' | 'right'
  render?: TableColumnRender
  form?: FormItemRender
  formatter?: DataFormatter
}

// 列配置
export type TableColumnsOptions = Array<TableColumnOptions>

// Formatter格式化
export type DataFormatter = (
  record: DataRecord
) => string | number | Date | undefined
