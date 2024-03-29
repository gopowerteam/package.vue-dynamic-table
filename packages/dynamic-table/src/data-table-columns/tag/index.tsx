import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'

export function renderTagColumn<T = DataRecord>(
  options?: RenderTagColumnOptions
) {
  const render = (record: T, column: TableColumnOptions<T>) => {
    const value = getColumnValue(record, column)
    const textColors = options?.textColors || ['#F87335']
    const backgroundColor = options?.backgroundColors || ['#FFF4E8']

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {value.map((v: string, i: number) => (
          <span
            style={{
              margin: '2px',
              padding: '2px 5px',
              border: `solid 2px ${options?.border || 'transparent'}`,
              borderRadius: `${options?.radius || 0}px`,
              color:
                typeof textColors === 'function'
                  ? textColors(v, i)
                  : textColors[i % textColors.length],
              backgroundColor:
                typeof backgroundColor === 'function'
                  ? backgroundColor(v, i)
                  : backgroundColor[i % backgroundColor.length]
            }}>
            {v}
          </span>
        ))}
      </div>
    )
  }

  return createRenderer<T>('tag', render, { showOverflow: false })
}

export interface RenderTagColumnOptions {
  textColors?: string[] | ((tag: any, index: number) => string)
  backgroundColors?: string[] | ((tag: any, index: number) => string)
  border?: string
  radius?: number
}
