import type { TableColumnRender } from './table-column-render'
import type { DataRecord } from './load-data-params'
import type { FormItemOptions } from './form-item-options'

export interface TableColumnPreviewOptions {
  span?: number
}
/**
 * 列配置
 */
export interface TableColumnOptions<T> {
  key: string
  title: string
  index?: string
  fixed?: 'left' | 'right'
  align?: 'left' | 'right' | 'center'
  width?: string
  render?: TableColumnRender<T>
  search?: Omit<FormItemOptions, 'key' | 'title'>
  formatter?: DataFormatter
  preview?: TableColumnPreviewOptions
}

// 列配置
export type TableColumnsOptions<T = DataRecord> = TableColumnOptions<T>[]

// Formatter格式化
export type DataFormatter = (
  record: DataRecord
) => string | number | Date | undefined
