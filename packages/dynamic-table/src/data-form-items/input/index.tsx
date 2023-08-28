import type { DataRecord, FormItemOptions } from '@/interfaces'
import { Input } from '@arco-design/web-vue'

export function renderInputItem(options?: RenderInputItemOptions) {
  return (data: DataRecord, form: FormItemOptions) => {
    return (
      <Input
        v-model={data[form.key]}
        placeholder={options?.placeholder}
        allowClear={options?.clearable}></Input>
    )
  }
}

export interface RenderInputItemOptions {
  placeholder?: string
  clearable?: boolean
}
