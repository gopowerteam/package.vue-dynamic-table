import type { TableColumnRender } from './table-column-render'
import type { FormItemOptions } from './form-item-options'
import type { DataRecord } from './load-data-params'

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
  width?: string | number
  render?: TableColumnRender<T>
  search?: Omit<FormItemOptions, 'key' | 'title'>
  formatter?: DataFormatter<T>
  preview?: TableColumnPreviewOptions
  exportable?: ExportColumnOptions | boolean
  treeNode?: boolean
}

export type ExportColumnOptions = {
  header?: string
  width?: number
  content?: (record: DataRecord) => string | number | undefined
}

// 列配置
export type TableColumnsOptions<T = DataRecord> = TableColumnOptions<T>[]

// Formatter格式化
export type DataFormatter<T> = (record: T) => string | number | Date | undefined
