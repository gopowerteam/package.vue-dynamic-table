import type { DataRecord, TableColumnOptions } from '..'

/**
 * 获取当前
 * @param record
 * @param column
 * @returns
 */
export function getColumnValue(
  record: DataRecord,
  column: TableColumnOptions
): any {
  return (column.index || column.key)
    .split('.')
    .reduce((r, i) => r?.[i], record)
}
