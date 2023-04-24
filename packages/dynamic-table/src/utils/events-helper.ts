import type { RenderSingleButtonColumnOptions } from '@/data-table-columns/button'
import mitt from 'mitt'

export type PreviewEventParamsters = {
  title: string
  record: any
  columns?: number
  labelWidth?: string
  border?: boolean
  borderColor?: string
  padding?: number
  exclude?: string[]
  buttons?: RenderSingleButtonColumnOptions<any>[]
}

export type EditEventParamsters<T = any> = {
  title: string
  record: T
  columns?: number
  labelWidth?: string
  padding?: number
  appendRowKey?: boolean
  titleWidth?: string | number
  titleColon?: string | number
  titleAlign?: 'left' | 'right' | 'center'
  autoReload?: boolean
  submit: (record: T) => void | Promise<unknown>
}

export const events = mitt<{
  reload: void
  updateForm: Record<string, any>
  preview: PreviewEventParamsters
  edit: EditEventParamsters
}>()
