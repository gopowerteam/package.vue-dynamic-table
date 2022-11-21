import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'

export function renderDictColumn(options: RenderDictColumnOptions) {
  const render = (
    record: DataRecord,
    column: TableColumnOptions<DataRecord>
  ) => {
    const value = getColumnValue(record, column)
    return <span>{options.dict.get(value) || value}</span>
  }

  return createRenderer('dict', render)
}

export interface RenderDictColumnOptions {
  dict: Map<string | number, string | number>
}
