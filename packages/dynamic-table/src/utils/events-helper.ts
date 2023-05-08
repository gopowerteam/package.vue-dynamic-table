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
  padding?: number
  appendRowKey?: boolean
  labelWidth?: string | number
  labelColon?: boolean
  labelAlign?: 'left' | 'right' | 'center'
  autoReload?: boolean
  submit: (record: T) => void | Promise<unknown>
}

export const emitter = mitt<Record<string, any>>()

type Events = {
  reload: undefined
  updateForm: Record<string, any>
  preview: PreviewEventParamsters
  edit: EditEventParamsters
}

function createEventEmit(id: string) {
  function emit<T extends keyof Events>(event: T, props: Events[T]): void
  function emit<T extends keyof Events>(
    event: undefined extends Events[T] ? T : never
  ): void
  function emit<T extends keyof Events>(event: T, props?: Events[T]): void {
    if (id) {
      emitter.emit(`${id}:${event}`, props)
    }
  }

  return emit
}

function createEventOn(id: string) {
  function on<T extends keyof Events>(
    event: T,
    handler: (props: Events[T]) => void
  ): void
  function on<T extends keyof Events>(
    event: undefined extends Events[T] ? T : never,
    handler: () => void
  ): void
  function on<T extends keyof Events>(
    event: T,
    handler: (props?: Events[T]) => void
  ): void {
    if (id) {
      emitter.on(`${id}:${event}`, handler)
    }
  }

  return on
}

export function useEvents(id?: string) {
  const tableId = id as string

  return { emit: createEventEmit(tableId), on: createEventOn(tableId) }
}
