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
        labelWidth: options?.labelWidth,
        border: options?.border,
        borderColor: options?.borderColor,
        padding: options?.padding
      })
    }

    return (
      <vxe-button
        onClick={() => onShowView()}
        content={options?.text ?? getColumnValue(record, column)}
        status="primary"
        type="text"></vxe-button>
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
  border?: boolean
  borderColor?: string
  padding?: number
}
