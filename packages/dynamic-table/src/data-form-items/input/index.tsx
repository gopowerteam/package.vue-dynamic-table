import type { DataRecord, FormItemOptions } from '@/interfaces'

export function renderInputItem(renderOptions: RenderInputItemOptions) {
  return (data: DataRecord, itemOptions: FormItemOptions) => {
    return (
      <vxe-input
        v-model={data[itemOptions.key]}
        placeholder={renderOptions.placeholder}
        clearable={renderOptions.clearable}></vxe-input>
    )
  }
}

export interface RenderInputItemOptions {
  placeholder?: string
  clearable?: boolean
}
