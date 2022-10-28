import type { DataRecord, FormItemOptions } from '@/interfaces'
import { events } from '@/utils/events-helper'
import { ref } from 'vue'

export function renderSelectItem(options: RenderSelectItemOptions) {
  let mounted = false
  const selectOptions = ref<SelectOptions>(new Map())

  // 获取SelectOptions值
  if (options.options instanceof Promise) {
    options.options.then((data) => (selectOptions.value = data))
  } else {
    selectOptions.value = options.options
  }

  function onSelectChange() {
    if (options.autoSumbit) {
      events.emit('reload')
    }
  }

  return (data: DataRecord, form: FormItemOptions) => {
    // 设置默认值
    if (options.default && !mounted) {
      data[form.key] = options.default
      mounted = true
    }

    return (
      <vxe-select
        multiple={options.multiple}
        v-model={data[form.key]}
        placeholder={options.placeholder}
        clearable={options.clearable}
        onChange={onSelectChange}>
        {Object.entries}
        {Array.from(selectOptions.value.entries()).map(([value, label]) => (
          <vxe-option
            key={value}
            value={value}
            label={label}></vxe-option>
        ))}
      </vxe-select>
    )
  }
}

export type SelectOptions = Map<string | number, string>

export interface RenderSelectItemOptions {
  // 占位符
  placeholder?: string
  // 可清楚
  clearable?: boolean
  // select options列表
  options: SelectOptions | Promise<SelectOptions>
  // 多选支持
  multiple?: boolean
  // 默认值
  default?: string
  // 自动提交
  autoSumbit?: boolean
}
