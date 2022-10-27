import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DataTable: typeof import('@gopowerteam/vue-dynamic-table')['DynamicTable']
  }
}
