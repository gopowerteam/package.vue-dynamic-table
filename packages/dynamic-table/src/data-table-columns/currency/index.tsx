import type { DataRecord, TableColumnOptions } from '@/interfaces'
import { createRenderer } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'

export function renderCurrencyColumn<T = DataRecord>(
  options?: RenderCurrencyColumnOptions
) {
  const toThousandsStyle = (v: string) =>
    v.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')

  const getCurrencyValue = (value: string | number) => {
    return (parseFloat(value.toString()) / (options?.scale || 1)).toFixed(
      options?.precision || 2
    )
  }

  const render = (record: T, column: TableColumnOptions<T>) => {
    const value = getColumnValue(record, column)

    return (
      <div>
        {options?.prefix !== undefined && <span>{options?.prefix}</span>}
        <span class="currency_value">
          {options?.thousands === false
            ? getCurrencyValue(value)
            : toThousandsStyle(getCurrencyValue(value))}
        </span>
        {options?.suffix !== undefined && <span>{options?.suffix}</span>}
      </div>
    )
  }

  return createRenderer<T>('dict', render)
}

export interface RenderCurrencyColumnOptions {
  prefix?: string
  suffix?: string
  precision?: number
  scale?: number
  thousands?: boolean
}
