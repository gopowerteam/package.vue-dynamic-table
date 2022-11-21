import type { getTableColumnRenders } from '@/data-table-columns'
import type { TableColumnOptions } from './table-column-options'

interface TableColumnRenderResultType {
  $type?: string
}
export interface TableColumnRenderResult<T>
  extends TableColumnRenderResultType {
  (record: T, columnOptions: TableColumnOptions<T>): JSX.Element
}
/**
 * Render函数
 */
export interface TableColumnRender<T> {
  (render: TableColumnRenderFun<T>): TableColumnRenderResult<T>
}

/**
 * Render函数模板
 */
type TableColumnRenderFun<T> = ReturnType<typeof getTableColumnRenders<T>> & {
  [key: string]: any
}
