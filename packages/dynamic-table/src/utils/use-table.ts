import type { DynamicTableInstance } from '../dynamic-table'
import { getCurrentInstance, onMounted, onUpdated, ref, type Ref } from 'vue'

/**
 * 获取DynamicTable实例
 * @param key
 * @returns
 */
export function useTable(key: string): Readonly<Ref<DynamicTableInstance>> {
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

  return table as Readonly<Ref<DynamicTableInstance>>
}
