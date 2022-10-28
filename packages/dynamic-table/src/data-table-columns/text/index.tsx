import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { getColumnValue } from '@/utils/get-column-value'

function generateText(
  options: RenderTextColumnOptions,
  column: TableColumnOptions,
  record: DataRecord
) {
  if (typeof options.text === 'function') {
    return options.text(record)
  }

  if (typeof options.text === 'string') {
    return options.text
  }

  return getColumnValue(record, column)
}

function generatColor(options: RenderTextColumnOptions, record: DataRecord) {
  if (typeof options.color === 'function') {
    return options.color(record)
  }

  if (typeof options.color === 'string') {
    return options.color
  }

  return '#000'
}

function generatSize(options: RenderTextColumnOptions, record: DataRecord) {
  if (typeof options.size === 'function') {
    return options.size(record)
  }

  if (typeof options.size === 'string') {
    return options.size
  }

  return '14px'
}

function generateStyle(options: RenderTextColumnOptions, record: DataRecord) {
  const color = `color:${generatColor(options, record)};`

  const size = `font-size:${generatSize(options, record)};`

  return [color, size].join('')
}

export function renderTextColumn(options: RenderTextColumnOptions) {
  return (record: DataRecord, column: TableColumnOptions) => {
    const text = generateText(options, column, record)
    const style = generateStyle(options, record)

    return <span style={style}>{text}</span>
  }
}

export interface RenderTextColumnOptions {
  color?: string | ((record: DataRecord) => string)
  text?: string | ((record: DataRecord) => string)
  size?: string | ((record: DataRecord) => string)
}
