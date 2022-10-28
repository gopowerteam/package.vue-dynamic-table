import type { FormItemRender } from './form-item-render'
import type { VxeTableDefines } from 'vxe-table'
/**
 * 表单项配置
 */
export interface FormItemOptions {
  key: string
  title: string
  render?: FormItemRender
  collapsed?: boolean
  rules?: VxeTableDefines.ValidatorRule[]
  default?: any | (() => any)
}

/**
 * 表单配置
 */
export type FormItemsOptions = Array<FormItemOptions>
