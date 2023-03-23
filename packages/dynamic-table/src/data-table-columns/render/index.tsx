import type { DataRecord } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'

export function renderRenderColumn<T = DataRecord>(
  renderer: RenderRendererColumnOptions<T>
) {
  const render = (record: T) => {
    return renderer(record)
  }

  return createRenderer<T>('render', render, { showOverflow: false })
}

export interface RenderRendererColumnOptions<T> {
  (record: T): JSX.Element
}
