import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'
import { type CSSProperties, ref } from 'vue'

export function renderImageColumn(options?: RenderImageColumnOptions) {
  const url = ref<string>()

  const render = (
    record: DataRecord,
    column: TableColumnOptions<DataRecord>,
    isPreview?: boolean
  ) => {
    const value = getColumnValue(record, column)

    if (!options?.parse) {
      url.value = value
    }

    // 获取转换值
    if (options?.parse && !url.value) {
      Promise.resolve(options?.parse(value)).then((v) => {
        url.value = v
      })
    }

    const style: CSSProperties = {
      width: isPreview ? options?.width || 'auto' : '40px',
      height: isPreview ? options?.height || 'auto' : 'auto',
      borderRadius: options?.radius,
      maxWidth: !options?.height && !options?.width ? '150px' : 'auto',
      display: 'block',
      margin: 'auto',
      objectFit: 'contain'
    }

    return url.value ? (
      <img
        src={url.value}
        style={style}
      />
    ) : (
      <span>loading...</span>
    )
  }

  return createRenderer('image', render)
}

export interface RenderImageColumnOptions {
  width?: string
  height?: string
  radius?: string
  // rotate?: number
  parse?: (key: string) => Promise<string>
}
