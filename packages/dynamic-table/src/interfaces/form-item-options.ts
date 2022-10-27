import type { FormItemRender } from './form-item-render'

/**
 * 表单项配置
 */
export interface FormItemOptions {
  key: string
  title: string
  render?: FormItemRender
  default?: any | (() => any)
}

/**
 * 表单配置
 */
export type FormItemsOptions = Array<FormItemOptions>
