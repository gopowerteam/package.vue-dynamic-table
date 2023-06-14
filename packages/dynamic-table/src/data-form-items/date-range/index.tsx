import type { DataRecord, FormItemOptions } from '@/interfaces'
import dayjs from 'dayjs'
import { nextTick, ref, watch } from 'vue'

/**
 * 日期节点表单渲染
 * @param options 日期节点配置选项
 * @returns JSX
 */
export function renderDateRangeItem(options?: RenderDateRangeItemOptions) {
  const selected = ref('')
  let initialized = false

  function autoSubmit(element: HTMLElement) {
    nextTick(() => {
      const button = element.querySelector(
        `.vxe-input--panel.type--date .vxe-input--date-picker-confirm`
      ) as HTMLButtonElement

      button?.click()
    })
  }

  function onInputPanelHidden(element: HTMLElement, callback: () => void) {
    nextTick(() => {
      if (!element) {
        return
      }

      const panel = element.querySelector(
        `.vxe-input--panel.type--date`
      ) as HTMLButtonElement

      if (!panel) {
        return
      }

      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
          const visible = getComputedStyle(panel).display !== 'none'

          if (!visible) {
            callback()
          }
        })
      })

      observer.observe(panel, {
        attributes: true,
        attributeFilter: ['class']
      })
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
    const input = ref()

    // 重置操作
    const stop = watch(
      () => data[form.key],
      (newValue) => {
        if (
          (newValue === undefined || newValue?.length === 0) &&
          selected.value !== ''
        ) {
          selected.value = ''
          stop()
        }
      }
    )

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
            const [startDateStr, endDateStr] = values.sort()
            const startDate = dayjs(startDateStr).startOf('days')
            const endDate = dayjs(endDateStr).endOf('days')

            selected.value = [startDateStr, endDateStr].join(',')

            data[form.key] = [
              startDate.format(options?.valueFormat || 'YYYY-MM-DD'),
              endDate.format(options?.valueFormat || 'YYYY-MM-DD')
            ]

            autoSubmit(input.value?.$el)
          }
          break
        // 重置选择数据
        case 3:
          selected.value = values[2]
          break
      }
    }

    nextTick(() => {
      onInputPanelHidden(input.value?.$el, () => {
        if (!selected.value.includes(',')) selected.value = ''
      })
    })

    return (
      <div>
        <vxe-input
          ref={input}
          style={{ width: '240px' }}
          onChange={onChange}
          v-model={selected.value}
          placeholder={options?.placeholder}
          clearable={options?.clearable}
          disabled-method={disabledMethod}
          label-format={options?.labelFormat}
          multiple
          type={options?.type || 'date'}></vxe-input>
      </div>
    )
  }
}

export interface RenderDateRangeItemOptions {
  placeholder?: string
  clearable?: boolean
  multiple?: boolean
  type?: 'date' | 'week' | 'month' | 'year'
  valueFormat?: string
  labelFormat?: string
  disabledDate?: (value: string[], date: Date) => boolean
}
