import type { TableColumnOptions } from '@/interfaces/table-column-options'
import { RenderColumnType } from '@/utils/create-renderer'
import { h } from 'vue'
import { Column } from 'vxe-table'
import { DynamicTable } from '..'
import { tableColumnRenders as renders } from '../data-table-columns'

/**
 * 生成Render模板
 * @param render
 * @returns
 */
export function toRenderTemplate<T>(
  options?: TableColumnOptions<T>,
  isPreview?: boolean
) {
  if (!options?.render) {
    return undefined
  }

  // 获取渲染模板
  const templateRender = options.render({
    ...renders,
    ...(DynamicTable?.$override?.table || {})
  })

  // 获取deault slot
  return {
    template: ({ row }: { row: T }) => templateRender(row, options, isPreview),
    [RenderColumnType]: templateRender.$type,
    disableColumnMode: templateRender.$disableColumnMode,
    disableViewMode: templateRender.$disableViewMode
  }
}

/**
 * 创建表格列
 * @param options
 * @returns
 */
export function renderTableColumn<T>(options: TableColumnOptions<T>) {
  const { template, disableColumnMode } = toRenderTemplate(options) || {}

  return h(
    Column,
    {
      field: options.key,
      title: options.title,
      width: options.width,
      showOverflow: true,
      showFooterOverflow: true,
      showHeaderOverflow: true,
      visible: !disableColumnMode
    },
    {
      default: template
    }
  )
}
