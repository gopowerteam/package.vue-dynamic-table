import type { DataRecord, FormItemOptions } from '@/interfaces'
import { DatePicker } from '@arco-design/web-vue'

/**
 * 日期节点表单渲染
 * @param options 日期节点配置选项
 * @returns JSX
 */
export function renderDateItem(options?: RenderDateItemOptions) {
  function disabledMethod(value: string, date: Date) {
    if (!options?.disabledDate) {
      return false
    }

    return options.disabledDate(value, date)
  }

  return (data: DataRecord, form: FormItemOptions) => {
    return (
      <DatePicker
        v-model={data[form.key]}
        disabled-date={disabledMethod}
        format={options?.labelFormat}
        value-format={options?.valueFormat}></DatePicker>
    )
  }
}

export interface RenderDateItemOptions {
  placeholder?: string
  clearable?: boolean
  disabledDate?: (value: string, date: Date) => boolean
  valueFormat?: string
  labelFormat?: string
}
