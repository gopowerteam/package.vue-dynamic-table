import type { DataRecord, FormItemOptions } from '@/interfaces'

export function renderInputItem(options?: RenderInputItemOptions) {
  return (data: DataRecord, form: FormItemOptions) => {
    return (
      <vxe-input
        type={options?.type || 'text'}
        v-model={data[form.key]}
        placeholder={options?.placeholder}
        clearable={options?.clearable}></vxe-input>
    )
  }
}

export interface RenderInputItemOptions {
  placeholder?: string
  clearable?: boolean
  type?: 'text' | 'search' | 'number' | 'integer' | 'float' | 'password'
}
