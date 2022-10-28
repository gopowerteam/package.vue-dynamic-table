import type { DataRecord, FormItemOptions } from '@/interfaces'

export function renderInputItem(options?: RenderInputItemOptions) {
  return (data: DataRecord, form: FormItemOptions) => {
    return (
      <vxe-input
        v-model={data[form.key]}
        placeholder={options?.placeholder}
        clearable={options?.clearable}></vxe-input>
    )
  }
}

export interface RenderInputItemOptions {
  placeholder?: string
  clearable?: boolean
}
