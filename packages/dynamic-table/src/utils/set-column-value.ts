import type { DataRecord, TableColumnOptions } from '..'

/**
 * 获取当前
 * @param record
 * @param column
 * @returns
 */
export function setColumnValue(
  record: DataRecord,
  column: TableColumnOptions,
  value: any
): any {
  const [key, ...rest] = (column.index || column.key).split('.').reverse()

  const props = rest.reverse().reduce((r, i) => r?.[i], record)

  props[key] = value
}
