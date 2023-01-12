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
  appendRowKey?: boolean
  titleWidth?: string | number
  titleColon?: string | number
  titleAlign?: 'left' | 'right' | 'center'
  autoReload?: boolean
  submit: (record: DataRecord) => void | Promise<unknown>
}

export const events = mitt<{
  reload: void
  updateForm: Record<string, any>
  preview: PreviewEventParamsters
  edit: EditEventParamsters
}>()
