import { renderDateItem } from './date'
import { renderInputItem } from './input'
import { renderSelectItem } from './select'
import { renderSwitchItem } from './switch'

export const formItemRenders = {
  input: renderInputItem,
  select: renderSelectItem,
  date: renderDateItem,
  switch: renderSwitchItem
}
