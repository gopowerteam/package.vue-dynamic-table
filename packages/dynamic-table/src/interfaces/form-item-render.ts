import type { formItemRenders } from '../data-form-items'
import type { FormItemOptions } from './form-item-options'
import type { DataRecord } from './load-data-params'

/**
 * Render函数
 */
export interface FormItemRender {
  (render: FormItemRenderFun): (
    data: DataRecord,
    itemOptions: FormItemOptions
  ) => JSX.Element
}

/**
 * Render函数模板
 */
type FormItemRenderFun = typeof formItemRenders & { [key: string]: any }
