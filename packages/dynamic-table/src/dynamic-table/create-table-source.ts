import type { TableColumnsOptions } from '@/interfaces'
import type { DataRecord } from '@/interfaces/load-data-params'
import { setColumnValue } from '@/utils/set-column-value'
import { ref, type Ref } from 'vue'

export function createTableSource(
  columns: TableColumnsOptions
): [Ref<DataRecord[]>, (value: DataRecord[]) => void] {
  // 创建数据库
  const state = ref<DataRecord[]>([])

  // 格式化Record
  const formatState = (value: DataRecord[]) => {
    // 获取format column
    const formats = columns.filter((column) => column.formatter)

    if (formats.length > 0) {
      return value.map((record) => {
        // format操作
        formats.forEach((column) => {
          const formatter = column.formatter
          formatter && setColumnValue(record, column, formatter(record))
        })
        return record
      })
    } else {
      return value
    }
  }

  const updateState = (value: DataRecord[]) => {
    state.value = formatState(value)
  }

  return [state, updateState]
}
