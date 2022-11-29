import type { FormItemOptions, FormItemsOptions, TableColumnsOptions } from '..'

/**
 * 生成表单配置
 * @param columns
 * @param forms
 * @returns
 */
export function createSearchItemOptions(
  columns: TableColumnsOptions,
  forms?: FormItemsOptions
) {
  const options: FormItemOptions[] = [
    ...columns
      .filter((column) => column.search)
      .map((column) => ({
        key: column.key,
        title: column.title,
        ...column.search
      }))
  ]

  forms?.forEach((item) => {
    if (!options.some((option) => option.key === item.key)) {
      options.push(item)
    }
  })

  return options
}
