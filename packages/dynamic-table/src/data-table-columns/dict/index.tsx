import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'

export function renderDictColumn<T = DataRecord>(
  options: RenderDictColumnOptions
) {
  const dict = options instanceof Map ? options : options.dict

  const render = (record: T, column: TableColumnOptions<T>) => {
    const value = getColumnValue(record, column)
    return <span>{dict.get(value) || value}</span>
  }

  return createRenderer<T>('dict', render)
}

type Dict = Map<string | number | boolean, string | number | boolean>

export type RenderDictColumnOptions = Dict | { dict: Dict }
