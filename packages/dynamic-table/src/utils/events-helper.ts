import type { RenderSingleButtonColumnOptions } from '@/data-table-columns/button'
import mitt from 'mitt'
import type { DataRecord } from '..'

export type PreviewEventParamsters = {
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

export type EditEventParamsters = {
  title: string
  record: Record<string, any>
  columns?: number
  labelWidth?: string
  padding?: number
  submit: (record: DataRecord) => void | Promise<unknown>
}

type Events = {
  reload: void
  updateForm: Record<string, any>
  preview: PreviewEventParamsters
  edit: EditEventParamsters
}

export const events = mitt<Events>()
