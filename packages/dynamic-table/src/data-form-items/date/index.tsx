import type { DataRecord, FormItemOptions } from '@/interfaces'

/**
 * 日期节点表单渲染
 * @param options 日期节点配置选项
 * @returns JSX
 */
export function renderDateItem(options?: RenderDateItemOptions) {
  return (data: DataRecord, form: FormItemOptions) => {
    return (
      <vxe-input
        v-model={data[form.key]}
        placeholder={options?.placeholder}
        clearable={options?.clearable}
        multiple={options?.multiple}
        type={options?.type || 'date'}></vxe-input>
    )
  }
}

export interface RenderDateItemOptions {
  placeholder?: string
  clearable?: boolean
  multiple?: boolean
  type?: 'date' | 'week' | 'month' | 'year'
}
