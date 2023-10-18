import type { DynamicTableInstance } from '../dynamic-table'
import {
  getCurrentInstance,
  onMounted,
  onUpdated,
  ref,
  type ComponentPublicInstance,
  type Ref
} from 'vue'

type DynamicTableExpose = {
  -readonly [K in keyof Omit<
    DynamicTableInstance,
    keyof ComponentPublicInstance
  >]: DynamicTableInstance[K]
}
/**
 * 获取DynamicTable实例
 * @param key
 * @returns
 */
export function useTable(key: string): Readonly<Ref<DynamicTableExpose>> {
  const instance = getCurrentInstance()
  const table = ref<DynamicTableInstance>()

  function updateTable() {
    const target = instance?.proxy?.$refs?.[key]

    if (target) {
      table.value = target as any
    }
  }

  onMounted(updateTable)
  onUpdated(updateTable)

  return table as unknown as Readonly<Ref<DynamicTableExpose>>
}
