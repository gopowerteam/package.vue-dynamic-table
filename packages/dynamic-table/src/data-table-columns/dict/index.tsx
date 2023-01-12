import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'

export function renderDictColumn<T = DataRecord>(
  options: RenderDictColumnOptions
) {
  const render = (record: T, column: TableColumnOptions<T>) => {
    const value = getColumnValue(record, column)
    return <span>{options.dict.get(value) || value}</span>
  }

  return createRenderer<T>('dict', render)
}

export interface RenderDictColumnOptions {
  dict: Map<string | number | boolean, string | number | boolean>
}
