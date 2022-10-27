import type { FormItemsOptions } from '@/interfaces'
import type { DataRecord } from '@/interfaces/load-data-params'
import { ref, type Ref } from 'vue'

export function createFormSource(
  forms?: FormItemsOptions
): [Ref<DataRecord>, (value: DataRecord) => void] {
  // 创建数据库
  const state = ref<DataRecord>({})

  forms?.forEach((item) => {
    state.value[item.key] =
      (typeof item.default === 'function' ? item.default() : item.default) ||
      null
  })

  const updateState = (value: DataRecord) => {
    state.value = value
  }

  return [state, updateState]
}
