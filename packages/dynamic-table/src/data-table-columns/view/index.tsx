import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { getColumnValue } from '@/utils/get-column-value'
import { events } from '@/utils/events-helper'
import { createRenderer } from '@/utils/create-renderer'

export function renderViewColumn(
  options?: RenderViewColumnOptions<DataRecord>
) {
  const render = (
    record: DataRecord,
    column: TableColumnOptions<DataRecord>
  ) => {
    function onShowView() {
      events.emit('preview', {
        title: options?.title || '数据详情',
        record,
        columns: options?.columns || 3,
        labelWidth: options?.labelWidth
      })
    }

    return (
      <span onClick={onShowView}>
        {options?.text ?? getColumnValue(record, column)}
      </span>
    )
  }

  return createRenderer('view', render)
}

export interface RenderViewColumnOptions<T> {
  title?: string
  text?: string | ((record: T) => string)
  type?: 'text' | 'button'
  columns?: number
  labelWidth?: string
}
