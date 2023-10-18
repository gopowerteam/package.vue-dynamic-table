import type { DynamicTableInstance } from '@/dynamic-table'
import { DynamicTable } from '../index'
import type { FormItemsOptions, TableColumnsOptions } from '@/interfaces'
import {
  type VNodeProps,
  type AllowedComponentProps,
  ref,
  type ComponentPublicInstance,
  type Ref
} from 'vue'

type DynamicTableProps = {
  -readonly [K in keyof Omit<
    DynamicTableInstance['$props'],
    keyof VNodeProps | keyof AllowedComponentProps
  >]: DynamicTableInstance['$props'][K]
}

type DynamicTableExpose = {
  -readonly [K in keyof Omit<
    DynamicTableInstance,
    keyof ComponentPublicInstance
  >]: DynamicTableInstance[K]
}

export function defineTableRender({
  options,
  columns,
  searchForms,
  editForms
}: {
  options: Omit<
    DynamicTableProps,
    'columns' | 'searchForms' | 'editForms' | 'onLoad'
  >
  columns: TableColumnsOptions
  searchForms?: FormItemsOptions
  editForms?: FormItemsOptions
}): {
  render: () => JSX.Element
  table: Ref<DynamicTableExpose>
} {
  const table = ref<DynamicTableInstance>()

  const render = () => (
    <DynamicTable
      ref={table}
      {...options}
      columns={columns}
      searchForms={searchForms}
      editForms={editForms}></DynamicTable>
  )

  return {
    render,
    table: table as unknown as Ref<DynamicTableExpose>
  }
}
