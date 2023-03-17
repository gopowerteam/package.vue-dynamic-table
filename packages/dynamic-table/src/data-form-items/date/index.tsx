import type { DataRecord, FormItemOptions } from '@/interfaces'

/**
 * 日期节点表单渲染
 * @param options 日期节点配置选项
 * @returns JSX
 */
export function renderDateItem(options?: RenderDateItemOptions) {
  function disabledMethod({ $input, date }: { $input: any; date: Date }) {
    const value = $input.props.modelValue

    if (!options?.disabledDate) {
      return false
    }

    return options.disabledDate(value, date)
  }

  return (data: DataRecord, form: FormItemOptions) => {
    return (
      <vxe-input
        v-model={data[form.key]}
        placeholder={options?.placeholder}
        clearable={options?.clearable}
        disabled-method={disabledMethod}
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
  disabledDate: (value: string, date: Date) => boolean
}
