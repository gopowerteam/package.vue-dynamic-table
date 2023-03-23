import type { TableColumnRenderResult } from '@/interfaces'

export const RenderColumnType = Symbol.for('RenderColumnType')

export function createRenderer<T>(
  type: string,
  render: TableColumnRenderResult<T>,
  options?: {
    disableColumnMode?: boolean
    disableViewMode?: boolean
    showOverflow?: boolean
  }
): TableColumnRenderResult<T> {
  render.$type = type
  render.$disableColumnMode = options?.disableColumnMode
  render.$disableViewMode = options?.disableViewMode
  render.$showOverflow = options?.showOverflow ?? true

  return render
}
