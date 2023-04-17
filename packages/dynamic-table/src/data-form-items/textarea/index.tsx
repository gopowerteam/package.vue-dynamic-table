import type { DataRecord, FormItemOptions } from '@/interfaces'

export function renderTextareaItem(options?: RenderTextareaItemOptions) {
  return (data: DataRecord, form: FormItemOptions) => {
    return (
      <vxe-textarea
        v-model={data[form.key]}
        placeholder={options?.placeholder}
        rows={options?.rows}
        resize={options?.resize}
        autosize={options?.autosize}></vxe-textarea>
    )
  }
}

export interface RenderTextareaItemOptions {
  placeholder?: string
  rows?: number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  autosize?: {
    minRows: number
    maxRows: number
  }
}
