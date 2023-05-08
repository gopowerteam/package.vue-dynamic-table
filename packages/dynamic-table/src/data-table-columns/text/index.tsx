import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'

function generateText<T>(
  options: RenderTextColumnOptions<T>,
  column: TableColumnOptions<T>,
  record: T
) {
  if (typeof options?.text === 'function') {
    return options?.text(record).toString()
  }

  if (typeof options?.text === 'string') {
    return options?.text
  }

  return getColumnValue(record, column)
}

function generatColor<T>(options: RenderTextColumnOptions<T>, record: T) {
  if (typeof options?.color === 'function') {
    return options?.color(record)
  }

  if (typeof options?.color === 'string') {
    return options?.color
  }

  return '#000'
}

function generatSize<T>(options: RenderTextColumnOptions<T>, record: T) {
  if (typeof options?.size === 'function') {
    return options?.size(record)
  }

  if (typeof options?.size === 'string') {
    return options?.size
  }

  return '14px'
}

function generateStyle<T>(options: RenderTextColumnOptions<T>, record: T) {
  const color = `color:${generatColor(options, record)};`

  const size = `font-size:${generatSize(options, record)};`

  return [color, size].join('')
}

export function renderTextColumn<T = DataRecord>(
  options?: RenderTextColumnOptions<T>
) {
  const render = (record: T, column: TableColumnOptions<T>) => {
    const text = generateText(options || {}, column, record)
    const style = generateStyle(options || {}, record)

    return <span style={style}>{text}</span>
  }

  return createRenderer<T>('text', render)
}

export interface RenderTextColumnOptions<T> {
  color?: string | ((record: T) => string)
  text?: string | ((record: T) => string | number | undefined)
  size?: string | ((record: T) => string)
}
