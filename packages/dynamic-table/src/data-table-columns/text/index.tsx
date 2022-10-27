import type { DataRecord, TableColumnOptions } from '@/interfaces'

export function renderTextColumn() {
  return (record: DataRecord, itemOptions: TableColumnOptions) => {
    return <div>{record[itemOptions.key]}</div>
  }
}

export interface RenderTextColumnOptions {
  test?: boolean
}
