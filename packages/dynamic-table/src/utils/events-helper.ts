import type { RenderSingleButtonColumnOptions } from '@/data-table-columns/button'
import mitt from 'mitt'
import type { DataRecord } from '..'

type Events = {
  reload: void
  preview: {
    title: string
    record: Record<string, any>
    columns?: number
    labelWidth?: string
    border?: boolean
    borderColor?: string
    padding?: number
    exclude?: string[]
    buttons?: RenderSingleButtonColumnOptions<DataRecord>[]
  }
  updateForm: Record<string, any>
}

export const events = mitt<Events>()
