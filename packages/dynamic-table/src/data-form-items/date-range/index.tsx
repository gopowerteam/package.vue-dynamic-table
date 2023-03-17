import type { DataRecord, FormItemOptions } from '@/interfaces'
import { nextTick, ref } from 'vue'

/**
 * 日期节点表单渲染
 * @param options 日期节点配置选项
 * @returns JSX
 */
export function renderDateRangeItem(options?: RenderDateRangeItemOptions) {
  const selected = ref('')
  let initialized = false

  function autoSubmit() {
    nextTick(() => {
      const button = document.querySelector(
        '.vxe-input--panel.type--date .vxe-input--date-picker-confirm'
      ) as HTMLButtonElement

      button?.click()
    })
  }

  function disabledMethod({ $input, date }: { $input: any; date: Date }) {
    const values = $input.props.modelValue.split(',').filter(Boolean)

    if (!options?.disabledDate) {
      return false
    }

    return options.disabledDate(
      values.length === 3 ? [values[2]] : values,
      date
    )
  }

  return (data: DataRecord, form: FormItemOptions) => {
    if (data[form.key] && selected.value === '' && !initialized) {
      selected.value = data[form.key].join(',')
    }

    initialized = true

    function onChange() {
      const values = selected.value.split(',').filter(Boolean)

      switch (values.length) {
        // 生成选择数据
        case 2:
          {
            const array = values.sort()
            selected.value = array.join(',')
            data[form.key] = array

            autoSubmit()
          }
          break
        // 重置选择数据
        case 3:
          selected.value = values[2]
          break
      }
    }

    return (
      <vxe-input
        style={{ width: '240px' }}
        onChange={onChange}
        v-model={selected.value}
        placeholder={options?.placeholder}
        clearable={options?.clearable}
        disabled-method={disabledMethod}
        multiple
        type={options?.type || 'date'}></vxe-input>
    )
  }
}

export interface RenderDateRangeItemOptions {
  placeholder?: string
  clearable?: boolean
  multiple?: boolean
  type?: 'date' | 'week' | 'month' | 'year'
  disabledDate: (value: string[], date: Date) => boolean
}
