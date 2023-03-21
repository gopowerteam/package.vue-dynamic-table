import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'
import type { CSSProperties } from 'vue'

export function renderImageColumn<T = DataRecord>(
  options?: RenderImageColumnOptions
) {
  const render = (
    record: T,
    column: TableColumnOptions<T>,
    isPreview?: boolean
  ) => {
    const value = getColumnValue(record, column)

    const style: CSSProperties = {
      width: isPreview ? options?.width || 'auto' : '40px',
      height: isPreview ? options?.height || 'auto' : 'auto',
      borderRadius: options?.radius,
      maxWidth: !options?.height && !options?.width ? '150px' : 'auto',
      display: 'block',
      margin: 'auto',
      objectFit: 'contain'
    }

    if (!options?.parse) {
      return (
        <img
          src={value}
          style={style}
        />
      )
    }

    const parsedKey = `${column.index || column.key}_parsed`

    // 获取转换值
    if ((record as Record<string, string>)[parsedKey]) {
      return (
        <img
          src={(record as Record<string, string>)[parsedKey]}
          style={style}
        />
      )
    } else {
      options
        ?.parse(value)
        .then((v) => ((record as Record<string, string>)[parsedKey] = v))

      return <div>Loading...</div>
    }
  }

  return createRenderer<T>('image', render)
}

export interface RenderImageColumnOptions {
  width?: string
  height?: string
  radius?: string
  // rotate?: number
  parse?: (key: string) => Promise<string>
}
