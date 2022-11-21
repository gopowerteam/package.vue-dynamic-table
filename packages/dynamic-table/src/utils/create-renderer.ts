import type { TableColumnRenderResult } from '@/interfaces'

export const RenderColumnType = Symbol.for('RenderColumnType')

export function createRenderer<T>(
  type: string,
  render: TableColumnRenderResult<T>
): TableColumnRenderResult<T> {
  render.$type = type
  return render
}
