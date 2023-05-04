import { h } from 'vue'
import { FormItem } from 'vxe-table'
import { DynamicTable, type DataRecord, type FormItemOptions } from '..'
import { formItemRenders as renders } from '../data-form-items'

/**
 * 生成Render模板
 * @param render
 * @returns
 */
function toRenderTemplate(options?: FormItemOptions) {
  if (!options?.render) {
    return undefined
  }

  // 获取渲染模板
  const templateRender = options.render({
    ...renders,
    ...(DynamicTable?.$override?.form || {})
  })

  // 获取deault slot
  return {
    default: ({ data }: { data: DataRecord }) => templateRender(data, options)
  }
}

/**
 * 创建表格列
 * @param options
 * @returns
 */
export function renderFormItem(form: FormItemOptions, span?: string | number) {
  return h(
    FormItem,
    {
      field: form.key,
      title: form.title,
      itemRender: {},
      folding: form.collapsed,
      span,
      visibleMethod: form.show
    },
    toRenderTemplate(form)
  )
}
