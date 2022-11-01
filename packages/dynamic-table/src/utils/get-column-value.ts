import type { DataRecord, TableColumnOptions } from '..'

/**
 * 获取当前
 * @param record
 * @param column
 * @returns
 */
export function getColumnValue<T = DataRecord>(
  record: DataRecord,
  column: TableColumnOptions<T>
): any {
  return (column.index || column.key)
    .split('.')
    .reduce((r, i) => r?.[i], record)
}
