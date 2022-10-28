import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { getColumnValue } from '@/utils/get-column-value'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const dateFormats = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss',
  week: 'ddd'
}

export function renderDateColumn(options?: RenderDateColumnOptions) {
  return (record: DataRecord, column: TableColumnOptions) => {
    const value = getColumnValue(record, column)
    const formatStr =
      typeof options?.format === 'function'
        ? options?.format()
        : dateFormats[options?.format || 'datetime']

    return <span>{dayjs(value).format(formatStr)}</span>
  }
}

export interface RenderDateColumnOptions {
  format?: keyof typeof dateFormats | (() => string)
}
