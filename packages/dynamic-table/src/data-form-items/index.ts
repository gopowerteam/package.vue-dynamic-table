import { renderDateItem } from './date'
import { renderInputItem } from './input'
import { renderSelectItem } from './select'
import { renderSwitchItem } from './switch'
import { renderDateRangeItem } from './date-range'
import { renderTextareaItem } from './textarea'

export const formItemRenders = {
  input: renderInputItem,
  textarea: renderTextareaItem,
  select: renderSelectItem,
  date: renderDateItem,
  switch: renderSwitchItem,
  dateRange: renderDateRangeItem
}
