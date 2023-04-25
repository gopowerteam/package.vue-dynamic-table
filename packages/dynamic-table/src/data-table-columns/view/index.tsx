import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { getColumnValue } from '@/utils/get-column-value'
import { useEvents } from '@/utils/events-helper'
import { createRenderer } from '@/utils/create-renderer'
import type { RenderSingleButtonColumnOptions } from '../button'
import { getCurrentInstance } from 'vue'

export function renderViewColumn<T = DataRecord>(
  options?: RenderViewColumnOptions<T>
) {
  const events = useEvents(getCurrentInstance()?.exposed?.tableId)

  const render = (
    record: T,
    column: TableColumnOptions<T>,
    isPreview?: boolean
  ) => {
    function onShowView() {
      events.emit('preview', {
        title: options?.title || '数据详情',
        record,
        columns: options?.columns,
        labelWidth: options?.labelWidth,
        border: options?.border,
        borderColor: options?.borderColor,
        padding: options?.padding,
        exclude: options?.exclude,
        buttons: options?.buttons
      })
    }

    if (isPreview) {
      return <span>{options?.text ?? getColumnValue(record, column)}</span>
    } else {
      return (
        <vxe-button
          onClick={() => onShowView()}
          content={options?.text ?? getColumnValue(record, column)}
          status="primary"
          type="text"></vxe-button>
      )
    }
  }

  return createRenderer<T>('view', render)
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
  exclude?: string[]
  buttons?: RenderSingleButtonColumnOptions<T>[]
}
