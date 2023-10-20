import type { VxeTableDefines } from 'vxe-table'
import type { formItemRenders } from '../data-form-items'
import type { DataRecord } from './load-data-params'

/**
 * 表单项配置
 */
export interface FormItemOptions<T> {
  key: string
  title: string
  render?: FormItemRender<T>
  collapsed?: boolean
  rules?: VxeTableDefines.ValidatorRule[]
  default?: any | (() => any)
  minWidth?: number
  show?: (record: any) => boolean
}

/**
 * 表单配置
 */
export type FormItemsOptions<T = DataRecord> = Array<FormItemOptions<T>>

/**
 * Render函数
 */
export interface FormItemRender<T = DataRecord> {
  (
    render: FormItemRenderFun
  ): (data: T, itemOptions: FormItemOptions<T>) => JSX.Element
}

/**
 * Render函数模板
 */
export type FormItemRenderFun = typeof formItemRenders & { [key: string]: any }
