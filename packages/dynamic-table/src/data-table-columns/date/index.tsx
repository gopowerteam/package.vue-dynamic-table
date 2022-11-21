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

/**
 * 渲染Date Column
 * @param options DateColumn列选项
 * @returns JSX
 */
export function renderDateColumn(options?: RenderDateColumnOptions) {
  return (record: DataRecord, column: TableColumnOptions<DataRecord>) => {
    const value = getColumnValue(record, column)
    const formatStr =
      typeof options?.format === 'function'
        ? options?.format()
        : dateFormats[options?.format || 'datetime']

    const date = dayjs(value)

    return <span>{date.isValid() && date.format(formatStr)}</span>
  }
}

export interface RenderDateColumnOptions {
  format?: keyof typeof dateFormats | (() => string)
}
