import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { getColumnValue } from '@/utils/get-column-value'

export function renderDictColumn(options: RenderDictColumnOptions) {
  return (record: DataRecord, column: TableColumnOptions<DataRecord>) => {
    const value = getColumnValue(record, column)
    return <span>{options.dict.get(value) || value}</span>
  }
}

export interface RenderDictColumnOptions {
  dict: Map<string | number, string | number>
}
